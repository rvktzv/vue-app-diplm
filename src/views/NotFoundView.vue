<template>
  <div :class="$style.container">
    <h1 :class="$style.title">404</h1>
    <p :class="$style.text">Организация не найдена</p>
    <router-link to="/" :class="$style.link">Вернуться на главную</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style module lang="scss">
.container {
  text-align: center;
  padding: 100px 20px;
  flex: 1;
}

.title {
  font-size: 3rem;
  color: #8fd3c6;
  margin-bottom: 20px;
}

.text {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 30px;
}

.link {
  color: #8fd3c6;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
