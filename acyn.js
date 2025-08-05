// Menggunakan Promises
const getData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data berhasil diambil");
        }, 2000);
    });
};

getData().then(response => console.log(response)); // Output: Data berhasil diambil




const fetchData = async ()=>{
    try{
        const response=await getData();
    console.log(response);
    }catch(error){
        console.log(error)
    }
}

fetchData