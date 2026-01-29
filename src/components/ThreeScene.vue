<template>
  <div ref="container" class="three-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import type { Ref } from "vue";

import { initScene, updateScene } from "./3d/Scene3D";

interface BoxGeometry {
  external: {
    width: number;
    height: number;
    depth: number;
  };
  type: string;
  driver: any;
  port?: any;
}

interface ExcursionData {
  maxExcursion: number;
  freqAtMax: number;
}

const props = defineProps<{
  status: string;
  boxGeometry: BoxGeometry;
  excursion: ExcursionData;
}>();

const container: Ref<HTMLDivElement | null> = ref(null);
let sceneContext: ReturnType<typeof initScene> | null = null;

onMounted(() => {
  if (container.value) {
    sceneContext = initScene(container.value, {
      status: props.status,
      boxGeometry: props.boxGeometry,
      excursion: props.excursion,
    });
  }
});

watch(
  () => ({ ...props }),
  (newProps) => {
    if (sceneContext) updateScene(sceneContext, newProps);
  },
  { deep: true }
);

onBeforeUnmount(() => {
  sceneContext?.dispose?.();
});
</script>

<style>
.three-container {
  width: 100%;
  height: 380px;
  border-radius: 4px;
  background: #18191b;
  border: 1px solid #2a2b2e;
}
</style>