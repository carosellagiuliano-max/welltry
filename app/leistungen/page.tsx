import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getServiceCatalog } from "@/lib/data";

export const metadata = {
  title: "Leistungen | SCHNITTWERK",
};

export default async function LeistungenPage() {
  const catalog = await getServiceCatalog();
  return (
    <div className="section">
      <div className="container flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-wide text-muted">Leistungen</p>
          <h1 className="text-3xl font-semibold text-[--color-secondary]">Preise & Leistungen im Überblick</h1>
          <p className="text-muted">
            Alle Services beinhalten Beratung, waschen & pflegen mit hochwertigen Produkten. Preise sind Richtwerte; bei
            Mehraufwand informieren wir transparent.
          </p>
        </div>

        <div className="space-y-6">
          {catalog.categories.map((category) => (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <Badge variant="soft">{category.description}</Badge>
              </div>
              <div className="card-grid">
                {catalog.services
                  .filter((service) => service.category_id === category.id)
                  .map((service) => (
                    <Card key={service.id}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted">{service.description}</p>
                        </div>
                        <Badge variant="outline">CHF {service.base_price_chf}</Badge>
                      </div>
                      <p className="mt-3 text-xs text-muted">Dauer: {service.duration_minutes} Minuten</p>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
