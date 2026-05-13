"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrandLayout, NinjaBanner } from "../components/BrandLayout";
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
    <BrandLayout compact backHref="/" backLabel="トップへ">
      <section className="brand-card" style={{ padding: 20 }}>
        <NinjaBanner label="はじめての常連札" />
        <div className="grid" style={{ marginTop: 22 }}>
          <span className="badge">名前だけで作れます</span>
          <h1 className="section-title">お客さん登録</h1>
          <p className="lead">
            次に来た時、すぐ押せるように。
            <br />
            お名前を入れてカードを作ります。
          </p>
        </div>

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
          <button className="button gold" type="submit">
            スタンプカードを作る
          </button>
          <Link className="button secondary" href="/">
            トップへ戻る
          </Link>
        </form>
      </section>
    </BrandLayout>
  );
}
