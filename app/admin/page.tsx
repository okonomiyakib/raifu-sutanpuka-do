"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BrandLayout, NinjaBanner } from "../components/BrandLayout";
import { MAX_STAMPS, customerRepository } from "@/lib/customerRepository";
import { useCustomers } from "@/lib/useCustomers";

export default function AdminPage() {
  const { customers, refresh } = useCustomers();
  const [keyword, setKeyword] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter((customer) =>
      `${customer.id} ${customer.name}`.toLowerCase().includes(query)
    );
  }, [customers, keyword]);

  const rewardReady = customers.filter((customer) => customer.stampCount >= MAX_STAMPS);

  function updateAndRefresh(action: () => void) {
    action();
    refresh();
  }

  function confirmAndRun(message: string, action: () => void) {
    if (!window.confirm(message)) return;
    updateAndRefresh(action);
  }

  return (
    <BrandLayout backHref="/" backLabel="トップへ">
      <section className="admin-brand">
        <NinjaBanner label="店側 管理の間" />
        <div className="admin-row" style={{ padding: 20 }}>
          <div>
            <span className="badge">鉄板前で使う、常連さん管理</span>
            <h1 className="section-title" style={{ marginTop: 14 }}>
              店側の管理画面
            </h1>
            <p className="muted" style={{ fontSize: 18, margin: 0 }}>
              スタンプ追加、修正、特典確認をここで行います。
            </p>
          </div>
          <Link className="button gold" href="/register">
            新規登録
          </Link>
        </div>
      </section>

      <section className="stat-grid">
          <div className="brand-card stat-card">
            <strong style={{ fontSize: 34 }}>{customers.length}</strong>
            <p className="muted">登録中のお客さん</p>
          </div>
          <div className="brand-card stat-card">
            <strong style={{ fontSize: 34 }}>{rewardReady.length}</strong>
            <p className="muted">10個たまったお客さん</p>
          </div>
      </section>

        <section className="brand-card" style={{ padding: 18 }}>
          <label htmlFor="search" style={{ fontSize: 18, fontWeight: 900 }}>
            お客さん検索
          </label>
          <input
            id="search"
            className="input"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="名前またはユーザーIDで検索"
            style={{ marginTop: 10 }}
          />
        </section>

        <section className="customer-list">
          {filteredCustomers.length === 0 ? (
            <div className="brand-card empty-state">
              <p className="lead">該当するお客さんがいません。</p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <article className="brand-card customer-admin-card" key={customer.id}>
                <div>
                  <h2 style={{ fontSize: 28, margin: 0 }}>{customer.name}</h2>
                  <p className="muted" style={{ margin: "8px 0 12px" }}>
                    ID: {customer.id}
                  </p>
                  <div className="customer-admin-card__meta">
                    <span className="pill">スタンプ {customer.stampCount} / {MAX_STAMPS}</span>
                    <span className="pill">来店 {customer.visitCount} 回</span>
                    <span className="pill">
                      最終 {customer.lastVisitDate ?? "まだありません"}
                    </span>
                    {customer.stampCount >= MAX_STAMPS && (
                      <span className="pill ready">特典が使えます</span>
                    )}
                    {customer.rewardUsed && <span className="pill">特典利用済み</span>}
                  </div>
                </div>
                  <div className="action-grid">
                    <button
                      className="button"
                      onClick={() =>
                        confirmAndRun(
                          `${customer.name}さんにスタンプを1個追加します。よろしいですか？`,
                          () => customerRepository.addStamp(customer.id)
                        )
                      }
                    >
                      スタンプ +1
                    </button>
                    <button
                      className="button secondary"
                      onClick={() =>
                        confirmAndRun(
                          `${customer.name}さんのスタンプを1個減らします。よろしいですか？`,
                          () => customerRepository.removeStamp(customer.id)
                        )
                      }
                    >
                      間違い修正 -1
                    </button>
                    <button
                      className="button secondary"
                      onClick={() =>
                        confirmAndRun(
                          `${customer.name}さんの特典を利用済みにします。スタンプは0に戻ります。`,
                          () => customerRepository.markRewardUsed(customer.id)
                        )
                      }
                    >
                      特典利用済みにする
                    </button>
                    <Link className="button green" href={`/card?id=${customer.id}`}>
                      カードを見る
                    </Link>
                  </div>
              </article>
            ))
          )}
        </section>
    </BrandLayout>
  );
}
