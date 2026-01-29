import * as THREE from 'three'

export function setupLights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.35))

  const key = new THREE.DirectionalLight(0xffffff, 0.9)
  key.position.set(600, 900, 600)
  scene.add(key)
}
