// BoxMesh.js
import * as THREE from "three";
import { mmToM } from "./utils.js";

export function createBoxMesh(boxGeometry) {
  const { width, height, depth } = boxGeometry.external;

  const group = new THREE.Group();

  const w = mmToM(width);
  const h = mmToM(height);
  const d = mmToM(depth);

  const boxMaterial = new THREE.MeshStandardMaterial({
    color: "#2a2b2e",
    metalness: 0.2,
    roughness: 0.6,
  });

  const box = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    boxMaterial
  );
  group.add(box);

  const wireMaterial = new THREE.MeshBasicMaterial({
    color: "#4f8cff",
    wireframe: true,
    transparent: true,
    opacity: 0.25,
  });

  const wireframe = new THREE.Mesh(
    new THREE.BoxGeometry(w * 1.01, h * 1.01, d * 1.01),
    wireMaterial
  );
  group.add(wireframe);

  return group;
}