import { Link } from "react-router-dom"
import React from 'react';

export const DetailArticle = ({articleId, children}) => {
    return <Link to={`/detail/${articleId}`}>{children}</Link>
  }