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
             знают все требования к оформлению и содержанию дипломных работ.</p>
      </div>
    </section>

    <!-- 3. Блок с кнопкой, списком и лого -->
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

/* 3. Адаптивность */
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
