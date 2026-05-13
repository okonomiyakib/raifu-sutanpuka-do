# らいふ スタンプカード

町外れのお好み焼き屋「らいふ」向けのデジタルスタンプカードWebアプリです。

常連さんとリピーターを増やすことを目的に、単なるポイントカードではなく、和風・忍者・鉄板焼きの温かい世界観で「また来たい」と感じてもらえる体験を目指しています。

## 概要

- お客さん登録
- スマホ向けスタンプカード表示
- 10個で満タンのスタンプ表示
- 10個達成時の特典表示
- 特典内容: お好み焼き1枚トッピング無料
- お店からの一言メッセージ
- LINE登録ボタン
- 店側管理画面でのお客さん検索
- スタンプ追加、スタンプ削除
- 来店回数、最終来店日の確認
- 特典利用済み処理

## 使用技術

- Next.js
- React
- TypeScript
- CSS Modulesではなく `app/globals.css` によるグローバルCSS
- localStorage

Tailwind CSSは現時点では未導入です。既存デザインは `app/globals.css` で管理しています。

## 画面

- `/` トップ画面
- `/register` お客さん登録画面
- `/card?id=ユーザーID` お客さんのスタンプカード画面
- `/admin` 店側の管理画面

## データ保存

MVPではブラウザの `localStorage` に保存しています。

保存するデータ:

- ユーザーID
- 名前
- スタンプ数
- 来店回数
- 最終来店日
- 特典利用済みかどうか

保存処理は `lib/customerRepository.ts` にまとめています。将来的にSupabaseへ差し替える場合は、このファイルを中心に変更します。

## 画像素材の配置場所

画像は `public/images` に配置しています。

- `public/images/shop-owner.jpg`
- `public/images/ninja-banner.jpg`

## ローカル起動方法

```bash
npm install
npm run dev
```

ブラウザで開きます。

```text
http://localhost:3000
```

別ポートで起動する場合:

```bash
npm run dev -- -p 3001
```

## ビルド方法

```bash
npm run build
```

## GitHubへ保存する方法

初回の場合:

```bash
git init
git add .
git commit -m "Initial commit: digital stamp card app"
git branch -M main
git remote add origin <GitHubリポジトリURL>
git push -u origin main
```

既にremoteがある場合:

```bash
git add .
git commit -m "Prepare digital stamp card app for deployment"
git push
```

## Vercelデプロイ方法

1. Vercelで「Add New Project」を選択します。
2. GitHubリポジトリを選択します。
3. Framework Preset は `Next.js` を選択します。
4. Install Command は `npm install` を使います。
5. Build Command は `npm run build` を使います。
6. Output Directory はNext.js標準設定のまま空欄にします。
7. Deploy を実行します。

## 環境変数

現時点では不要です。

`.env.local` は `.gitignore` で除外しています。将来Supabaseなどを追加する場合のみ、Vercel側に環境変数を設定してください。

## 注意点

- ログイン機能は未実装です。
- 決済機能は未実装です。
- 予約機能は未実装です。
- データはブラウザごとの `localStorage` に保存されます。
- スマホ実機で確認する場合、端末ごとに保存データは別になります。
- GitHub Pages向けに `next.config.ts` で静的出力設定を入れています。

## 今後追加予定の機能

- 店員用の簡易PIN認証
- LINE友だち追加URLの正式設定
- QRコードから個別カードを開く機能
- Supabaseへのデータ保存移行
- 特典利用履歴
- 来店メモ
- 誕生日や記念日のメッセージ
- 管理画面のCSV出力

## 動作確認チェックリスト

- トップ画面が表示される
- お客さん側スタンプカードが表示される
- 画像が表示される
- スタンプ数が表示される
- 管理画面が表示される
- スタンプ追加ができる
- スタンプ削除ができる
- 10個たまった時に特典表示が出る
- スマホ表示で崩れていない
- VercelのURLをスマホで開ける
