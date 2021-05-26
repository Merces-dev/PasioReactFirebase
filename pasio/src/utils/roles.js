import React, { useState } from 'react';
import { db, storage } from './firebaseConfig';
const getRole = () => {

    const token = localStorage.getItem('uid')
    try {
        var docRef = db.collection("usuarios").doc(token);

        docRef.get().then((doc) => {
            const cargo = doc.data().role
            console.log(cargo)
            return (
                cargo
            )
        })
    }
    catch (error) {
        console.error(error)
    }
}




export default getRole;