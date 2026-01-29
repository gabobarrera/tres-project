import * as THREE from 'three'

export const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  5000
)

camera.position.set(900, 500, 900)
camera.lookAt(0, 200, 0)
