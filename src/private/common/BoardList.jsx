import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { dbFirestore, storage } from '../../services/firebase';
import { deleteObject, ref } from 'firebase/storage';

const BoardList = () => {

    const [members, setMembers] = useState([]);

  // Récupérer les membres du bureau depuis Firestore
  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(dbFirestore, "bureau"));
      const membersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMembers(membersData);
    };

    fetchMembers();
  }, []);

  // Modifier l'ordre d'un membre
  const handleOrderChange = async (id, newOrder) => {
    const memberRef = doc(dbFirestore, "bureau", id);
    await updateDoc(memberRef, {
      ordre: parseInt(newOrder, 10)
    });
  };

  // Supprimer un membre et sa photo de Firebase Storage
  const handleDelete = async (id, photoPath) => {
    // Supprimer la photo de Firebase Storage
    const photoRef = ref(storage, photoPath);
    await deleteObject(photoRef);

    // Supprimer le membre de Firestore
    await deleteDoc(doc(dbFirestore, "bureau", id));
  };


  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-rotaPink">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Prénom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Position</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Photo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ordre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap">{member.nom}</td>
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap">{member.prenom}</td>
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap">{member.position}</td>
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                <img src={member.photo} alt="Aperçu" className=" size-12 object-cover" />
              </td>
              <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                <select
                  defaultValue={member.ordre}
                  onChange={(e) => handleOrderChange(member.id, e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-rotaPink focus:border-rotaPink sm:text-sm"
                >
                  {[...Array(10).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(member.id, member.photo)}
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
  )
}

export default BoardList