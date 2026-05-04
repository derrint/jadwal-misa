import { FooterPageUpdatedTime } from "@/components/layout/page-updated-client";

export function SiteFooterCity() {
  return (
    <footer className="relative z-10 border-t border-black/8 px-4 py-6 text-center text-xs leading-relaxed text-misa-500">
      Data diambil dari website resmi paroki, Instagram resmi, dan sumber
      terverifikasi
      <br />
      Keuskupan Malang · Data diambil per tanggal <FooterPageUpdatedTime /> ·
      Untuk keperluan informasi pribadi
    </footer>
  );
}

export function SiteFooterHome() {
  return (
    <footer className="relative z-10 border-t border-black/8 px-4 py-8 text-center text-xs text-misa-500">
      Jadwal Misa Indonesia · Direktori jadwal misa Katolik ·{" "}
      <FooterPageUpdatedTime />
    </footer>
  );
}
