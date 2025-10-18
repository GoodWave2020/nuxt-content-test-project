<script setup lang="ts">
defineProps<{
  type?: 'info' | 'warning' | 'error' | 'success'
  dismissible?: boolean
}>()

const show = ref(true)

const close = () => {
  show.value = false
}
</script>

<template>
  <div v-if="show" :class="['alert', `alert-${type || 'info'}`]">
    <div class="alert-content">
      <slot />
    </div>
    <button v-if="dismissible" class="alert-close" @click="close">×</button>
  </div>
</template>

<style scoped>
.alert {
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.alert-content {
  flex: 1;
}

.alert-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0;
  line-height: 1;
}

.alert-close:hover {
  opacity: 1;
}

.alert-info {
  background: #e3f2fd;
  color: #1976d2;
  border-left: 4px solid #1976d2;
}

.alert-warning {
  background: #fff3e0;
  color: #f57c00;
  border-left: 4px solid #f57c00;
}

.alert-error {
  background: #ffebee;
  color: #c62828;
  border-left: 4px solid #c62828;
}

.alert-success {
  background: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
}
</style>
