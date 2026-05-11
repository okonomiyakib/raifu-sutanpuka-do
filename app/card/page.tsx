"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MAX_STAMPS, customerRepository } from "@/lib/customerRepository";

function StampCardContent() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id") ?? "";
  const customer = customerId ? customerRepository.findById(customerId) : null;

  if (!customer) {
    return (
      <main className="page hero">
        <section className="phone-shell panel" style={{ padding: 24, textAlign: "center" }}>
          <h1>カードが見つかりません</h1>
          <p className="lead" style={{ fontSize: 18 }}>
            登録画面からカードを作るか、店側に確認してください。
          </p>
          <Link className="button" href="/register">
            登録する
          </Link>
        </section>
      </main>
    );
  }

  const isFull = customer.stampCount >= MAX_STAMPS;

  return (
    <main className="page">
      <section className="phone-shell panel" style={{ padding: 22 }}>
        <div className="wood-panel" style={{ borderRadius: 24, padding: 24 }}>
          <p style={{ margin: 0, fontSize: 18 }}>らいふ お好み焼き</p>
          <h1 style={{ margin: "10px 0 0", fontSize: 34 }}>{customer.name}のカード</h1>
        </div>

        <div style={{ textAlign: "center", padding: "28px 0 18px" }}>
          <p className="muted" style={{ fontSize: 18, margin: 0 }}>
            現在のスタンプ
          </p>
          <strong style={{ display: "block", fontSize: 78, color: "var(--sauce)" }}>
            {customer.stampCount}
          </strong>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>
            / {MAX_STAMPS} 個
          </p>
        </div>

        <div className="stamp-grid" aria-label="スタンプカード">
          {Array.from({ length: MAX_STAMPS }).map((_, index) => (
            <div
              className={`stamp ${index < customer.stampCount ? "filled" : ""}`}
              key={index}
            >
              米
            </div>
          ))}
        </div>

        {isFull && (
          <div className="card" style={{ marginTop: 20, borderColor: "var(--sauce)" }}>
            <h2 style={{ margin: 0, color: "var(--sauce)", fontSize: 26 }}>
              特典が使えます
            </h2>
            <p style={{ fontSize: 20, fontWeight: 900 }}>
              お好み焼き1枚トッピング無料
            </p>
          </div>
        )}

        <div className="card" style={{ marginTop: 20 }}>
          <h2 style={{ marginTop: 0 }}>お店からひとこと</h2>
          <p className="lead" style={{ fontSize: 18, marginBottom: 0 }}>
            今日も来てくれてありがとうございます。鉄板をあたためて待っています。
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
    </main>
  );
}

export default function StampCardPage() {
  return (
    <Suspense
      fallback={
        <main className="page hero">
          <section className="phone-shell panel" style={{ padding: 24, textAlign: "center" }}>
            <p className="lead">カードを読み込み中です。</p>
          </section>
        </main>
      }
    >
      <StampCardContent />
    </Suspense>
  );
}
