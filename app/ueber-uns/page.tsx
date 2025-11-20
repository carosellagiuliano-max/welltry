import { Card } from "@/components/ui/card";

export const metadata = { title: "Über uns | SCHNITTWERK" };

export default function UeberUnsPage() {
  return (
    <div className="section">
      <div className="container grid gap-6 md:grid-cols-2">
        <div className="surface p-6">
          <h1 className="text-3xl font-semibold text-[--color-secondary]">Über SCHNITTWERK</h1>
          <p className="mt-3 text-muted">
            Vanessa Carosella hat SCHNITTWERK gegründet, um kompromisslose Qualität mit einem warmen, persönlichen Erlebnis zu
            verbinden. Wir arbeiten mit Swiss-made Produkten, achten auf Kopfhautgesundheit und nehmen uns Zeit für ehrliche
            Beratung.
          </p>
          <p className="mt-3 text-muted">
            Digitalisierung ist kein Selbstzweck: Online Buchung, Kundenportal und DSG/DSGVO-konforme Abläufe sorgen dafür, dass
            wir mehr Zeit für Menschen und Handwerk haben.
          </p>
        </div>
        <Card>
          <h3 className="text-xl font-semibold">Was uns wichtig ist</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>Respekt vor Zeit: präzise Slots, kaum Warten.</li>
            <li>Gesundheit zuerst: Produktauswahl mit klaren Inhaltsstoffen.</li>
            <li>Transparenz: klare Preise, verständliche Kommunikation.</li>
            <li>Weiterbildung: kontinuierliche Trainings zu Trends und Technik.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
