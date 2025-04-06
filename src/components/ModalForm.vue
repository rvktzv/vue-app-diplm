<template>
  <div :class="$style.modalOverlay" @click.self="emit('close')">
    <div :class="$style.modalContent">
      <button :class="$style.closeButton" @click="emit('close')">&times;</button>
      <h2>Оформить заказ</h2>
      <form :class="$style.orderForm">
        <!-- TODO: Реализовать форму после согласования с бэкендом -->
        <button type="submit" :class="$style.submitButton">Отправить заявку</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<style module lang="scss">
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modalContent {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  position: relative;
}

.closeButton {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
