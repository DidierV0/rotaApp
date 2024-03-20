import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { dbFirestore } from '../../services/firebase';

const CardBoard = () => {

    const [boardMembers, setBoardMembers] = useState([]);

  useEffect(() => {
    const fetchBoardMembers = async () => {
      const q = query(collection(dbFirestore, "bureau"), orderBy("ordre"));
      const querySnapshot = await getDocs(q);
      const members = querySnapshot.docs.map(doc => doc.data());
      setBoardMembers(members);
    };

    fetchBoardMembers();
  }, []);


  return (
    <div className='mx-auto max-w-full p-2'>
  <div className="grid grid-cols-3 gap-2 lg:grid-cols-5">
    {boardMembers.map((member, index) => (
      <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        {member.photo && (
          <img src={member.photo} alt={`${member.nom} ${member.prenom}`} className="w-full object-cover" style={{ height: '200px' }} />
        )}
        <div className="p-2">
          <h5 className="text-rotaPink font-bold text-sm">{member.nom}</h5>
          <h5 className="text-rotaPink font-bold text-sm">{member.prenom}</h5>
          <p className="text-gray-700 text-xs">{member.position}</p>
        </div>
      </div>
    ))}
  </div>
</div>
  )
}

export default CardBoard