import { KontoClient } from "./client";

export const metadata = { title: "Mein Konto | SCHNITTWERK" };

export default function KontoPage() {
  return (
    <div className="section">
      <KontoClient />
    </div>
  );
}
