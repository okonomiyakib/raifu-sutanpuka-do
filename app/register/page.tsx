"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { customerRepository } from "@/lib/customerRepository";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("お名前を入力してください。");
      return;
    }

    const customer = customerRepository.create({ name: trimmed });
    router.push(`/card?id=${customer.id}`);
  }

  return (
    <main className="page">
      <section className="phone-shell panel" style={{ padding: 24 }}>
        <Link href="/" className="muted">
          ← トップへ
        </Link>
        <h1 style={{ fontSize: 34, margin: "24px 0 8px" }}>お客さん登録</h1>
        <p className="lead" style={{ fontSize: 18 }}>
          はじめての方はこちら。名前だけでスタンプカードを作れます。
        </p>

        <form onSubmit={handleSubmit} className="grid" style={{ marginTop: 24 }}>
          <label style={{ fontSize: 18, fontWeight: 900 }} htmlFor="name">
            お名前
          </label>
          <input
            id="name"
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="例：田中さん"
          />
          {error && <p style={{ color: "var(--sauce)", fontWeight: 900 }}>{error}</p>}
          <button className="button" type="submit">
            スタンプカードを作る
          </button>
        </form>
      </section>
    </main>
  );
}
