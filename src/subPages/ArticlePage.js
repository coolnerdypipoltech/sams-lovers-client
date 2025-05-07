function ArticlePage() {
  return (
    <>
      <div className="ArticlePage">
        <div className="ArticlePageContainer">
          <p className="arrticleText">Volver</p>

          <div className="ArticleItem">
            <p className="articleTitle">Titulo</p>
            <p style={{ fontStyle: "italic" }} className="arrticleText">
              Fecha
            </p>
          </div>
          <p className="arrticleText">Texto</p>
            <div className="articleImageContainer"></div>
        </div>
        <p className="articlePageNextArticle"> Ver siguiente entrada</p>
      </div>
    </>
  );
}

export default ArticlePage;
