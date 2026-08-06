import { siteConfig } from "@/data/site";
import { getFirestoreStaff } from "@/lib/firebase/firestore-data";

export async function getDiscordCommunity() {
  const staff = await getFirestoreStaff();

  return {
    invite: siteConfig.discordInvite,
    staff,
    onlineModerators: staff.filter((member) => ["Owner", "Administrator", "Moderator"].includes(member.role)).length
  };
}
