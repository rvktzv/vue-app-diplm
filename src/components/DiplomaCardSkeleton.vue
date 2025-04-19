<template>
  <div :class="$style.skeletonCard">
    <div :class="$style.skeletonTitle"></div>
    <div :class="$style.skeletonText"></div>
    <div :class="$style.skeletonText"></div>
    <div :class="$style.skeletonBadge"></div>
    <div :class="$style.skeletonButton"></div>
  </div>
</template>

<style module lang="scss">
.skeletonCard {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.skeletonTitle {
  height: 24px;
  width: 70%;
  background-color: #eee;
  border-radius: 4px;
  margin-bottom: 15px;
  animation: pulse 1.5s infinite;
}

.skeletonText {
  height: 16px;
  width: 90%;
  background-color: #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite;

  &:last-of-type {
    width: 80%;
  }
}

.skeletonBadge {
  height: 24px;
  width: 120px;
  background-color: #eee;
  border-radius: 12px;
  margin-bottom: 20px;
  animation: pulse 1.5s infinite;
}

.skeletonButton {
  height: 36px;
  width: 100px;
  background-color: #eee;
  border-radius: 6px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
