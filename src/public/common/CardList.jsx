import React from 'react'
import ShowArticle from './ShowArticle'

const CardList = ({article}) => {

    const id = article.id
  return (
    <div>
        <ShowArticle articleId={id} />
    </div>
  )
}

export default CardList