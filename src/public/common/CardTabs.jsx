import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { dbFirestore } from '../../services/firebase';

const CardTabs = ({collectionName, documentId}) => {

    const [documentData, setDocumentData] = useState(null);

    useEffect(() => {
      const fetchDocumentData = async () => {
        const docRef = doc(dbFirestore, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocumentData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };
  
      fetchDocumentData();
    }, [collectionName, documentId]);
  
    if (!documentData) return <div>Loading...</div>;


  return (
    <div className="rounded overflow-hidden shadow-lg max-md:w-96">
    {documentData.image && (
      <img className="w-full h-60 object-cover" src={documentData.image} alt="Document" />
    )}
    <div className="px-6 py-4">
      <p className="text-gray-700 text-base max-md:text-sm">{documentData.descriptif}</p>
    </div>
  </div>
  )
}

export default CardTabs