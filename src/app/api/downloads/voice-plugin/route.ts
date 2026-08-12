import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { getServerStatusOrInitial } from "@/lib/firebase/server-status";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const legacyPluginUrl = "https://157-230-40-149.nip.io/downloads/TAKU-Voice-Proximity-v0.1.zip";
const downloadFilename = "ASIA-JP-MNG-KR-Test-Voice-Proximity-v0.1.zip";
const oldSetupFilename = "TAKUVoiceSetup.exe";
const newSetupFilename = "ASIA-JP-MNG-KR-Test-Voice-Setup.exe";

async function fetchPackage(url: string) {
  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok || !response.body) {
      return null;
    }

    return response;
  } catch {
    return null;
  }
}

function getRenamedEntryName(name: string) {
  if (name === oldSetupFilename) {
    return newSetupFilename;
  }

  if (name.endsWith(`/${oldSetupFilename}`)) {
    return `${name.slice(0, -oldSetupFilename.length)}${newSetupFilename}`;
  }

  if (name.endsWith(`\\${oldSetupFilename}`)) {
    return `${name.slice(0, -oldSetupFilename.length)}${newSetupFilename}`;
  }

  return name;
}

function findEndOfCentralDirectory(zip: Buffer) {
  for (let index = zip.length - 22; index >= 0; index -= 1) {
    if (zip.readUInt32LE(index) === 0x06054b50) {
      return index;
    }
  }

  return -1;
}

function renameZipEntries(zip: Buffer) {
  const eocdOffset = findEndOfCentralDirectory(zip);

  if (eocdOffset === -1) {
    return { zip, renamed: false };
  }

  const entryCount = zip.readUInt16LE(eocdOffset + 10);
  const centralDirectoryOffset = zip.readUInt32LE(eocdOffset + 16);
  const entries: Array<{
    centralOffset: number;
    localOffset: number;
    name: string;
    nextName: string;
    extraLength: number;
    commentLength: number;
  }> = [];

  let pointer = centralDirectoryOffset;

  for (let index = 0; index < entryCount; index += 1) {
    if (zip.readUInt32LE(pointer) !== 0x02014b50) {
      return { zip, renamed: false };
    }

    const nameLength = zip.readUInt16LE(pointer + 28);
    const extraLength = zip.readUInt16LE(pointer + 30);
    const commentLength = zip.readUInt16LE(pointer + 32);
    const localOffset = zip.readUInt32LE(pointer + 42);
    const name = zip.subarray(pointer + 46, pointer + 46 + nameLength).toString("utf8");

    entries.push({
      centralOffset: pointer,
      localOffset,
      name,
      nextName: getRenamedEntryName(name),
      extraLength,
      commentLength
    });

    pointer += 46 + nameLength + extraLength + commentLength;
  }

  if (!entries.some((entry) => entry.name !== entry.nextName)) {
    return { zip, renamed: false };
  }

  const chunks: Buffer[] = [];
  const newLocalOffsets = new Map<number, number>();
  const sortedEntries = [...entries].sort((left, right) => left.localOffset - right.localOffset);
  let sourcePointer = 0;
  let outputLength = 0;

  for (let index = 0; index < sortedEntries.length; index += 1) {
    const entry = sortedEntries[index];
    const nextLocalOffset = sortedEntries[index + 1]?.localOffset ?? centralDirectoryOffset;

    if (entry.localOffset > sourcePointer) {
      const gap = zip.subarray(sourcePointer, entry.localOffset);
      chunks.push(gap);
      outputLength += gap.length;
    }

    if (zip.readUInt32LE(entry.localOffset) !== 0x04034b50) {
      return { zip, renamed: false };
    }

    const localNameLength = zip.readUInt16LE(entry.localOffset + 26);
    const localExtraLength = zip.readUInt16LE(entry.localOffset + 28);
    const fixedHeader = Buffer.from(zip.subarray(entry.localOffset, entry.localOffset + 30));
    const nextName = Buffer.from(entry.nextName, "utf8");
    const localExtraStart = entry.localOffset + 30 + localNameLength;
    const localBodyStart = localExtraStart + localExtraLength;

    fixedHeader.writeUInt16LE(nextName.length, 26);
    newLocalOffsets.set(entry.centralOffset, outputLength);

    chunks.push(fixedHeader, nextName, zip.subarray(localExtraStart, localBodyStart), zip.subarray(localBodyStart, nextLocalOffset));
    outputLength += fixedHeader.length + nextName.length + localExtraLength + (nextLocalOffset - localBodyStart);
    sourcePointer = nextLocalOffset;
  }

  if (sourcePointer < centralDirectoryOffset) {
    const gap = zip.subarray(sourcePointer, centralDirectoryOffset);
    chunks.push(gap);
    outputLength += gap.length;
  }

  const newCentralDirectoryOffset = outputLength;

  for (const entry of entries) {
    const name = Buffer.from(entry.nextName, "utf8");
    const fixedHeader = Buffer.from(zip.subarray(entry.centralOffset, entry.centralOffset + 46));
    const oldNameLength = zip.readUInt16LE(entry.centralOffset + 28);
    const extraStart = entry.centralOffset + 46 + oldNameLength;
    const commentStart = extraStart + entry.extraLength;
    const commentEnd = commentStart + entry.commentLength;

    fixedHeader.writeUInt16LE(name.length, 28);
    fixedHeader.writeUInt32LE(newLocalOffsets.get(entry.centralOffset) ?? entry.localOffset, 42);
    chunks.push(fixedHeader, name, zip.subarray(extraStart, commentEnd));
    outputLength += fixedHeader.length + name.length + entry.extraLength + entry.commentLength;
  }

  const eocd = Buffer.from(zip.subarray(eocdOffset));
  eocd.writeUInt32LE(outputLength - newCentralDirectoryOffset, 12);
  eocd.writeUInt32LE(newCentralDirectoryOffset, 16);
  chunks.push(eocd);

  return { zip: Buffer.concat(chunks), renamed: true };
}

export async function GET() {
  const status = await getServerStatusOrInitial();
  const sourceUrl = status.voicePluginUrl || legacyPluginUrl;
  const response = (await fetchPackage(sourceUrl)) ?? (sourceUrl === legacyPluginUrl ? null : await fetchPackage(legacyPluginUrl));

  if (!response?.body) {
    return NextResponse.redirect(sourceUrl);
  }

  const sourceZip = Buffer.from(await response.arrayBuffer());
  const { zip, renamed } = renameZipEntries(sourceZip);
  const body = new Uint8Array(zip);

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${downloadFilename}"`,
      "Content-Length": String(body.byteLength),
      "Cache-Control": "no-store",
      "X-Voice-Setup-Renamed": renamed ? "true" : "false"
    }
  });
}
