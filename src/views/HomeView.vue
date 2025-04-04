<template>
  <div :class="$style.homePage">
    <!-- 1. Полноширинный баннер -->
    <section :class="$style.heroBanner">
      <div :class="$style.heroContent">
        <div :class="$style.textContent">
          <h1>Профессиональное написание дипломных работ на заказ</h1>
          <p>Качественные работы от экспертов с многолетним опытом. Гарантия уникальности и сроков.</p>
        </div>
        <div :class="$style.imagePlaceholder"></div>
      </div>
    </section>

     <!-- 2. Блок текста -->
     <section :class="$style.textBlock">
      <div :class="$style.container">
        <p>Наша компания специализируется на написании дипломных работ для студентов различных вузов.
           Мы работаем с 2010 года и за это время помогли более чем 5000 студентов защитить свои дипломы
            на отлично. Наши авторы - это преподаватели вузов, кандидаты и доктора наук, которые
             знают все требования к оформлению и содержанию дипломных работ.
            Наша компания специализируется на написании дипломных работ для студентов различных вузов.
           Мы работаем с 2010 года и за это время помогли более чем 5000 студентов защитить свои дипломы
            на отлично. Наши авторы - это преподаватели вузов, кандидаты и доктора наук, которые
             знают все требования к оформлению и содержанию дипломных работ.</p>
      </div>
    </section>

    <!-- 3. Блок с кнопкой, списком и лого
    <section :class="$style.actionBlock">
      <div :class="$style.container">
        <div :class="$style.actionContent">
          <button :class="$style.modalButton" @click="openModal">
            Заказать диплом
          </button>

          <ol :class="$style.numberedList">
            <li>Вы оставляете заявку с требованиями к работе</li>
            <li>Мы подбираем подходящего автора-эксперта</li>
            <li>Вы вносите предоплату 30% от суммы</li>
            <li>Автор выполняет работу в указанный срок</li>
            <li>Вы проверяете и оплачиваете оставшуюся сумму</li>
          </ol>

          <div :class="$style.logoContainer">
            <img src="@/assets/images/logo.png" alt="Логотип компании" :class="$style.logo">
          </div>
        </div>
      </div>
    </section>
-->
<section :class="$style.actionBlock">
    <div :class="$style.actionContainer">
      <!-- 1. Кнопка -->
      <button :class="$style.actionButton" @click="openModal">
        Заказать диплом
      </button>

      <!-- 2. Нумерованный список -->
      <div :class="$style.listContainer">
        <ol :class="$style.numberedList">
          <li>Вы оставляете заявку с требованиями к работе</li>
          <li>Мы подбираем подходящего автора-эксперта</li>
          <li>Вы вносите предоплату 30% от суммы</li>
          <li>Автор выполняет работу в указанный срок</li>
          <li>Вы проверяете и оплачиваете оставшуюся сумму</li>
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
<h2 :class="$style.sectionTitle">Примеры наших работ</h2>

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
  width: 100%;

  .heroContent {
    display: flex;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .textContent {
    width: 80%;
    padding-right: 40px;

    h1 {
      font-size: 3rem;
      margin-bottom: 30px;
    }
    p {
      font-size: 1.4rem;
    }
  }

  .imagePlaceholder {
    width: 40%;
    background: rgba(white, 0.3);
  }
}

/* 2. Текст на всю ширину */
.textBlock {
  width: 100%;
  padding: 80px 0;
  background: white;

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
  flex: 1 1 auto;
  padding: 0 20px;
}

.numberedList {
  list-style-type: none;
  counter-reset: step-counter;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;

  li {
    position: relative;
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
      font-size: 1.1em;
    }
  }
}

.logoWrapper {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logoImage {
  max-height: 120px;
  width: auto;
  object-fit: contain;
}
/* 4. Адаптивность */
@media (max-width: 1600px) {
  .heroContent,
  .textContentFullWidth {
    padding: 0 40px;
  }
}

@media (max-width: 1600px) {
  .heroBanner {
    padding: 80px 0;

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
