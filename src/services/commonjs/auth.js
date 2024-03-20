import { useEffect, useState } from "react";
import { auth, dbFirestore } from "../firebase";
import { signInWithEmailAndPassword, signOut , createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { getAll, getOneById } from "./db";
import { doc, getDoc } from "firebase/firestore";



/****************************************************
 * Fonction connexion par mail  
 * Avec en paramètres email et password de type string
 * 
 * 
 ***********************************************/
export const loginByEmail = async(email , password) =>{

    try {

        return await signInWithEmailAndPassword(auth, email , password) ;

    } catch (error) { //exception echappement des erreurs
       
        return error.code ;
    }


}

/****************************************************
 * Fonction inscristion par mail que j'ai créé pour que l'email et du password
    de l'utilisateur qui veut s'inscrire soit enregister pour qu'il puisse par la suite s'inscrire
 * Avec en paramètres email et password de type string
 * 
 * 
 ***********************************************/

export const signup = async(email , password) =>{

    try {

        return await createUserWithEmailAndPassword(auth, email , password) ;

    } catch (error) {

        return error.code ;
    }


}


export const logout = async () =>{
    signOut(auth) ;
    
    
}

export const getUserData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) return null; // Aucun utilisateur connecté
  
    const userRef = doc(dbFirestore, "users", user.uid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data(); // Retourne les données de l'utilisateur
      } else {
        console.log("Aucune donnée trouvée pour cet utilisateur!");
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
      return null;
    }
  };