import ArticleItem from "./ArticleItem";
<<<<<<< Updated upstream
function ArticleList() {
=======
function ArticleList({onClickOpenArticle}) {

  const handleOnClickOpenArticle = (itemData) => {
    console.log("aqui")
    onClickOpenArticle();
  };

>>>>>>> Stashed changes
  return (
    <>
      <div className="articleListContainer">
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
      </div>
    </>
  );
}

export default ArticleList;
