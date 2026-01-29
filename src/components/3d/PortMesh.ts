// PortMesh.ts
import * as THREE from "three";
import { mmToM } from "./utils";
import type { BoxGeometry } from "./Scene3D";

interface PortUserData {
  tube: THREE.Mesh;
  flare: THREE.Mesh;
}

export function createPortMesh(boxGeometry: BoxGeometry): THREE.Group {
  const port = boxGeometry.port as {
    diameter: number;
    length: number;
    offsetX: number;
    offsetY: number;
  };

  const group = new THREE.Group();

  const radius = mmToM(port.diameter / 2);
  const length = mmToM(port.length);

  const tubeGeo = new THREE.CylinderGeometry(
    radius,
    radius,
    length,
    48,
    1,
    true
  );

  const tubeMat = new THREE.MeshStandardMaterial({
    color: "#2a2b2e",
    metalness: 0.2,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  const tube = new THREE.Mesh(tubeGeo, tubeMat);
  tube.rotation.x = Math.PI / 2;
  tube.position.z = -length / 2;
  group.add(tube);

  const flareGeo = new THREE.ConeGeometry(radius * 1.6, radius * 1.2, 48, 1, true);
  flareGeo.rotateX(Math.PI / 2);

  const flareMat = new THREE.MeshStandardMaterial({
    color: "#3a3b3d",
    metalness: 0.3,
    roughness: 0.5,
    transparent: true,
    opacity: 0.85,
  });

  const flare = new THREE.Mesh(flareGeo, flareMat);
  flare.position.z = 0;
  group.add(flare);

  const x = mmToM(boxGeometry.external.width / 2 - port.offsetX);
  const y = mmToM(-boxGeometry.external.height / 2 + port.offsetY);
  const z = mmToM(boxGeometry.external.depth / 2);

  group.position.set(x, y, z);

  (group.userData as PortUserData) = {
    tube,
    flare,
  };

  return group;
}

export function updatePortStatus(
  portGroup: THREE.Group,
  status: string
): void {
  const { tube, flare } = portGroup.userData as PortUserData;

  if (status === "OK") {
    tube.material.emissive?.set?.("#000000");
    flare.material.emissive?.set?.("#000000");
  } else if (status === "WARNING") {
    tube.material.emissive?.set?.("#ffaa00");
    flare.material.emissive?.set?.("#ffaa00");
  } else if (status === "DANGER") {
    tube.material.emissive?.set?.("#ff0000");
    flare.material.emissive?.set?.("#ff0000");
  }
}