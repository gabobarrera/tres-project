// materials.ts
import * as THREE from "three";
export function createTechnicalMaterial() {
    return new THREE.MeshStandardMaterial({
        color: "#2a2b2e",
        metalness: 0.25,
        roughness: 0.65,
    });
}
export function createDriverConeMaterial() {
    return new THREE.MeshStandardMaterial({
        color: "#1c1d1f",
        metalness: 0.2,
        roughness: 0.55,
        side: THREE.DoubleSide,
    });
}
export function createSurroundMaterial() {
    return new THREE.MeshStandardMaterial({
        color: "#2a2b2e",
        metalness: 0.1,
        roughness: 0.8,
    });
}
export function createDustcapMaterial() {
    return new THREE.MeshStandardMaterial({
        color: "#0f0f10",
        metalness: 0.3,
        roughness: 0.5,
    });
}
export function createBasketMaterial() {
    return new THREE.MeshStandardMaterial({
        color: "#3a3b3d",
        metalness: 0.4,
        roughness: 0.6,
        transparent: true,
        opacity: 0.4,
    });
}
export function createPortMaterial() {
    return new THREE.MeshStandardMaterial({
        color: "#2a2b2e",
        metalness: 0.2,
        roughness: 0.6,
        side: THREE.DoubleSide,
    });
}
export function createPortFlareMaterial() {
    return new THREE.MeshStandardMaterial({
        color: "#3a3b3d",
        metalness: 0.3,
        roughness: 0.5,
        transparent: true,
        opacity: 0.85,
    });
}
export function createWireframeMaterial() {
    return new THREE.MeshBasicMaterial({
        color: "#4f8cff",
        wireframe: true,
        transparent: true,
        opacity: 0.25,
    });
}
