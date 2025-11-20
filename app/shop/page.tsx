import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProducts } from "@/lib/data";

export const metadata = { title: "Shop | SCHNITTWERK" };

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <div className="section">
      <div className="container flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted">Shop</p>
          <h1 className="text-3xl font-semibold text-[--color-secondary]">Pflege für zuhause</h1>
          <p className="text-muted">Produkte abgestimmt auf unsere Treatments. Checkout folgt in Phase 5 mit Stripe.</p>
        </div>
        <div className="card-grid">
          {products.map((product) => (
            <Card key={product.id}>
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="text-sm font-semibold">CHF {product.price_chf}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{product.description}</p>
              <Button variant="outline" size="sm" className="mt-4" disabled>
                Online-Kauf folgt
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
