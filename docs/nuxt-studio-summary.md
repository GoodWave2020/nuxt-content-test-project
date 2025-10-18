# Nuxt Studio 要約ガイド

> Nuxt Studioの機能と効果的な活用方法

## 📖 目次

1. [Nuxt Studioとは](#nuxt-studioとは)
2. [何ができるか](#何ができるか)
3. [何ができないか](#何ができないか)
4. [役割分担](#役割分担)
5. [成功の鍵：事前設計](#成功の鍵事前設計)
6. [実践ワークフロー](#実践ワークフロー)

---

## Nuxt Studioとは

**Nuxt Content専用のビジュアルCMS**。非技術者でもMarkdown、YAML、JSONファイルを直感的に編集できるツールです。

### 特徴

- 🎨 **ビジュアルエディタ** - Notion風のUI
- 📝 **自動フォーム生成** - スキーマから自動作成
- 🧩 **コンポーネント挿入** - `/`キーで簡単配置
- 👁️ **リアルタイムプレビュー** - 編集内容を即座に確認
- 🔄 **Git連携** - GitHub経由で公開

### 重要な制約

⚠️ **Nuxt Studioはコンテンツ管理ツールであり、コード開発環境ではありません**

---

## 何ができるか

### ✅ 編集可能なファイル

| 対象 | 詳細 |
|------|------|
| **contentディレクトリ** | Markdown, YAML, JSON |
| **/public** | 画像・メディアファイル |
| **app.config.ts** | アプリケーション設定 |

### ✅ 編集機能

#### 1. Markdownエディタ

```markdown
<!-- Notion風のビジュアルエディタで編集 -->
---
title: My Article
tags: [nuxt, content]
---

# Article Title

Content with **formatting**

::alert{type="info"}
Component insertion
::
```

**機能:**
- リッチテキスト編集
- 見出し、リスト、太字、リンクなど
- MDC構文サポート

#### 2. フォームエディタ（YAML/JSON）

スキーマから自動生成されるフォーム：

```yaml
# content/product.yml
name: Product Name          # テキスト入力
price: 99                   # 数値入力
category: electronics       # セレクトボックス
inStock: true              # チェックボックス
features:                   # 配列フィールド
  - Feature 1
  - Feature 2
```

#### 3. コンポーネント挿入

`/` キーで利用可能なコンポーネント一覧を表示：

- Alert
- Card
- Hero
- その他、開発者が作成したコンポーネント

**ビジュアル編集:**
- Props編集（GUI）
- スロット編集（GUI）
- プレビュー確認

#### 4. メディア管理

`/public`フォルダの画像・ファイル管理：
- アップロード
- 削除
- リネーム
- Markdown/JSONへの挿入

---

## 何ができないか

### ❌ 編集不可能なファイル

| 対象 | 理由 |
|------|------|
| **Vueファイル (.vue)** | コード開発は別ツールで |
| **nuxt.config.ts** | 設定ファイルは開発者が管理 |
| **pages/, layouts/** | ルーティング・レイアウトは開発対象 |
| **composables/, plugins/** | コードロジックは開発対象 |
| **components/content/** | コンポーネント作成は開発者が担当 |

### ❌ できない作業

- Vueコンポーネントの作成・編集
- TypeScript/JavaScriptコードの記述
- CSS/スタイルの直接編集
- プラグイン・モジュールの設定
- ビルド設定の変更

### ⚠️ 制限事項

- Vueコンポーネントは「使う」だけ（作成はできない）
- 開発者が作成したコンポーネントのみ利用可能
- スキーマ定義が必要（自動フォーム生成のため）

---

## 役割分担

### 開発者の役割

| タスク | ツール | 頻度 |
|--------|--------|------|
| Vueコンポーネント作成 | VSCode等 | 初回 + 機能追加時 |
| スキーマ定義 | content.config.ts | 初回 + 新コンテンツタイプ追加時 |
| プロジェクト構造設計 | VSCode等 | 初回 |
| デザイン・スタイル調整 | VSCode等 | 随時 |
| Nuxt設定 | nuxt.config.ts | 初回 + 必要時 |

### 編集者（非技術者）の役割

| タスク | ツール | 頻度 |
|--------|--------|------|
| 記事作成・編集 | Nuxt Studio | 日常的 |
| メタデータ入力 | Nuxt Studio（フォーム） | 日常的 |
| コンポーネント配置 | Nuxt Studio（/キー） | 日常的 |
| 画像アップロード | Nuxt Studio（メディア） | 日常的 |
| プレビュー確認 | Nuxt Studio | 日常的 |
| 公開 | Nuxt Studio（Git） | 日常的 |

**重要:** 開発者と編集者で**完全に役割を分離**できます。

---

## 成功の鍵：事前設計

### ⚠️ 最重要ポイント

**Nuxt Studioを効果的に活用するには、開発者が最初にCMS構造をしっかり設計することが9割です。**

### 開発者が最初にやるべきこと

#### 1. スキーマ設計

```typescript
// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        // 文字列
        title: z.string(),
        description: z.string(),

        // 選択式（セレクトボックス）
        category: z.enum(['tech', 'design', 'business']),

        // 配列（制約付き）
        tags: z.array(z.string()).min(1).max(5),

        // 日付（日付ピッカー）
        publishedAt: z.date(),

        // 真偽値（チェックボックス）
        featured: z.boolean().default(false),

        // ネストされたオブジェクト
        author: z.object({
          name: z.string(),
          email: z.string().email()
        }),

        // オプショナル
        coverImage: z.object({
          src: z.string(),
          alt: z.string()
        }).optional()
      })
    }),

    // データコレクション（製品など）
    products: defineCollection({
      type: 'data',
      source: 'products/**/*.yml',
      schema: z.object({
        name: z.string(),
        price: z.number().positive(),
        inStock: z.boolean(),
        features: z.array(z.string())
      })
    })
  }
})
```

**効果:**
- Studio上で**自動的にフォーム生成**
- バリデーション自動適用
- TypeScript型自動生成

#### 2. 再利用可能なVueコンポーネント作成

```vue
<!-- components/content/FeatureCard.vue -->
<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  color?: 'blue' | 'purple' | 'green'
}>()
</script>

