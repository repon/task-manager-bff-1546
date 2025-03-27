# 🛠️ タスク管理 / 買い物リストアプリ（BFF構成）

## 🤪️ タスク管理 / 買い物リストアプリ（BFF構成）

### 📺 技術スタック

- **フロントエンド**：Nuxt3 or SvelteKit
- **BFF（API）**：Nuxt3 / SvelteKit の API Routes
- **DB / 認証**：Supabase（PostgreSQL + Auth）
- **デプロイ先**：Vercel（フロント） / Railway or Supabase（BFF & DB）

### 📺 必須機能

#### **ユーザー認証（Supabase Auth）**

- Google / GitHub ログイン（JWTトークン発行）
- 認証情報をBFFが管理し、フロントでは直接アクセスさせない
- `/api/login` にて Supabase Auth を呼び出す処理をBFF側に実装する
- Supabaseの `@supabase/supabase-js` ライブラリは **フロント側で使わず**、BFF側のみで使用
- JWTトークンは BFF で `HttpOnly Cookie` に格納し、フロントは直接扱わない
- 認証状態の確認、ユーザー情報の取得は `/api/me` のようなBFFエンドポイントを介して行う

#### **タスク / 買い物リストのCRUD**

- `GET /tasks` → ログインユーザーのタスク一覧取得
- `POST /tasks` → タスク追加
- `PATCH /tasks/:id` → タスク更新
- `DELETE /tasks/:id` → タスク削除

#### **BFFによるAPI整形**

- Supabaseのデータを取得 → 必要な情報だけフロントに渡す
- `task_status: "pending" | "done"` を **"未完了" | "完了"** に変換
- `created_at` を `YYYY/MM/DD` の形式に変換

#### **リストの並び替え / フィルタリング**

- 期限順 / 重要度順
- 完了済み・未完了フィルタ

### 📺 拡張機能（時間あれば）

#### **買い物リストモード**

- 「カテゴリ」追加（食料品・日用品・ガジェットなど）
- **「過去の購入履歴」**を保存してリピート買いしやすく

#### **PWA対応**

- オフラインでリストを編集 → 後で同期

#### **Webhook通知**

- 「期限が近づいたら通知」機能（Telegram / LINE通知）
