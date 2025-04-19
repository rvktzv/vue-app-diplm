<template>
 <!-- <div :class="$style.homePage">-->
    <div :class="$style.pageContainer">

    <!-- 1. Полноширинный баннер -->
    <section :class="$style.heroBanner">
      <div :class="$style.heroContent">
        <div :class="$style.textContent">
          <h1>Zau4ka</h1>
          <p>Твой надежный помощник в учебе!</p>
        </div>
        <div :class="$style.imagePlaceholder">
          <img
          src="@/assets/images/placeholder-banner.png"
          :class="$style.imagePlaceholder"
        >
        </div>
      </div>
    </section>

     <!-- 2. Блок текста -->
     <SEOHomeView />


    <!-- 3. Блок с кнопкой, списком и лого-->
<section :class="$style.actionBlock">
    <div :class="$style.actionContainer">
      <!-- 1. Кнопка -->
      <button :class="$style.actionButton" @click="openModal">
        Сгенерировать работу
      </button>

      <!-- 2. Нумерованный список -->
      <div :class="$style.listContainer">
        <ol :class="$style.numberedList">
          <li>Вы указываете тему и вашу специальность</li>
          <li>Генерируете оглавление</li>
          <li>Подтверждаете оглавление или добавляете свое</li>
          <li>Генерируете полную работу</li>

        </ol>
      </div>

      <!-- 3. Логотип -->
      <div :class="$style.logoWrapper">
        <img
          src="@/assets/images/logo.png"
          alt="Логотип компании"
          :class="$style.logoImage"
        >
      </div>
    </div>
  </section>
<!-- 4. Заголовок -->
<!--<h2 :class="$style.sectionTitle">Примеры наших работ</h2>-->

<!-- 5. Карусель -->
<CarouselComponent :items="diplomas" />

<!-- 6. Футер -->
<AppFooter />

<!-- Модальное окно -->
<ModalForm v-if="showModal" @close="closeModal" />
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDiplomaStore } from '@/stores/diploma'
import CarouselComponent from '@/components/CarouselComponent.vue'
import ModalForm from '@/components/ModalForm.vue'
import AppFooter from '@/components/AppFooter.vue'
import SEOHomeView from '@/components/SEOHomeView.vue'

const diplomaStore = useDiplomaStore()
const diplomas = diplomaStore.featuredDiplomas

const showModal = ref(false)

const openModal = () => {
showModal.value = true
}

const closeModal = () => {
showModal.value = false
}
</script>




<style module lang="scss">
.homePage {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

/* 1. Баннер на всю ширину */
.heroBanner {
  background-color: #b1e2d3;
  padding: 100px 0;
  border-radius: 10px;
  width: 100%;

  .heroContent {
    display: flex;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
  //  padding: 0 20px;
  }

  .textContent {
    width: 100%;
    padding-right: 50px;


    h1 {

      font-size: 4rem;
      margin-bottom: 70px;
    }
    p {
      font-size: 1.6rem;
    }
  }

  .imagePlaceholder {
    width: 100%;
 //   background: rgba(white, 0.3);
  }
}

/* 2. Текст на всю ширину */
.textBlock {
  width: 90%;
  padding: 80px 0;
 // background: white;

  .textContentFullWidth {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 20px;
    column-count: 2;
    column-gap: 40px;
    text-align: justify;

    p {
      margin-bottom: 20px;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }
}

/* 3. Блок с кнопкой */
/* 3. Блок с кнопкой - обновленная версия */
.actionBlock {
  width: 100%;
  padding: 40px 0;
  /* Убрали background-color */
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.actionContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  gap: 40px;
}

.actionButton {
  flex: 0 0 auto;
  padding: 20px 35px;
  background-color: #6fd6be;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 220px;

  &:hover {
    background-color: #37ebc1;
  }
}

.listContainer {
  flex: 3 1 auto;
  padding: 0 20px;
}

.numberedList {
  list-style-type: none;
  counter-reset: step-counter;
  /* Убрали flex-стили для вертикального списка */

  li {
    position: relative;
    padding-left: 45px;
    line-height: 1.5;
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    &::before {
      counter-increment: step-counter;
      content: counter(step-counter);
      position: absolute;
      left: 0;
      top: 0;
      color: #6fd6be;
      font-weight: bold;
      font-size: 1.4em;
    }

    /* Добавляем иконки перед пунктами */
    &::after {
      content: "";
      display: inline-block;
      width: 24px;
      height: 24px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236fd6be"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>');
      background-repeat: no-repeat;
      margin-left: 10px;
    }
  }
}

.logoWrapper {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  /* Убрали background-color и box-shadow */
}

.logoImage {
  max-height: 140px; /* Немного уменьшили размер */
  width: auto;
  object-fit: contain;
}

/* Адаптация для мобильных */
@media (max-width: 768px) {
  .actionContainer {
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
  }

  .actionButton {
    width: 100%;
    order: 1;
  }

  .listContainer {
    order: 2;
    width: 100%;
  }

  .logoWrapper {
    order: 3;
    margin-top: 20px;
  }
}
/*
.actionBlock {
  width: 100%;
  padding: 60px 0;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.actionContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 40px;
  gap: 40px;
}
.actionButton {
  flex: 0 0 auto;
  padding: 27px 40px;
  background-color: #6fd6be;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 220px;

  &:hover {
    background-color: #37ebc1;
  }
}

.listContainer {
  flex: 3 1 auto;
  padding: 0 20px;
}

.numberedList {
  list-style-type: none;
//  counter-reset: step-counter;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;

  li {
    position: center;
    padding-left: 35px;
    line-height: 1.5;
    flex: 1 1 200px;
    max-width: 300px;
    margin-bottom: 15px;

    &::before {
      counter-increment: step-counter;
      content: counter(step-counter) ".";
      position: absolute;
      left: 0;
      top: 0;
      color: #8fd3c6;
      font-weight: bold;
      font-size: 1.6em;
    }
  }
}

.logoWrapper {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
 // background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logoImage {
  max-height: 120px;
  width: auto;
  object-fit: contain;
}
  */
/* 4. Адаптивность */
@media (max-width: 1600px) {
  .heroContent,
  .textContentFullWidth {
    padding: 0 40px;
  }
}

@media (max-width: 1600px) {
  .heroBanner {
    padding: 0px 0;

    .textContent {
      h1 { font-size: 2.5rem; }
      p { font-size: 1.2rem; }
    }
  }
}

@media (max-width: 768px) {
  .heroBanner .heroContent,
  .textBlock .textContentFullWidth {
    flex-direction: column;
    padding: 0 20px;
  }

  .textContentFullWidth {
    column-count: 1;
  }
}
</style>
