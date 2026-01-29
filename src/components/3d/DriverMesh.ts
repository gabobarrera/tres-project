// DriverMesh.ts
import * as THREE from "three";
import { mmToM, sdToRadius, sineOscillator } from "./utils";
import type { BoxGeometry, ExcursionData } from "./Scene3D";

interface DriverUserData {
  cone: THREE.Mesh;
  dustcap: THREE.Mesh;
}

export function createDriverMesh(
  boxGeometry: BoxGeometry,
  excursionData: ExcursionData
): THREE.Group {
  const group = new THREE.Group();

  const driver = boxGeometry.driver as {
    Sd: number; // cm²
  };

  const radius = sdToRadius(driver.Sd); // m
  const coneDepth = radius * 0.35;
  const surroundWidth = radius * 0.15;

  const coneGeo = new THREE.ConeGeometry(radius, coneDepth, 64, 1, true);
  coneGeo.rotateX(Math.PI / 2);

  const coneMat = new THREE.MeshStandardMaterial({
    color: "#1c1d1f",
    metalness: 0.2,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  const cone = new THREE.Mesh(coneGeo, coneMat);
  cone.position.z = -coneDepth / 2;
  group.add(cone);

  const surroundGeo = new THREE.TorusGeometry(
    radius * 0.95,
    surroundWidth * 0.5,
    16,
    100
  );

  const surroundMat = new THREE.MeshStandardMaterial({
    color: "#2a2b2e",
    metalness: 0.1,
    roughness: 0.8,
  });

  const surround = new THREE.Mesh(surroundGeo, surroundMat);
  surround.rotation.x = Math.PI / 2;
  group.add(surround);

  const dustcapGeo = new THREE.SphereGeometry(radius * 0.35, 32, 32);
  const dustcapMat = new THREE.MeshStandardMaterial({
    color: "#0f0f10",
    metalness: 0.3,
    roughness: 0.5,
  });

  const dustcap = new THREE.Mesh(dustcapGeo, dustcapMat);
  dustcap.position.z = -coneDepth * 0.7;
  group.add(dustcap);

  const basketGeo = new THREE.CylinderGeometry(
    radius * 1.05,
    radius * 1.05,
    mmToM(80),
    32,
    1,
    true
  );
  const basketMat = new THREE.MeshStandardMaterial({
    color: "#3a3b3d",
    metalness: 0.4,
    roughness: 0.6,
    transparent: true,
    opacity: 0.4,
  });

  const basket = new THREE.Mesh(basketGeo, basketMat);
  basket.position.z = mmToM(-40);
  group.add(basket);

  group.position.set(0, 0, mmToM(boxGeometry.external.depth / 2));

  (group.userData as DriverUserData) = {
    cone,
    dustcap,
  };

  return group;
}

export function updateDriverExcursion(
  driverGroup: THREE.Group,
  excursionData: ExcursionData
): void {
  const userData = driverGroup.userData as DriverUserData;
  const { cone, dustcap } = userData;

  const xmax = excursionData.maxExcursion || 0;
  const freq = excursionData.freqAtMax || 40;

  const t = performance.now() / 1000;
  const excursion = sineOscillator(t, freq, xmax / 1000);

  cone.position.z = excursion;
  dustcap.position.z = excursion - Math.abs(excursion) * 0.3;
}