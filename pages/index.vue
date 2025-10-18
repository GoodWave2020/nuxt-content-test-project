<script setup lang="ts">
const { data } = await useAsyncData('json-data', async () => {
  const result = await queryCollection('content').path('/data').first()
  return result || null
})

// AST構造を確認（開発時のみ）
if (process.dev && data.value?.body) {
  console.log('AST Structure:', JSON.stringify(data.value.body, null, 2))
}

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description
})
</script>

<template>
  <div v-if="data">
    <h1>{{ data.title }}</h1>
    <p>{{ data.description }}</p>

    <div v-if="data.items">
      <h2>Items</h2>
      <ul>
        <li v-for="item in data.items" :key="item.id">
          <strong>{{ item.name }}</strong>: {{ item.description }}
        </li>
      </ul>
    </div>

    <div v-if="data.metadata">
      <h3>Metadata</h3>
      <p>Author: {{ data.metadata.author }}</p>
      <p>Date: {{ data.metadata.date }}</p>
    </div>
  </div>
  <div v-else>Data not found</div>
</template>
