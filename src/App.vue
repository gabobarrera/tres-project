<template>
  <div class="app">
    <ThreeScene
      :status="status"
      :boxGeometry="boxGeometry"
      :excursion="excursion"
    />
  </div>
</template>

<script setup lang="ts">
import ThreeScene from "./components/ThreeScene.vue";

const status = "OK";

const boxGeometry = {
  external: {
    width: 500,
    height: 350,
    depth: 400,
  },
  type: "bassreflex",
  driver: {
    Sd: 530, // cm²
  },
  port: {
    diameter: 100,
    length: 200,
    offsetX: 50,
    offsetY: 50,
  },
};

const excursion = {
  maxExcursion: 12, // mm
  freqAtMax: 40,
};
</script>

<style>
.app {
  width: 100%;
  height: 100vh;
  background: #101113;
  padding: 20px;
  box-sizing: border-box;
}
</style>