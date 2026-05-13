"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BrandLayout, NinjaBanner } from "../components/BrandLayout";
import { StampCard } from "../components/StampCard";
import { MAX_STAMPS, customerRepository } from "@/lib/customerRepository";

function StampCardContent() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id") ?? "";
  const customer = customerId ? customerRepository.findById(customerId) : null;

  if (!customer) {
    return (
      <BrandLayout compact>
        <section className="brand-card" style={{ padding: 22, textAlign: "center" }}>
          <NinjaBanner label="カード確認" />
          <div className="hero-card__visual" style={{ marginTop: 18 }}>
            <Image
              className="owner-figure"
              src="/images/shop-owner.jpg"
              alt="鉄板ヘラを持つ店主キャラクター"
              width={1376}
              height={768}
            />
          </div>
          <h1 className="section-title" style={{ marginTop: 22 }}>
            カードが見つかりません
          </h1>
          <p className="lead" style={{ fontSize: 18, marginTop: 12 }}>
            登録画面からカードを作るか、店側に確認してください。
          </p>
          <Link className="button gold" href="/register" style={{ marginTop: 18 }}>
            登録する
          </Link>
        </section>
      </BrandLayout>
    );
  }

  const isFull = customer.stampCount >= MAX_STAMPS;
  const rank = isFull ? "特典忍者" : customer.stampCount >= 6 ? "常連忍者" : "見習い忍者";

  return (
    <BrandLayout compact>
      <NinjaBanner label="らいふ お好み焼き 常連札" />

      <section className="brand-card" style={{ padding: 20 }}>
        <div className="customer-card-head">
          <div className="owner-avatar">
            <Image src="/images/shop-owner.jpg" alt="店主キャラクター" width={1376} height={768} />
          </div>
          <div>
            <span className="rank-badge">{rank}</span>
            <h1 style={{ margin: "8px 0 0", fontSize: 30 }}>{customer.name}さんのカード</h1>
          </div>
        </div>

        <div className="message-card paper-card" style={{ marginTop: 22 }}>
          <p className="paper-muted" style={{ margin: 0, fontSize: 16, fontWeight: 900 }}>
            お店からひとこと
          </p>
          <p style={{ margin: "8px 0 0", fontSize: 21, fontWeight: 900, lineHeight: 1.6 }}>
            今日も来てくれてありがとうございます。
            <br />
            鉄板をあたためて待っています。
          </p>
        </div>

        {isFull && (
          <div className="reward-card paper-card" style={{ marginTop: 18 }}>
            <div className="reward-visual">
              <Image
                src="/images/shop-owner.jpg"
                alt="特典達成を知らせる店主キャラクター"
                width={1376}
                height={768}
              />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ margin: 0, color: "var(--sauce)", fontSize: 27 }}>
                特典が使えます！
              </h2>
              <p style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 900 }}>
                お店の人にこの画面を見せてください。
              </p>
            </div>
          </div>
        )}

        <div className="stamp-count" style={{ padding: "22px 0 14px" }}>
          <p className="muted" style={{ margin: 0, fontSize: 18, fontWeight: 900 }}>
            現在のスタンプ
          </p>
          <strong>{customer.stampCount}</strong>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>/ {MAX_STAMPS} 個</p>
        </div>

        <StampCard stampCount={customer.stampCount} />

        <div className="benefit-card brand-card" style={{ marginTop: 18 }}>
          <p className="badge" style={{ margin: 0 }}>
            10個達成の特典
          </p>
          <h2 style={{ margin: "12px 0 0", fontSize: 27 }}>お好み焼き1枚トッピング無料</h2>
          <p className="muted" style={{ margin: "8px 0 0", lineHeight: 1.7 }}>
            ソースの香りと一緒に、次の一枚を少し楽しく。
          </p>
        </div>

        <div className="grid" style={{ marginTop: 20 }}>
          <a className="button green" href="https://line.me/" target="_blank">
            LINE登録はこちら
          </a>
          <Link className="button secondary" href="/">
            トップへ戻る
          </Link>
        </div>
      </section>
    </BrandLayout>
  );
}

export default function StampCardPage() {
  return (
    <Suspense
      fallback={
        <BrandLayout compact>
          <section className="brand-card" style={{ padding: 24, textAlign: "center" }}>
            <p className="lead">カードを読み込み中です。</p>
          </section>
        </BrandLayout>
      }
    >
      <StampCardContent />
    </Suspense>
  );
}
