import ArticleItem from "./ArticleItem";

function ArticleList({onClickOpenArticle}) {

  const handleOnClickOpenArticle = (itemData) => {
    onClickOpenArticle();
  };

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
