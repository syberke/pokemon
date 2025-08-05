export function tambah(a, b) {
    return a + b;
}
export const PI = 3.14;

// File main.js
import { tambah, PI } from './utils.js';
console.log(tambah(2, 3)); // Output: 5
console.log(PI); // Output: 3.14