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
  display: block;
  width: 90vw;
  overflow-x: hidden;
 // flex-direction: column;
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #edf1ed;

}
/*
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}*/
body, html, #app {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;

}
</style>
