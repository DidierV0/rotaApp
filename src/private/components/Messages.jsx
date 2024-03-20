import React, { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { dbFirestore} from '../../services/firebase'

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(dbFirestore, "messages"));
      const messagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
      if (messagesData.length > 0) {
        setSelectedMessageId(messagesData[0].id);
      }
    };

    fetchMessages();
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessageId(message.id);
  };

  const handleDeleteMessage = async (messageId) => {
    await deleteDoc(doc(dbFirestore, "messages", messageId));
    const updatedMessages = messages.filter(message => message.id !== messageId);
    setMessages(updatedMessages);
    if (selectedMessageId === messageId) {
      setSelectedMessageId(updatedMessages.length > 0 ? updatedMessages[0].id : null);
    }
  };

  return (
    <>
      <div className=' text-white'>
        <h1 className=' text-3xl'>Messages</h1>
      </div>
      <div className="flex text-white w-3/4">
      <div className="w-1/4 h-screen overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            onClick={() => handleSelectMessage(message)}
            className={`cursor-pointer p-2 ${selectedMessageId === message.id ? 'bg-rotaPink text-white' : 'hover:bg-gray-200'}`}
          >
            {message.email}
          </div>
        ))}
      </div>
      <div className="w-3/4 p-4">
        {messages.find(msg => msg.id === selectedMessageId) && (
          <>
            <h2>{messages.find(msg => msg.id === selectedMessageId).firstName} {messages.find(msg => msg.id === selectedMessageId).lastName}</h2>
            <p>Email: {messages.find(msg => msg.id === selectedMessageId).email}</p>
            <p>Message: {messages.find(msg => msg.id === selectedMessageId).message}</p>
            <button
              onClick={() => handleDeleteMessage(selectedMessageId)}
              className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
    </>
  )
}

export default Messages