import ArticleItem from "./ArticleItem";

function ArticleList({onClickOpenArticle}) {

  const handleOnClickOpenArticle = (itemData) => {
    console.log("aqui")
    onClickOpenArticle();
  };

  return (

    <>
      <div onClick={handleOnClickOpenArticle} className="articleListContainer">
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
        <ArticleItem></ArticleItem>
      </div>
    </>
  );
}

export default ArticleList;
