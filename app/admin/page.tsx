"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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

  return (
    <main className="page">
      <section className="shell">
        <div className="admin-row" style={{ marginBottom: 20 }}>
          <div>
            <Link href="/" className="muted">
              ← トップへ
            </Link>
            <h1 style={{ fontSize: 38, margin: "14px 0 6px" }}>店側の管理画面</h1>
            <p className="muted" style={{ fontSize: 18, margin: 0 }}>
              スタンプの追加・修正、来店回数の確認ができます。
            </p>
          </div>
          <Link className="button" href="/register">
            新規登録
          </Link>
        </div>

        <div className="grid two">
          <div className="card">
            <strong style={{ fontSize: 34 }}>{customers.length}</strong>
            <p className="muted">登録中のお客さん</p>
          </div>
          <div className="card">
            <strong style={{ fontSize: 34, color: "var(--sauce)" }}>
              {rewardReady.length}
            </strong>
            <p className="muted">10個たまったお客さん</p>
          </div>
        </div>

        <div className="panel" style={{ padding: 18, marginTop: 20 }}>
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
        </div>

        <div className="grid" style={{ marginTop: 20 }}>
          {filteredCustomers.length === 0 ? (
            <div className="panel" style={{ padding: 28, textAlign: "center" }}>
              <p className="lead">該当するお客さんがいません。</p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <article className="panel" style={{ padding: 18 }} key={customer.id}>
                <div className="admin-row">
                  <div>
                    <h2 style={{ fontSize: 26, margin: 0 }}>{customer.name}</h2>
                    <p className="muted" style={{ margin: "6px 0" }}>
                      ID: {customer.id}
                    </p>
                    <p style={{ fontSize: 18, margin: "8px 0" }}>
                      スタンプ <strong>{customer.stampCount}</strong> / {MAX_STAMPS}
                      {"　"}来店 <strong>{customer.visitCount}</strong> 回
                    </p>
                    <p className="muted" style={{ margin: 0 }}>
                      最終来店日: {customer.lastVisitDate ?? "まだありません"}
                    </p>
                    {customer.stampCount >= MAX_STAMPS && (
                      <p style={{ color: "var(--sauce)", fontWeight: 900 }}>
                        特典が使えます
                      </p>
                    )}
                  </div>
                  <div className="grid" style={{ minWidth: 220 }}>
                    <button
                      className="button"
                      onClick={() =>
                        updateAndRefresh(() => customerRepository.addStamp(customer.id))
                      }
                    >
                      スタンプ +1
                    </button>
                    <button
                      className="button secondary"
                      onClick={() =>
                        updateAndRefresh(() => customerRepository.removeStamp(customer.id))
                      }
                    >
                      間違い修正 -1
                    </button>
                    <button
                      className="button secondary"
                      onClick={() =>
                        updateAndRefresh(() => customerRepository.markRewardUsed(customer.id))
                      }
                    >
                      特典利用済みにする
                    </button>
                    <Link className="button green" href={`/card?id=${customer.id}`}>
                      カードを見る
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
