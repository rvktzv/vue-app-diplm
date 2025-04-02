<template>
  <footer :class="$style.appFooter">
    <div :class="$style.container">
      <div :class="$style.footerContent">
        <nav :class="$style.footerNav">
          <router-link to="/privacy" :class="$style.footerLink">
            Политика конфиденциальности
          </router-link>
          <router-link to="/requisites" :class="$style.footerLink">
            Реквизиты
          </router-link>
          <router-link to="/about" :class="$style.footerLink">
            О компании
          </router-link>
        </nav>
        <p :class="$style.copyright">
          &copy; 2023 ДипломНаЗаказ. Все права защищены.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style module lang="scss">
.appFooter {
  background: #2c3e50;
  color: white;
  padding: 40px 0;
  margin-top: auto;
}

.footerNav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

.footerLink {
  color: #ecf0f1;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
