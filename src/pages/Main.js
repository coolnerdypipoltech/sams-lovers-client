import { useState } from "react";
import ArticleList from "../components/ArticleList";
import "../styles/Main.css";
import ArticlePage from "../subPages/ArticlePage";
function Main() {
  const [openArticlePage, setOpenArticlePage] = useState(false);


  const onClickOpenArticle = () => {
    console.log("aqui")
    setOpenArticlePage(true);
  }

  const onReturn = () => {
    setOpenArticlePage(false);
  }

  return (
    <>
      {openArticlePage ? (
        <ArticlePage onReturn={onReturn}></ArticlePage>
      ) : (
        <div className="MainContainer">
          <p className="Title">Tutoriales, Tips y noticias</p>

          <ArticleList onClickOpenArticle={onClickOpenArticle} ></ArticleList>
        </div>
      )}
    </>
  );
}

export default Main;
