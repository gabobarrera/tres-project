import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function setupControls(camera: any, renderer: any) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enablePan = false
  controls.minPolarAngle = Math.PI / 4
  controls.maxPolarAngle = Math.PI / 2.05
  controls.minDistance = 400
  controls.maxDistance = 1800
}
