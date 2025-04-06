<template>
 <div :class="$style.pageContainer">
  <nav :class="$style.breadcrumbs">
      <router-link to="/">Главная страница</router-link>
      <span> > </span>
      <router-link to="/diplomas">Дипломы</router-link>
      <span> > </span>
    </nav>
    <h1>Список готовых работ</h1>
    <!-- TODO: Реализовать после настройки API -->
  </div>
  <!-- Футер -->
  <AppFooter />
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
// Логика страницы будет добавлена позже
</script>

<style module lang="scss">
.pageContainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
