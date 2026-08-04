import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAdminFirestore, hasFirebaseAdminCredentials } from "@/lib/firebase/admin";
import { initialServerStatus, serverStatusSchema, type ServerStatusDocument } from "@/lib/firebase/server-status-shared";
export { formatServerAddress, initialServerStatus, serverStatusSchema, type ServerStatusDocument } from "@/lib/firebase/server-status-shared";

export const serverStatusCollection = "serverStatus";
export const serverStatusDocumentId = "main";

function parseTimestamp(value: unknown) {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  return null;
}

export async function getServerStatusDocument(): Promise<ServerStatusDocument | null> {
  if (!hasFirebaseAdminCredentials()) {
    return null;
  }

  try {
    const snapshot = await getAdminFirestore().collection(serverStatusCollection).doc(serverStatusDocumentId).get();

    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data() ?? {};
    const parsed = serverStatusSchema.safeParse(data);

    if (!parsed.success) {
      return null;
    }

    return {
      ...parsed.data,
      lastUpdated: parseTimestamp(data.lastUpdated)
    };
  } catch {
    return null;
  }
}

export async function getServerStatusOrInitial(): Promise<ServerStatusDocument> {
  return (
    (await getServerStatusDocument()) ?? {
      ...initialServerStatus,
      lastUpdated: null
    }
  );
}

export async function seedServerStatusDocument() {
  await getAdminFirestore().collection(serverStatusCollection).doc(serverStatusDocumentId).set({
    ...initialServerStatus,
    lastUpdated: FieldValue.serverTimestamp()
  });
}

export async function updateServerStatusDocument(input: unknown) {
  const parsed = serverStatusSchema.parse(input);

  await getAdminFirestore().collection(serverStatusCollection).doc(serverStatusDocumentId).set(
    {
      ...parsed,
      lastUpdated: FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  return getServerStatusOrInitial();
}
