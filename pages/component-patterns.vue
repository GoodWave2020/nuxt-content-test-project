<script setup lang="ts">
const { data: page } = await useAsyncData('component-patterns', async () => {
  const result = await queryCollection('content').path('/component-patterns').first()
  return result || null
})

useSeoMeta({
  title: page.value?.title || 'Component Patterns',
  description: page.value?.description || 'Nuxt Contentでコンポーネントを呼び出す様々な方法'
})
</script>

<template>
  <div class="container">
    <ContentRenderer v-if="page" :value="page" class="prose" />
    <div v-else class="error">
      <h1>Page not found</h1>
      <p>component-patterns.md が見つかりません</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.error {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

/* Prose styling for better readability */
.prose {
  line-height: 1.75;
}

.prose :deep(h1) {
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1a202c;
}

.prose :deep(h2) {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
  color: #2d3748;
}

.prose :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #4a5568;
}

.prose :deep(h4) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #718096;
}

.prose :deep(p) {
  margin-bottom: 1rem;
  color: #4a5568;
}

.prose :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.prose :deep(code) {
  background: #f7fafc;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #e53e3e;
  font-family: 'Courier New', monospace;
}

.prose :deep(pre) {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.prose :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

.prose :deep(blockquote) {
  border-left: 4px solid #667eea;
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1rem;
  color: #718096;
  font-style: italic;
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.25rem;
}

.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border-radius: 0.5rem;
}

.prose :deep(thead) {
  background: #667eea;
  color: white;
}

.prose :deep(th) {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #4c51bf;
}

.prose :deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
}

.prose :deep(tbody tr:hover) {
  background: #f7fafc;
}

.prose :deep(a) {
  color: #667eea;
  text-decoration: underline;
  transition: color 0.2s;
}

.prose :deep(a:hover) {
  color: #4c51bf;
}

.prose :deep(strong) {
  font-weight: 600;
  color: #2d3748;
}

.prose :deep(em) {
  font-style: italic;
  color: #718096;
}

.prose :deep(hr) {
  border: 0;
  border-top: 2px solid #e2e8f0;
  margin: 3rem 0;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .prose :deep(h1) {
    font-size: 2rem;
  }

  .prose :deep(h2) {
    font-size: 1.5rem;
  }

  .prose :deep(h3) {
    font-size: 1.25rem;
  }

  .prose :deep(pre) {
    padding: 1rem;
    font-size: 0.75rem;
  }

  .prose :deep(table) {
    font-size: 0.875rem;
  }

  .prose :deep(th),
  .prose :deep(td) {
    padding: 0.5rem 0.75rem;
  }
}
</style>
