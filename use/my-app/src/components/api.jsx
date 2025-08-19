import React,{useState,useEffect} from 'react';
export default function DataFetcher(){
const [data,setData] = useState([]);
const [loading, setLoading ] = useState(true)

useEffect(()=>{

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res =>res.json())
    .then(json =>{
        setData(json);
        setLoading(false);
    });
},[])
if (loading) return <p>loading..</p>
return  <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
}