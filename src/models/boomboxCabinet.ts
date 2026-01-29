import * as THREE from 'three'
import { woodMaterial } from '../materials/wood'

export function createBoomboxCabinet() {

  // MEDIDAS REALES (mm)
  const width = 750
  const height = 390
  const depth = 350
  const thickness = 18

  const group = new THREE.Group()

  // CAJA EXTERIOR
  const outer = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    woodMaterial
  )
  outer.position.y = height / 2
  group.add(outer)

  // HUECO INTERIOR (visual)
  const inner = new THREE.Mesh(
    new THREE.BoxGeometry(
      width - thickness * 2,
      height - thickness * 2,
      depth - thickness * 2
    ),
    woodMaterial
  )
  inner.position.y = height / 2
  inner.material.side = THREE.BackSide
  group.add(inner)

  return group
}
