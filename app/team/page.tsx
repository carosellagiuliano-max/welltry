import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getStaff } from "@/lib/data";

export const metadata = { title: "Team | SCHNITTWERK" };

export default async function TeamPage() {
  const staff = await getStaff();
  return (
    <div className="section">
      <div className="container flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted">Team</p>
          <h1 className="text-3xl font-semibold text-[--color-secondary]">Menschen hinter SCHNITTWERK</h1>
          <p className="text-muted">Kompetent, klar, herzlich – wir freuen uns auf deinen Besuch.</p>
        </div>
        <div className="card-grid">
          {staff.map((member) => (
            <Card key={member.id}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <Badge variant="soft">{member.skills[0]}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">{member.bio}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                {member.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-[--color-muted] px-2 py-1">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
