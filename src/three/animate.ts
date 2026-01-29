import { scene } from './scene'
import { camera } from './camera'

export function animate(renderer: any) {
  function loop() {
    requestAnimationFrame(loop)
    renderer.render(scene, camera)
  }
  loop()
}
