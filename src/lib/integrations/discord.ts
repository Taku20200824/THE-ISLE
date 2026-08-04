import { siteConfig, staff } from "@/data/site";

export async function getDiscordCommunity() {
  // Replace this with Discord bot backed guild/member data.
  return {
    invite: siteConfig.discordInvite,
    staff,
    onlineModerators: staff.filter((member) => ["Owner", "Administrator", "Moderator"].includes(member.role)).length
  };
}
