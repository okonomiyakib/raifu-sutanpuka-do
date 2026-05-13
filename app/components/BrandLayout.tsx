import Link from "next/link";
import Image from "next/image";

type BrandLayoutProps = {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  compact?: boolean;
};

export function BrandLayout({
  children,
  backHref,
  backLabel = "戻る",
  compact = false,
}: BrandLayoutProps) {
  return (
    <main className={`brand-page ${compact ? "brand-page--compact" : ""}`}>
      <div className="brand-glow brand-glow--gold" />
      <div className="brand-glow brand-glow--blue" />
      <section className={compact ? "phone-shell brand-stack" : "shell brand-stack"}>
        {backHref && (
          <Link href={backHref} className="back-link">
            ← {backLabel}
          </Link>
        )}
        {children}
      </section>
    </main>
  );
}

export function NinjaBanner({ label }: { label?: string }) {
  return (
    <div className="ninja-banner">
      <Image
        src="/images/ninja-banner.jpg"
        alt="忍者キャラクターのブランドバナー"
        width={1116}
        height={623}
        priority
      />
      <div className="ninja-banner__shade" />
      {label && <span className="ninja-banner__label">{label}</span>}
    </div>
  );
}
