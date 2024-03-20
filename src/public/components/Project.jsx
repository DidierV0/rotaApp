import React, { useEffect, useState } from 'react'
import Card from '../common/Card'
import SmallCard from '../common/SmallCard'
import { Link } from 'react-router-dom'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { dbFirestore } from '../../services/firebase'

const Project = () => {

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
    <div id='project' className='h-screen w-screen flex flex-col items-center bg-rotaPink'>
      <div className='flex'>
        <h1 className='max-md:text-4xl max-md:mt-10 max-md:mb-5 text-7xl font-extrabold mt-20 mb-5 mr-5'>Nos</h1> <h1 className='max-md:text-4xl max-md:mt-10 max-md:mb-5 text-7xl font-extrabold text-white mt-20 mb-5'>actions</h1>
      </div>
      <div className='flex gap-10 max-md:gap-2 max-md:px-1'>
        <div className=' w-3/4 max-md:w-24'><Card collectionName="aLaUne" documentId="FKgxM92i9OWUQOiDJNgG"/></div>
        <div className=' w-3/4 max-md:w-24'><Card collectionName="aLaUne" documentId="fhVzP8b3jhGhIrfaqTLe"/></div>
        <div className=' w-3/4 max-md:w-24'><Card collectionName="aLaUne" documentId="sDql32Z1KgcHl3wheugg"/></div>

      </div>
      <div className='flex max-md:grid max-md:grid-cols-3 max-lg:grid max-lg:grid-cols-4'>
      {articles.map(article => (
          <div className=' mx-3 max-md:mx-0' key={article.id}>
            <SmallCard article={article} />
            
          </div>
        ))}
        
        <div className='max-md:h-32 max-md:w-24 max-md:mx-0 mx-3 h-52 w-40 bg-white/60  rounded-xl flex items-center shadow-md transition duration-300 ease-in-out transform hover:bg-pink-400 hover:-translate-y-2 hover:shadow-lg'>
          <Link to='/actions'>
            <div className=' w-full px-5 py-2 rounded-b-md'>Voir toutes les Action</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Project