import React, {useState,useEffect} from 'react';
import {db} from './firebaseConfig';


const GetRole = () => {
    const [cargo,  setCargo] = useState('')

    const token = localStorage.getItem('uid')
    if (token !== null) {
        var docRef = db.collection("usuarios").doc(token);
        docRef.get().then((doc) => {
            setCargo(doc.data().role)
            console.log(cargo)

        })
        return {
            cargo
    
        }
    } else {
        setCargo('unlogged')
        return {
            cargo
    
        }
    }
}




export default GetRole;