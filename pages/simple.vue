<script setup lang="ts">
const { data: page } = await useAsyncData('simple', async () => {
  const result = await queryCollection('content').path('/simple').first()
  return result || null
})

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>

<template>
  <div v-if="page">
    <h1>{{ page.title }}</h1>
    <p class="meta">
      <span>著者: {{ page.author }}</span> |
      <span>公開日: {{ page.publishedAt }}</span>
    </p>
    <div class="tags">
      <span v-for="tag in page.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <!-- YAMLのbodyフィールドがMarkdownとして自動変換される -->
    <ContentRenderer :value="page" />
  </div>
  <div v-else>Page not found</div>
</template>

<style scoped>
.meta {
  color: #666;
  margin: 1rem 0;
}
.tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}
.tag {
  background: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>
