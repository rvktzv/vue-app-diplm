<template>
  <div :class="$style.diplomaDetail">
    <h1>Дипломная работа #{{ $route.params.id }}</h1>
    <!-- TODO: Реализовать после согласования дизайна и API -->
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style module lang="scss">
.diplomaDetail {
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
