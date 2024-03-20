import { useState } from 'react'
import Public from './public/Index'
import Private from './private/Index'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { initUser, resetUser } from './services/redux/store';


function App() {

  const dispatch = useDispatch() ;
  
  //const compteur = useSelector(state => state.compteur) ;

  const userID = useSelector(state => state.user) ;

  //trace le statut de l'utilisateur
  onAuthStateChanged(auth , user =>{
    if (user) {

      dispatch(initUser(user.uid)) ;
      //console.log('user' , user) ;

    }else{

      dispatch(resetUser()) ;
      //console.log('nc') ;

    }
  })

  return (
    <>
      {userID ? <Private/> : <Public/>}
    </>
  )
}

export default App
