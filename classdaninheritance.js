// Membuat Class
class Person {
    constructor(nama, umur) {
        this.nama = nama;
        this.umur = umur;
    }

    perkenalan() {
        return `Halo, nama saya ${this.nama} dan saya berumur ${this.umur} tahun.`;
    }
}

const mirza = new Person("Mirza", 30);
console.log(mirza.perkenalan()); // Output: Halo, nama saya Mirza dan saya berumur 30 tahun.

// Inheritance
class Guru extends Person {
    constructor(nama, umur, mataPelajaran) {
        super(nama, umur);
        this.mataPelajaran = mataPelajaran;
    }

    mengajar() {
        return `Saya mengajar ${this.mataPelajaran}.`;
    }
}

const bapakMirza = new Guru("Mirza", 30, "React JS");
console.log(bapakMirza.perkenalan()); // Output: Halo, nama saya Mirza dan saya berumur 30 tahun.
console.log(bapakMirza.mengajar());   // Output: Saya mengajar React JS.