<script setup lang="ts">
useSeoMeta({
  title: 'コンポーネントデモ一覧',
  description: 'Nuxt Contentでコンポーネントを呼び出すデモページ'
})
</script>

<template>
  <div class="container">
    <h1>コンポーネント呼び出しデモ</h1>
    <p class="subtitle">Markdown、YAML、JSONからコンポーネントを呼び出す実例</p>

    <div class="demo-grid">
      <NuxtLink to="/demos/markdown" class="demo-card">
        <div class="demo-icon">📝</div>
        <h2>Markdown デモ</h2>
        <p>MDC構文を使ったコンポーネント呼び出し</p>
        <span class="badge">推奨</span>
      </NuxtLink>

      <NuxtLink to="/demos/yaml" class="demo-card">
        <div class="demo-icon">📋</div>
        <h2>YAML デモ</h2>
        <p>YAMLのbodyフィールドでMDC構文を使用</p>
        <span class="badge badge-blue">データ + コンテンツ</span>
      </NuxtLink>

      <NuxtLink to="/demos/json" class="demo-card">
        <div class="demo-icon">🔤</div>
        <h2>JSON デモ</h2>
        <p>JSONのbodyフィールドでMDC構文を使用</p>
        <span class="badge badge-purple">プログラム生成</span>
      </NuxtLink>
    </div>

    <div class="info-section">
      <h2>利用可能なコンポーネント</h2>
      <div class="component-list">
        <div class="component-item">
          <h3>Alert</h3>
          <p>情報、警告、エラー、成功メッセージの表示</p>
          <code>::alert{type="info"}</code>
        </div>
        <div class="component-item">
          <h3>Card</h3>
          <p>カード形式のコンテナ、カラーバリエーション付き</p>
          <code>::card{title="タイトル" icon="📝" color="blue"}</code>
        </div>
        <div class="component-item">
          <h3>FeatureCard</h3>
          <p>機能を紹介するためのカード</p>
          <code>::feature-card{title="機能" icon="🚀" color="purple"}</code>
        </div>
      </div>
    </div>

    <div class="definition-section">
      <h2>コンポーネントの定義方法</h2>

      <div class="definition-card">
        <h3>1️⃣ Vueコンポーネントファイルの配置</h3>
        <p>コンポーネントは <code>components/content/</code> ディレクトリに配置します。</p>
        <pre><code>components/
└── content/
    ├── Alert.vue
    ├── Card.vue
    └── FeatureCard.vue</code></pre>
      </div>

      <div class="definition-card">
        <h3>2️⃣ コンポーネントの定義例</h3>
        <p>例: <code>components/content/Card.vue</code></p>
        <pre><code>&lt;script setup lang="ts"&gt;
defineProps&lt;{
  title?: string
  icon?: string
  color?: 'blue' | 'purple' | 'green' | 'red'
}&gt;()
&lt;/script&gt;

&lt;template&gt;
  &lt;div :class="['card', color]"&gt;
    &lt;div class="icon"&gt;{{ icon }}&lt;/div&gt;
    &lt;h3&gt;{{ title }}&lt;/h3&gt;
    &lt;slot /&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
      </div>

      <div class="definition-card">
        <h3>3️⃣ MDC構文での呼び出し</h3>
        <p>ファイル名がMDC構文にマッピングされます（PascalCase → kebab-case）</p>
        <pre><code>::card{title="タイトル" icon="🔵" color="blue"}
カードのコンテンツ（slotに渡される）
::</code></pre>
      </div>

      <div class="definition-card">
        <h3>4️⃣ 名前のマッピング規則</h3>
        <ul>
          <li><code>Card.vue</code> → <code>::card</code></li>
          <li><code>FeatureCard.vue</code> → <code>::feature-card</code></li>
          <li><code>Alert.vue</code> → <code>::alert</code></li>
        </ul>
      </div>

      <div class="definition-card">
        <h3>5️⃣ Props と Slots</h3>
        <ul>
          <li><strong>Props</strong>: <code>{prop="value"}</code> の形式で渡す</li>
          <li><strong>Slots</strong>: <code>::component-name</code> と <code>::</code> の間のコンテンツ</li>
          <li><strong>自己閉じタグ</strong>: スロットなしの場合は <code>::component-name{props}</code></li>
        </ul>
      </div>

      <div class="flow-diagram">
        <h3>📊 処理フロー</h3>
        <div class="flow-steps">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <strong>Markdown/YAML/JSON</strong>
              <code>::card{title="Hello"}</code>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <strong>remark解析</strong>
              <span>MDC構文をAST化</span>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <strong>コンポーネントマッピング</strong>
              <span>Card.vueを検索</span>
            </div>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <strong>Vueレンダリング</strong>
              <span>propsとslotを渡す</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1a202c;
}

.subtitle {
  font-size: 1.125rem;
  color: #718096;
  margin-bottom: 3rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.demo-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
  border: 2px solid transparent;
}

.demo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.demo-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.demo-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.demo-card p {
  color: #718096;
  margin-bottom: 1rem;
}

.badge {
  display: inline-block;
  background: #48bb78;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge-blue {
  background: #4299e1;
}

.badge-purple {
  background: #9f7aea;
}

.info-section {
  background: #f7fafc;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 3rem;
}

.info-section h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.component-list {
  display: grid;
  gap: 1.5rem;
}

.component-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.component-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #667eea;
}

.component-item p {
  color: #718096;
  margin-bottom: 0.75rem;
}

.component-item code {
  background: #2d3748;
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  display: block;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .demo-grid {
    grid-template-columns: 1fr;
  }
}

.definition-section {
  background: linear-gradient(to bottom, #f7fafc, #edf2f7);
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 4rem;
}

.definition-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #2d3748;
  text-align: center;
}

.definition-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #667eea;
}

.definition-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #667eea;
}

.definition-card p {
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.definition-card ul {
  list-style: none;
  padding-left: 0;
}

.definition-card ul li {
  padding: 0.5rem 0;
  color: #4a5568;
  display: flex;
  align-items: center;
}

.definition-card ul li::before {
  content: "▸";
  color: #667eea;
  font-weight: bold;
  margin-right: 0.5rem;
}

.definition-card pre {
  background: #2d3748;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin-top: 0.5rem;
}

.definition-card code {
  background: #2d3748;
  color: #e2e8f0;
  font-size: 0.875rem;
  font-family: 'Monaco', 'Menlo', monospace;
  line-height: 1.6;
}

.definition-card p code {
  background: #edf2f7;
  color: #667eea;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.flow-diagram {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.flow-diagram h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2d3748;
  text-align: center;
}

.flow-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  padding: 1rem 0;
}

.flow-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px;
  padding: 1rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.step-content {
  text-align: center;
}

.step-content strong {
  display: block;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.step-content span {
  display: block;
  color: #718096;
  font-size: 0.75rem;
}

.step-content code {
  display: block;
  background: #edf2f7;
  color: #667eea;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.flow-arrow {
  color: #cbd5e0;
  font-size: 2rem;
  font-weight: bold;
  flex-shrink: 0;
}

@media (max-width: 992px) {
  .flow-steps {
    flex-direction: column;
  }

  .flow-arrow {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }

  .flow-step {
    width: 100%;
  }
}
</style>
