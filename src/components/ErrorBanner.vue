<template>
  <div :class="$style.errorBanner">
    <img
      src="@/assets/images/error-icon.svg"
      alt="Ошибка"
      :class="$style.errorImage"
    >
    <h3 :class="$style.errorTitle">Упс, что-то пошло не так</h3>
    <p :class="$style.errorText">Попробуйте обновить страницу или повторить запрос позже</p>
    <button :class="$style.retryButton" @click="$emit('retry')">
      Попробовать снова
    </button>
  </div>
</template>

<style module lang="scss">
.errorBanner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  background-color: #fff9f9;
  border: 1px solid #ffebeb;
  border-radius: 8px;
  margin-bottom: 20px;
  height: 400px; // Высота как 3 карточки
}

.errorImage {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.errorTitle {
  color: #e74c3c;
  margin: 0 0 10px 0;
  font-size: 20px;
}

.errorText {
  color: #666;
  margin: 0 0 20px 0;
  max-width: 400px;
}

.retryButton {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
}
</style>
