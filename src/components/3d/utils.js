// utils.js
// Conversión milímetros → metros
export function mmToM(mm) {
    return mm / 1000;
}
// Clamp genérico
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
// Normalización de un valor dentro de un rango
export function normalize(value, min, max) {
    if (max - min === 0)
        return 0;
    return (value - min) / (max - min);
}
// Oscilador senoidal (útil para animaciones)
export function sineOscillator(time, frequency, amplitude = 1) {
    return Math.sin(time * frequency * 2 * Math.PI) * amplitude;
}
// Genera un número aleatorio entre min y max
export function rand(min, max) {
    return Math.random() * (max - min) + min;
}
// Convierte Sd (cm²) a radio en metros
export function sdToRadius(sd) {
    return Math.sqrt(sd / Math.PI) / ;
}
