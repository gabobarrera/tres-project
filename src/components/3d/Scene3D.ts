// Scene3D.ts
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { createBoxMesh } from "./BoxMesh";
import { createDriverMesh, updateDriverExcursion } from "./DriverMesh";
import { createPortMesh, updatePortStatus } from "./PortMesh";
import { createAirFlowParticles, updateAirFlow } from "./AirFlowParticles";

export interface BoxGeometry {
  external: {
    width: number;
    height: number;
    depth: number;
  };
  type: string;
  driver: any;
  port?: any;
}

export interface ExcursionData {
  maxExcursion: number;
  freqAtMax: number;
}

export interface SceneProps {
  status: string;
  boxGeometry: BoxGeometry;
  excursion: ExcursionData;
}

export interface SceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  meshes: {
    box: THREE.Group;
    driver: THREE.Group;
    port?: THREE.Group;
    air?: THREE.Group;
  };
  dispose: () => void;
}

export function initScene(
  container: HTMLDivElement,
  initialProps: SceneProps
): SceneContext {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#18191b");

  const width = container.clientWidth;
  const height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 100);
  camera.position.set(1.8, 1.8, 2.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;

  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(3, 3, 3);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const meshes: SceneContext["meshes"] = {
    box: createBoxMesh(initialProps.boxGeometry),
    driver: createDriverMesh(initialProps.boxGeometry, initialProps.excursion),
  };

  scene.add(meshes.box);
  scene.add(meshes.driver);

  if (initialProps.boxGeometry.type === "bassreflex") {
    meshes.port = createPortMesh(initialProps.boxGeometry);
    meshes.air = createAirFlowParticles(initialProps.boxGeometry);

    scene.add(meshes.port);
    scene.add(meshes.air);
  }

  function animate() {
    requestAnimationFrame(animate);

    updateDriverExcursion(meshes.driver, initialProps.excursion);

    if (meshes.air) updateAirFlow(meshes.air, initialProps.excursion);

    renderer.render(scene, camera);
  }

  animate();

  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  window.addEventListener("resize", onResize);

  return {
    scene,
    camera,
    renderer,
    controls,
    meshes,
    dispose() {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    },
  };
}

export function updateScene(ctx: SceneContext, props: SceneProps): void {
  updateDriverExcursion(ctx.meshes.driver, props.excursion);

  if (ctx.meshes.port) updatePortStatus(ctx.meshes.port, props.status);

  if (ctx.meshes.air) updateAirFlow(ctx.meshes.air, props.excursion);
}