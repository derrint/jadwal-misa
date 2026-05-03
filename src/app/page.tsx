import Link from "next/link";
import cityIndex from "@/data/index.json";
import { buildSearchIndex } from "@/lib/build-search-index";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooterHome } from "@/components/layout/site-footer";
import { CityCard } from "@/components/ui/city-card";
import { SearchResults } from "@/components/sections/search-results";

export default async function Home() {
  const searchIndex = await buildSearchIndex();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        title={
          <>
            Jadwal Misa <span className="text-accent">Indonesia</span>
          </>
        }
        subtitle="Direktori jadwal misa Katolik seluruh Indonesia"
      />

      <main className="relative z-10 flex-1">
        <div className="container-site py-8">
          <p className="mb-6 text-center text-sm leading-relaxed text-misa-600">
            Cari paroki lintas kota atau pilih wilayah di bawah untuk melihat
            jadwal lengkap.
          </p>

          <SearchResults searchIndex={searchIndex} />

          <h2 className="mb-4 font-serif text-lg font-bold text-misa-900">
            Wilayah
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cityIndex.cities.map((c) => (
              <CityCard key={c.id} city={c} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-misa-500">
            Punya koreksi jadwal? Hubungi paroki masing-masing atau kontributor
            lokal.{" "}
            <Link href="/malang" className="font-medium text-accent underline">
              Malang Raya
            </Link>{" "}
            sebagai kota pertama.
          </p>
        </div>
      </main>

      <SiteFooterHome />
    </div>
  );
}
