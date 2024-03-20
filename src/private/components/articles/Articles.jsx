import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { dbFirestore } from '../../../services/firebase';

// Fonction asynchrone pour récupérer les articles
async function fetchArticles(setArticles) {
  const querySnapshot = await getDocs(collection(dbFirestore, "articles"));
  const articlesData = querySnapshot.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    // Tri des articles par date de publication, du plus récent au plus ancien
    .sort((a, b) => b.date.localeCompare(a.date)); // Assurez-vous que 'date' est une chaîne de caractères au format ISO ou similaire

  setArticles(articlesData);
}

// Fonction asynchrone pour supprimer un article et ses images associées
async function deleteArticleAndImages(articleId, images, setArticles) {
  try {
    // Supprimer chaque image associée à l'article de Firebase Storage
    const deleteImagesPromises = images.map(imagePath => {
      if (imagePath) {
        const imageRef = ref(storage, imagePath);
        return deleteObject(imageRef);
      }
      return Promise.resolve();
    });

    // Attendre que toutes les images soient supprimées
    await Promise.all(deleteImagesPromises);

    // Supprimer l'article de Firestore
    await deleteDoc(doc(dbFirestore, "articles", articleId));

    // Mise à jour de l'état pour refléter la suppression
    setArticles(prevArticles => prevArticles.filter(article => article.id !== articleId));

    alert("Article et images associées supprimés avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article et/ou des images :", error);
    alert("Erreur lors de la suppression.");
  }
}

const Articles = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles(setArticles);
  }, []);

  return (
    <div>
      <div className=' text-white'>
        <h1 className=' text-3xl'>Articles</h1>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-rotaPink text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap">{article.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {article.images && article.images[0] && (
                    <img src={article.images[0]} alt="Article" className="h-10 w-10 rounded-full" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => deleteArticleAndImages(article.id, article.images || [], setArticles)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Articles