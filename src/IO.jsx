import React,{useEffect} from 'react'
import axios from "axios";

function IO() {

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api_data/todo/")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => console.log(error.message));
    },[])

    return (
        <div>
            <h1>hi</h1>
        </div>
    )
}

export default IO