<template>
  <div :class="['feature-card', `color-${color || 'blue'}`]">
    <div class="icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.color-blue { background: #e3f2fd; }
.color-purple { background: #f3e5f5; }
.color-green { background: #e8f5e9; }
</style>
```

**ポイント:**
- `/components/content/`に配置
- Props型定義を明確に
- スロットで柔軟性を持たせる
- デフォルト値を設定

#### 3. コンポーネントドキュメント作成

```markdown
<!-- content/.docs/components.md -->
# 利用可能なコンポーネント

## FeatureCard

機能をカード形式で表示します。

### 使い方

::feature-card{title="タイトル" icon="🚀" color="blue"}
ここにカードの内容を書きます。
::

### Props

| Prop | 型 | 必須 | 説明 |
|------|------|------|------|
| title | string | ✅ | カードのタイトル |
| icon | string | ✅ | アイコン（絵文字推奨） |
| color | 'blue' \| 'purple' \| 'green' | ❌ | カラーテーマ（デフォルト: blue） |

### 例

::feature-card{title="高速" icon="⚡" color="purple"}
最適化されたパフォーマンス
::
```

#### 4. プロジェクト構造設計

```
content/
  blog/              # ブログ記事（Markdown）
  products/          # 製品データ（YAML）
  pages/             # 固定ページ（Markdown）
  .docs/             # コンポーネントドキュメント
    components.md
    guidelines.md

components/
  content/           # Studioで使えるコンポーネント
    Alert.vue
    Card.vue
    FeatureCard.vue
    Hero.vue
    PricingTable.vue

public/
  images/            # 画像ファイル
  icons/             # アイコン

content.config.ts    # スキーマ定義
nuxt.config.ts       # Nuxt設定（Studio有効化）
```

#### 5. Studio有効化

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    studio: true
  }
})
```

---

## 実践ワークフロー

### フェーズ1: セットアップ（開発者）

```mermaid
開発者
  ↓
1. スキーマ設計（content.config.ts）
  ↓
2. Vueコンポーネント作成
  ↓
3. プロジェクト構造設計
  ↓
4. ドキュメント作成
  ↓
5. Studio有効化
  ↓
編集者に引き継ぎ
```

**所要時間:** 初回セットアップ 1-3日

### フェーズ2: 日常運用（編集者）

#### Studioでの編集フロー

1. **新規記事作成**
   - Studio上で「New Document」
   - フォームでメタデータ入力（自動生成）

2. **本文編集**
   - Markdownエディタで執筆
   - `/` キーでコンポーネント挿入

3. **コンポーネント配置**
   ```markdown
   ::feature-card{title="新機能" icon="✨" color="blue"}
   素晴らしい新機能の説明
   ::
   ```

4. **画像挿入**
   - メディア管理から選択
   - または新規アップロード

5. **プレビュー確認**
   - リアルタイムプレビューで確認

6. **公開**
   - 「Publish」ボタン
   - Git経由で自動デプロイ

**所要時間:** 記事1本あたり 30分-1時間

### フェーズ3: メンテナンス（開発者）

| タスク | タイミング | 作業内容 |
|--------|-----------|---------|
| 新コンポーネント追加 | 機能追加時 | Vue作成 + ドキュメント |
| スキーマ更新 | 新フィールド追加時 | content.config.ts編集 |
| デザイン調整 | デザイン変更時 | CSS/Vueファイル編集 |
| バグ修正 | 必要時 | コード修正 |

---

## 実際の編集例

### Studio上での記事作成（編集者）

#### 1. フォーム入力（自動生成）

```
タイトル: [新製品発表                    ]
カテゴリ: [business ▼                    ]
タグ:     [+ 追加] product  launch  news
公開日:   [📅 2025-01-18                 ]
注目記事: [✓] チェック
```

#### 2. Markdownエディタ

```markdown
# 新製品を発表します

本日、待望の新製品を発表いたします。

（ここで / を押すとコンポーネント一覧が表示）
```

#### 3. コンポーネント挿入（GUIで編集）

```markdown
::feature-card{title="高速パフォーマンス" icon="🚀" color="blue"}
最適化されたアルゴリズムにより、従来比2倍の速度を実現。
::

::feature-card{title="使いやすさ" icon="✨" color="purple"}
直感的なインターフェースで誰でも簡単に操作できます。
::

::pricing-table{tier="pro" price="29"}
#cta
[今すぐ始める](/signup)
::
```

#### 4. プレビュー → 公開

- プレビューで確認
- 問題なければ「Publish」
- GitHub経由で自動デプロイ

---

## ベストプラクティス

### 開発者向け

✅ **スキーマは厳密に定義**
```typescript
// ❌ 悪い例
z.any()

// ✅ 良い例
z.enum(['draft', 'published', 'archived'])
z.string().email()
z.number().positive()
```

✅ **コンポーネントは汎用的に**
```vue
<!-- ❌ 固定的 -->
<div style="background: blue;">

<!-- ✅ 柔軟 -->
<div :style="{ background: color }">
```

✅ **ドキュメントを充実**
- 各コンポーネントの使い方
- Props一覧
- 実例

### 編集者向け

✅ **ドキュメントを確認**
- `.docs/components.md`を参照
- 利用可能なコンポーネント確認

✅ **プレビューで確認**
- 公開前に必ずチェック
- レスポンシブ表示も確認

✅ **命名規則に従う**
- ファイル名: `kebab-case.md`
- 画像: `/images/descriptive-name.jpg`

---

## よくある質問

### Q1: Vueファイルは編集できますか？

**A:** いいえ。Studioは**コンテンツファイルのみ**編集可能です。Vueファイルは開発者がVSCode等で編集します。

### Q2: 新しいコンポーネントを追加したい

**A:** 開発者に依頼してください。開発者が`components/content/`にVueファイルを作成すれば、Studioで利用可能になります。

### Q3: スキーマ変更は誰がやる？

**A:** 開発者が`content.config.ts`を編集します。変更後、Studioのフォームが自動更新されます。

### Q4: オフラインで編集できる？

**A:** いいえ。StudioはWebベースです。オフライン編集にはローカルのMarkdownエディタを使用してください。

### Q5: 複数人で同時編集できる？

**A:** 基本的にGitベースなので、ブランチを分けることを推奨します。同じファイルの同時編集は競合の可能性があります。

---

## まとめ

### Nuxt Studioの価値

✅ **非技術者でもコンテンツ管理可能**
✅ **開発者は開発に集中できる**
✅ **完全な役割分担の実現**
✅ **Git管理で安全性確保**

### 成功の3原則

1. **最初の設計が9割** - スキーマとコンポーネントをしっかり設計
2. **役割分担の明確化** - 開発者と編集者の境界を明確に
3. **ドキュメント充実** - 編集者が迷わないように

### こんなプロジェクトに最適

✅ 開発チーム + 編集チームがいる
✅ 中小規模のコンテンツサイト
✅ Git管理したい
✅ 非技術者にも編集権限を与えたい

---

## 参考リンク

- 🎨 [Nuxt Studio](https://nuxt.studio)
- 📖 [Studio ドキュメント](https://content.nuxt.com/docs/studio)
- 📝 [Nuxt Content要約](./nuxt-content-summary.md)
- 📚 [詳細ガイド](./nuxt-content-guide.md)

---

**最終更新:** 2025-01-18
