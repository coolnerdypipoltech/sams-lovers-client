import { useState } from "react";
import ArticleList from "../components/ArticleList";
import "../styles/Main.css";
import ArticlePage from "../subPages/ArticlePage";
function Articles() {
  const [openArticlePage, setOpenArticlePage] = useState(true);

  return (
    <>
      {openArticlePage ? (
        <ArticlePage></ArticlePage>
      ) : (
        <div className="MainContainer">
          <p className="Title">Tutoriales, Tips y noticias</p>

          <ArticleList></ArticleList>
        </div>
      )}
    </>
  );
}

export default Articles;