import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page hero">
      <section className="shell panel wood-panel" style={{ padding: "34px" }}>
        <span className="badge">鉄板の上の、小さな楽しみ</span>
        <h1 className="title" style={{ marginTop: 24 }}>
          また来たくなる
          <br />
          スタンプカード
        </h1>
        <p className="lead" style={{ color: "#fff1d8", marginTop: 20 }}>
          町外れのお好み焼き屋「らいふ」の常連さんへ。
          <br />
          10個たまると、お好み焼き1枚のトッピングが無料です。
        </p>
        <div className="grid two" style={{ marginTop: 28 }}>
          <Link className="button" href="/register">
            お客さん登録
          </Link>
          <Link className="button secondary" href="/admin">
            店側の管理画面
          </Link>
        </div>
      </section>
    </main>
  );
}
