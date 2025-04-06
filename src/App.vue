<template>
  <!-- Основной контейнер приложения -->
  <div :class="$style.app">
    <!-- Сюда будут подставляться компоненты страниц из router -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// Импорты не требуются, если нет дополнительной логики
</script>

<style module lang="scss">
.app {
  // Основные стили приложения
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}
</style>
