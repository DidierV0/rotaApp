import React from 'react'
import { DetailArticle } from './Navigation'

const SmallCard = ({article}) => {

  const articleId = article.id

  return (
    <DetailArticle articleId={articleId}>

      <div className=' max-md:w-28 w-40'>

        <div className=" max-md:w-24 max-md:mb-5 bg-white rounded-xl shadow-md overflow-hidden mb-10 h-fit transition duration-300 ease-in-out transform hover:bg-pink-400 hover:-translate-y-2 hover:shadow-lg">
          {article.images && article.images[0] && (
            <div style={{ backgroundImage: `url(${article.images[0]})` }} className=" max-md:size-24 size-40 bg-cover object-center"></div>
            )}
          <div className=" w-40">
            <p className=" max-md:hidden block mt-1 pb-3 px-2 text-md leading-tight font-medium text-black">{article.title.slice(0, 30)}{article.subtitle.length > 30 ? "..." : ""}</p>
            <p className=" md:hidden max-md:text-xs max-md:px-1 max-md:w-24 block mt-1 pb-3 px-2 text-md leading-tight font-medium text-black">{article.title.slice(0, 25)}{article.subtitle.length > 25 ? "..." : ""}</p>
          </div>
        </div>
      </div>
    </DetailArticle>
  )
}

export default SmallCard