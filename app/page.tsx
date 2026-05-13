import Link from "next/link";
import Image from "next/image";
import { BrandLayout, NinjaBanner } from "./components/BrandLayout";

export default function HomePage() {
  return (
    <BrandLayout>
      <section className="hero-card brand-card">
        <div className="grid" style={{ gap: 22 }}>
          <NinjaBanner label="らいふ 常連札" />
          <span className="badge">町外れの鉄板前で、また会える楽しみを。</span>
          <h1 className="title">
            また来たくなる
            <br />
            忍者スタンプカード
          </h1>
          <p className="lead">
            10個集めると、お好み焼き1枚のトッピング無料。
            <br />
            割引だけで終わらない、常連さんのための小さなごほうびです。
          </p>
          <div className="grid two">
            <Link className="button gold" href="/register">
              お客さん登録
            </Link>
            <Link className="button secondary" href="/admin">
              店側の管理画面
            </Link>
          </div>
        </div>
        <div className="hero-card__visual">
          <Image
            className="owner-figure"
            src="/images/shop-owner.jpg"
            alt="鉄板ヘラを持つ店主キャラクター"
            width={1376}
            height={768}
            priority
          />
        </div>
      </section>
    </BrandLayout>
  );
}
