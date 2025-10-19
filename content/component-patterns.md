# コンポーネント呼び出しパターン集

> Nuxt ContentでVueコンポーネントを呼び出す様々な方法

## 📖 目次

1. [Markdown (MDC構文)](#markdown-mdc構文)
2. [YAML](#yaml)
3. [JSON](#json)
4. [実用パターン集](#実用パターン集)

---

## Markdown (MDC構文)

### 基本パターン

#### 1. シンプルなコンポーネント

```markdown
::alert
これは警告メッセージです
::
```

#### 2. Props指定（インライン）

```markdown
::alert{type="warning" dismissible}
これは警告メッセージです
::
```

#### 3. Props指定（YAML形式）

```markdown
::card
---
title: "カードタイトル"
icon: "rocket"
color: "blue"
---
カードの本文内容
::
```

#### 4. 名前付きスロット

```markdown
::hero
メインタイトル

#description
ヒーローの説明文

#cta
[始める](/start)
::
```

#### 5. ネストされたコンポーネント

```markdown
::tabs
  :::tab{label="タブ1"}
  タブ1の内容
  :::

  :::tab{label="タブ2"}
  タブ2の内容
  :::
::
```

---

## YAML

### パターン1: Markdownで呼び出し

**ファイル:** `content/page.yml`

```yaml
title: ページタイトル
description: 説明文
body: |
  # 見出し

  ::alert{type="info"}
  YAMLのbodyフィールド内でMDC構文が使えます
  ::

  ::card{title="機能カード" icon="star"}
  カードの内容
  ::
```

### パターン2: AST構造で直接定義

**コンポーネントを模した構造（非推奨）**

YAMLのAST構造では、Vueコンポーネントを直接表現できません。
代わりに、**HTML要素**としてレンダリングし、ページ側でカスタムコンポーネントに置き換える必要があります。

```yaml
title: カスタムページ
body:
  type: root
  children:
    # data-component属性でマーカー設置
    - type: element
      tag: div
      properties:
        dataComponent: "FeatureCard"
        dataProps: '{"title": "Fast", "icon": "rocket"}'
        className:
          - component-placeholder
      children:
        - type: text
          value: "Component will be rendered here"
```

**ページ側での処理が必要:**

```vue
<script setup lang="ts">
import { h } from 'vue'

const components = {
  div: (props, context) => {
    if (props['data-component']) {
      const componentName = props['data-component']
      const componentProps = JSON.parse(props['data-props'] || '{}')

      // 動的にコンポーネントをレンダリング
      const Component = resolveComponent(componentName)
      return h(Component, componentProps)
    }
    return h('div', props, context.slots)
  }
}
</script>

<template>
  <ContentRenderer :value="page" :components="components" />
</template>
```

---

## JSON

### パターン1: Markdownをbodyに含める（推奨）

**ファイル:** `content/page.json`

```json
{
  "title": "ページタイトル",
  "description": "説明文",
  "body": "# 見出し\n\n::alert{type=\"info\"}\nJSONのbodyフィールドでもMDC構文が使えます\n::\n\n::card{title=\"機能カード\" icon=\"star\"}\nカードの内容\n::"
}
```

**注意:** JSONでは改行を`\n`でエスケープする必要があり、読みにくくなります。

### パターン2: AST構造で定義（高度）

**data-component属性パターン**

```json
{
  "title": "カスタムページ",
  "body": {
    "type": "root",
    "children": [
      {
        "type": "element",
        "tag": "div",
        "properties": {
          "dataComponent": "Alert",
          "dataProps": "{\"type\": \"warning\", \"dismissible\": true}",
          "className": ["component-placeholder"]
        },
        "children": [
          {
            "type": "text",
            "value": "Alert component placeholder"
          }
        ]
      },
      {
        "type": "element",
        "tag": "div",
        "properties": {
          "dataComponent": "FeatureCard",
          "dataProps": "{\"title\": \"高速\", \"icon\": \"🚀\", \"color\": \"blue\"}",
          "className": ["component-placeholder"]
        },
        "children": [
          {
            "type": "text",
            "value": "FeatureCard placeholder"
          }
        ]
      }
    ]
  }
}
```

---

## 実用パターン集

### 1. Alert コンポーネント

#### Markdown

```markdown
<!-- 基本 -->
::alert
メッセージ
::

<!-- 種類指定 -->
::alert{type="warning"}
警告メッセージ
::

<!-- 閉じるボタン付き -->
::alert{type="error" dismissible}
エラーメッセージ
::
```

#### YAML

```yaml
body: |
  ::alert{type="info"}
  情報メッセージ
  ::
```

#### JSON（Markdown string）

```json
{
  "body": "::alert{type=\"success\"}\n成功メッセージ\n::"
}
```

---

### 2. Card コンポーネント

#### Markdown

```markdown
::card
---
title: カードタイトル
icon: rocket
color: blue
---
カードの内容
::
```

#### YAML

```yaml
body: |
  ::card{title="製品A" icon="star" color="purple"}
  製品Aの説明
  ::
```

---

### 3. Hero コンポーネント

#### Markdown

```markdown
::hero
サイトタイトル

#description
サイトの説明文がここに入ります

#cta
[今すぐ始める](/start)
::
```

#### YAML

```yaml
body: |
  ::hero
  YAMLで定義したヒーロー

  #description
  YAML bodyフィールドからの呼び出し

  #cta
  [詳細を見る](/details)
  ::
```

---

### 4. Tabs コンポーネント

#### Markdown

```markdown
::tabs
  :::tab{label="概要"}
  # 概要

  プロジェクトの概要です
  :::

  :::tab{label="機能"}
  # 機能

  - 機能1
  - 機能2
  :::

  :::tab{label="価格"}
  # 価格

  $29/月
  :::
::
```

---

### 5. FeatureCard（カスタム）

#### Markdown

```markdown
::feature-card{title="高速パフォーマンス" icon="🚀" color="blue"}
最適化されたアルゴリズムで高速処理を実現
::
```

#### YAML

```yaml
body: |
  ::feature-card{title="セキュア" icon="🔒" color="green"}
  エンタープライズグレードのセキュリティ
  ::
```

---

### 6. Grid Layout

#### Markdown

```markdown
::grid{cols="3"}
  :::card{title="機能1"}
  説明1
  :::

  :::card{title="機能2"}
  説明2
  :::

  :::card{title="機能3"}
  説明3
  :::
::
```

---

### 7. Code Block（特殊）

#### Markdown

```markdown
::code-group
  :::code{filename="index.js" language="javascript"}
  ```javascript
  console.log('Hello')
  ```
  :::

  :::code{filename="style.css" language="css"}
  ```css
  body { margin: 0; }
  ```
  :::
::
```

---

### 8. Callout

#### Markdown

```markdown
::callout{type="note"}
これは注意書きです
::

::callout{type="tip"}
💡 ヒント: この方法が推奨されます
::

::callout{type="warning"}
⚠️ 警告: この操作は取り消せません
::
```

---

### 9. Button Group

#### Markdown

```markdown
::button-group
  :::button{href="/signup" variant="primary"}
  無料で始める
  :::

  :::button{href="/demo" variant="secondary"}
  デモを見る
  :::
::
```

---

### 10. Image with Caption

#### Markdown

```markdown
::figure
  :::image{src="/images/screenshot.png" alt="スクリーンショット"}
  :::

  #caption
  図1: アプリケーションのスクリーンショット
::
```

---

## ハイブリッドパターン

### パターン1: YAML + Markdown

**ファイル:** `content/product.yml`

```yaml
# メタデータ
name: 製品A
price: 99
category: electronics
tags:
  - popular
  - new

# Markdownコンテンツ
description: |
  ## 製品概要

  ::alert{type="info"}
  期間限定セール中！
  ::

  ### 主な機能

  ::grid{cols="2"}
    :::feature-card{title="高速" icon="⚡"}
    処理速度2倍向上
    :::

    :::feature-card{title="省エネ" icon="🌱"}
    消費電力50%削減
    :::
  ::

# 仕様（データ）
specifications:
  weight: 500g
  dimensions: "20x15x5cm"
  color: Black
```

**ページでの利用:**

```vue
<script setup lang="ts">
const { data: product } = await useAsyncData(() =>
  queryCollection('products').path('/product-a').first()
)
</script>

<template>
  <div>
    <h1>{{ product.name }}</h1>
    <p class="price">${{ product.price }}</p>

    <!-- Markdownコンテンツをレンダリング -->
    <ContentRenderer :value="product" />

    <!-- データを直接利用 -->
    <div class="specs">
      <h3>仕様</h3>
      <ul>
        <li>重量: {{ product.specifications.weight }}</li>
        <li>サイズ: {{ product.specifications.dimensions }}</li>
      </ul>
    </div>
  </div>
</template>
```

---

### パターン2: JSON + コンポーネント定義

**ファイル:** `content/landing.json`

```json
{
  "title": "ランディングページ",
  "layout": "landing",
  "sections": [
    {
      "type": "hero",
      "title": "Welcome",
      "subtitle": "Build amazing things",
      "ctaText": "Get Started",
      "ctaLink": "/signup"
    },
    {
      "type": "features",
      "items": [
        {
          "title": "Fast",
          "description": "Lightning fast performance",
          "icon": "⚡"
        },
        {
          "title": "Secure",
          "description": "Enterprise-grade security",
          "icon": "🔒"
        }
      ]
    },
    {
      "type": "cta",
      "title": "Ready to start?",
      "buttonText": "Sign Up Free",
      "buttonLink": "/signup"
    }
  ]
}
```

**ページでの処理:**

```vue
<script setup lang="ts">
const { data: page } = await useAsyncData(() =>
  queryCollection('content').path('/landing').first()
)

const sectionComponents = {
  hero: defineAsyncComponent(() => import('~/components/sections/Hero.vue')),
  features: defineAsyncComponent(() => import('~/components/sections/Features.vue')),
  cta: defineAsyncComponent(() => import('~/components/sections/CTA.vue'))
}
</script>

<template>
  <div>
    <component
      v-for="(section, index) in page.sections"
      :key="index"
      :is="sectionComponents[section.type]"
      v-bind="section"
    />
  </div>
</template>
```

---

## まとめ

### 推奨される方法

| ファイル形式 | コンポーネント呼び出し方法 | 推奨度 |
|------------|------------------------|--------|
| **Markdown** | MDC構文 | ⭐⭐⭐⭐⭐ |
| **YAML** | bodyフィールドにMarkdown | ⭐⭐⭐⭐ |
| **JSON** | bodyフィールドにMarkdown（エスケープ） | ⭐⭐⭐ |
| **YAML/JSON** | AST + data-component属性 | ⭐⭐（高度） |
| **JSON** | sections配列 + 動的コンポーネント | ⭐⭐⭐⭐（ハイブリッド） |

### ベストプラクティス

✅ **Markdownファイルで記事・ドキュメント**
- MDC構文でコンポーネント呼び出し
- 最も書きやすく、読みやすい

✅ **YAMLファイルでデータ + コンテンツ**
- メタデータはYAML
- コンテンツ部分はbodyフィールドにMarkdown
- MDC構文が使える

✅ **JSONファイルでプログラム生成**
- データ構造を定義
- sections配列で構造化
- ページ側で動的にコンポーネント配置

❌ **避けるべきパターン**
- JSONに直接Markdown文字列（エスケープが煩雑）
- AST構造でVueコンポーネント模倣（複雑で保守性が低い）

---

## 参考リンク

- [MDC構文ドキュメント](https://content.nuxt.com/docs/files/markdown)

---

**最終更新:** 2025-01-18
