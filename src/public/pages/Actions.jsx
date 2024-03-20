import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Card from '../common/Card'
import SmallCard from '../common/SmallCard'
import { Link } from 'react-router-dom'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { dbFirestore } from '../../services/firebase'
import CardList from '../common/CardList'

const Actions = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        // Créer une requête pour récupérer les 5 derniers articles, triés par date de publication
        const articlesQuery = query(collection(dbFirestore, "articles"), orderBy("date", "desc"), limit(5));

        // Exécuter la requête
        const querySnapshot = await getDocs(articlesQuery);

        // Transformer les résultats en un tableau d'objets d'articles
        const fetchedArticles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(fetchedArticles); // Mettre à jour l'état avec les articles récupérés
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <>
        <Header/>
      <div className='flex flex-col w-screen justify-center items-center'>

        <div className=' flex'>
          <h1 className='max-md:text-4xl max-md:mt-10 max-md:mb-5 text-7xl font-extrabold mt-20 mb-20 mr-5'>Nos</h1> <h1 className='max-md:text-4xl max-md:mt-10 max-md:mb-5 text-7xl font-extrabold text-rotaPink mt-20 '>actions</h1>
        </div>
        <div className=' max-md:grid-cols-3 grid grid-cols-4'>
        {articles.map(article => (
          <div className=' max-md:mx-1 mx-3' key={article.id}>
            <CardList article={article} />
            
          </div>
        ))}
        </div>

      </div>
    </>
  )
}

export default Actions