import React, { useState } from 'react'
import Header from '../common/Header'
import Messages from '../components/Messages'
import Missions from '../components/about/Missions'
import Welcome from '../components/Welcome'
import Bureau from '../components/about/Bureau'
import Commissions from '../components/about/Commissions'
import District from '../components/about/District'
import LaUne from '../components/articles/LaUne'
import Articles from '../components/articles/Articles'
import Publier from '../components/articles/Publier'

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState('');

  const renderSection = () => {
    switch (activeTab) {
      case '#1':
        return <Missions />;
      case '#2':
        return <Bureau />;
      case '#3':
        return <Commissions />;
      case '#4':
        return <District />;
      case '#5':
        return <LaUne />;
      case '#6':
        return <Articles />;
      case '#7':
        return <Publier />;
      case '#8':
        return <Messages />;
      // Ajoutez d'autres cas ici pour d'autres sections
      default:
        return <Welcome />;
    }
  };

  return (
    <div>
      <Header/>

    <div className="flex h-screen bg-gray-400">
      <div className=" w-48 h-full bg-gray-900 text-white shadow-md">
        <ul>
          <li className="p-4 text-xl font-semibold">A propos</li>
          <li onClick={() => setActiveTab('#1')} className="cursor-pointer p-4 hover:bg-gray-100 hover:text-gray-900 text-end">Missions</li>
          <li onClick={() => setActiveTab('#2')} className="cursor-pointer p-4 hover:bg-gray-100 hover:text-gray-900 text-end">Bureau</li>
          <li onClick={() => setActiveTab('#3')} className="cursor-pointer p-4 hover:bg-gray-100 hover:text-gray-900 text-end">Comissions</li>
          <li onClick={() => setActiveTab('#4')} className="cursor-pointer p-4 hover:bg-gray-100 hover:text-gray-900 text-end">District</li>
          <li className="p-4 text-xl font-semibold">Articles</li>
          <li onClick={() => setActiveTab('#5')} className="cursor-pointer p-4 hover:bg-gray-100 hover:text-gray-900 text-end">La Une</li>
          <li onClick={() => setActiveTab('#6')} className="cursor-pointer p-4 hover:bg-gray-100 hover:text-gray-900 text-end">Les Articles</li>
          <li onClick={() => setActiveTab('#7')} className="cursor-pointer p-4 hover:bg-gray-100 hover:text-gray-900 text-end">Publier</li>
          <li onClick={() => setActiveTab('#8')} className="cursor-pointer p-4 hover:bg-gray-100 hover:text-gray-900 text-xl font-semibold">Messages</li>
          {/* Ajoutez d'autres onglets ici */}
        </ul>
      </div>
      <div className="flex-1 p-7">
        {renderSection()}
      </div>
    </div>
    </div>
  )
}

export default Dashboard