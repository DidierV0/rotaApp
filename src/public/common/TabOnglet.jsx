import React, { useState } from 'react'
import CardTabs from './CardTabs';
import CardBoard from './CardBoard';

const TabOnglet = () => {
  
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    return (

    <div className=''>
        <div className="flex border-b justify-center">
            <button
            onClick={() => handleTabClick('tab1')}
            className={`py-2 px-4 text-xl font-semibold max-md:text-xs ${activeTab === 'tab1' ? 'border-b-2 border-rotaPink text-rotaPink' : 'text-gray-500 hover:text-gray-600'}`}
            >
            Mission
            </button>

            <button
            onClick={() => handleTabClick('tab2')}
            className={`py-2 px-4 text-xl font-semibold max-md:text-xs ${activeTab === 'tab2' ? 'border-b-2 border-rotaPink text-rotaPink' : 'text-gray-500 hover:text-gray-600'}`}
            >
            Bureau
            </button>

            <button
            onClick={() => handleTabClick('tab3')}
            className={`py-2 px-4 text-xl font-semibold max-md:text-xs ${activeTab === 'tab3' ? 'border-b-2 border-rotaPink text-rotaPink' : 'text-gray-500 hover:text-gray-600'}`}
            >
            Commissions
            </button>
            
            <button
            onClick={() => handleTabClick('tab4')}
            className={`py-2 px-4 text-xl font-semibold max-md:text-xs ${activeTab === 'tab4' ? 'border-b-2 border-rotaPink text-rotaPink' : 'text-gray-500 hover:text-gray-600'}`}
            >
            District
            </button>

        </div>
        <div className="p-4 mt-10 max-md:mt-3 flex justify-center">
            {activeTab === 'tab1' && <div><CardTabs collectionName="missions" documentId="4zKDZwthHYluW0I8kVvJ" /></div>}
            {activeTab === 'tab2' && <div><CardBoard/></div>}
            {activeTab === 'tab3' && <div><CardTabs collectionName="commissions" documentId="iy9eFjYdiRwd0vk97aL9" /></div>}
            {activeTab === 'tab4' && <div><CardTabs collectionName="district" documentId="Wqxj7Rr5enlBYKFATwUI" /></div>}
        </div>
    </div>
  )
}

export default TabOnglet