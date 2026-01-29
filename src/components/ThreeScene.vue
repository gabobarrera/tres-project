<template>
  <div ref="container" class="scene"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { scene } from '../three/scene'
import { camera } from '../three/camera'
import { createRenderer } from '../three/renderer'
import { setupLights } from '../three/lights'
import { setupControls } from '../three/controls'
import { animate } from '../three/animate'
import { createBoomboxCabinet } from '../models/boomboxCabinet'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!container.value) return

  const renderer = createRenderer(container.value)
  setupLights(scene)
  setupControls(camera, renderer)

  const cabinet = createBoomboxCabinet()
  scene.add(cabinet)

  animate(renderer)
})
</script>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
}
</style>
