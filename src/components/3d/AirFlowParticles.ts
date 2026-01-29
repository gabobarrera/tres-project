// AirFlowParticles.js
import * as THREE from "three";
import { mmToM } from "./utils.js";

export function createAirFlowParticles(boxGeometry) {
  const port = boxGeometry.port;

  const group = new THREE.Group();

  const radius = mmToM(port.diameter / 2);
  const length = mmToM(port.length);

  const particleCount = 180;
  const positions = new Float32Array(particleCount * 3);
  const speeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * radius * 0.8;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = Math.sin(angle) * r;
    positions[i * 3 + 2] = Math.random() * -length;

    speeds[i] = 0.5 + Math.random() * 1.2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: radius * 0.15,
    color: "#4f8cff",
    transparent: true,
    opacity: 0.9,
  });

  const particles = new THREE.Points(geometry, material);
  group.add(particles);

  const x = mmToM(boxGeometry.external.width / 2 - port.offsetX);
  const y = mmToM(-boxGeometry.external.height / 2 + port.offsetY);
  const z = mmToM(boxGeometry.external.depth / 2);

  group.position.set(x, y, z);

  group.userData = {
    particles,
    speeds,
    radius,
    length,
  };

  return group;
}

export function updateAirFlow(group, excursionData) {
  if (!group) return;

  const { particles, speeds, length } = group.userData;

  const positions = particles.geometry.attributes.position.array;

  const xmax = excursionData.maxExcursion || 0;
  const freq = excursionData.freqAtMax || 40;

  const t = performance.now() / 1000;
  const velocity = Math.abs(Math.sin(t * freq * 2 * Math.PI)) * (xmax / 10);

  for (let i = 0; i < speeds.length; i++) {
    positions[i * 3 + 2] += speeds[i] * velocity * 0.02;

    if (positions[i * 3 + 2] > 0) {
      positions[i * 3 + 2] = -length;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;

  const color = velocity > 0.7 ? "#ff0000" : velocity > 0.4 ? "#ffaa00" : "#4f8cff";
  particles.material.color.set(color);
}