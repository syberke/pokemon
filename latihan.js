//1
let nama = 'berke';
console.log(nama);
nama = 'jaisy';
console.log(nama);

const nama1 = 'berke';
console.log(nama1)

//2
const tambahDua = (angka) => {
    return angka + 2;
};  
console.log(tambahDua(5)); // Output: 7
//3 
const nama2 = "berke";
const pesan = `Halo, ${nama2}! Selamat datang.`;
console.log(pesan); 
//4

const ang = [1,2,3]
const [satu,dua,tiga]=ang
console.log(satu,dua,tiga)


const p = {nam:'berke', um:19}
const {nam,um}=p
console.log(nam,um)

//5 
const angg = [1,2]
const angg1 = [...angg,3,4]
console.log(angg1)

const namm = {namm:'berke',umm:16}
const namm1 = {...namm,pekk:'developer'}
console.log(namm1)

//6
const { add, multiply } = require('./main.js');
console.log(add(3, 4)); // Output: 7

//7
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Data berhasil diambil"), 1000);
    });
};

async function getData() {
    const data = await fetchData();
    console.log(data);
}

getData();
//8
class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

class UrgentTask extends Task {
    constructor(title, deadline) {
        super(title);
        this.deadline = deadline;
    }
}

