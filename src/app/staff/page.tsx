import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { staff } from "@/data/site";

export default function StaffPage() {
  return (
    <main className="container min-h-screen pt-28 pb-20">
      <SectionHeading eyebrow="Staff" title="Operations team" description="Owner, administrators, moderators, and helpers." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {staff.map((member) => (
          <Card key={member.name}>
            <CardContent className="p-5">
              <img src={member.avatar} alt="" className="h-20 w-20 rounded-lg bg-white/10 p-2" />
              <h3 className="mt-5 text-lg font-bold">{member.name}</h3>
              <div className="text-sm text-primary">{member.role}</div>
              <div className="mt-2 text-sm text-muted-foreground">{member.discord}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
