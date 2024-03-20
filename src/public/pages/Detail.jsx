import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { dbFirestore } from '../../services/firebase';
import Header from '../common/Header';
import Footer from '../common/Footer';

const Detail = () => {

  const { id } = useParams(); // Récupération de l'ID de l'article depuis l'URL
  const [article, setArticle] = useState(null); // État pour stocker les données de l'article

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(dbFirestore, "articles", id); // Référence au document de l'article
        const docSnap = await getDoc(docRef); // Récupération du document

        if (docSnap.exists()) {
          setArticle(docSnap.data()); // Mise à jour de l'état avec les données de l'article
        } else {
          console.log("No such article!");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]); // Dépendance à l'ID pour recharger les données si l'ID change

  if (!article) return <div>Loading...</div>; // Affichage pendant le chargement des données


  return (
    <div className=' w-screen'>
        <Header/>

      <div className=' w-full flex flex-col items-center justify-center'>
        <div className=" max-md:w-screen max-md:p-2 w-2/3 flex justify-center items-center flex-col ">

        <h1 className=" max-md:text-5xl text-6xl font-bold text-rotaPink mb-5 mt-20">{article.title}</h1>

        <h2 className="text-2xl text-gray-700 font-semibold mb-5">{article.subtitle}</h2>
        <div>

              {article.images?.map((image, index) => (
            <div key={index} className='flex flex-col justify-center items-center'>
              {image && (
                <img src={image} alt={`Article Image ${index + 1}`} className="my-10 h-96 w-3/4 object-cover" />
              )}
              {article.paragraphs?.[index] && (
                <p className="text-gray-600 text-2xl mb-4">{article.paragraphs[index]}</p>
              )}
            </div>
          ))}
        </div>

        <div>

        
        </div>
      </div>
      </div>
        <p className="text-gray-500 mb-20 ml-72 mt-10">{article.date}</p>
    </div>
  )
}

export default Detail