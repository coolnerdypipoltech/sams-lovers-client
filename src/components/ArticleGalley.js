function ArticleGallery({gallery}) {

    return (
        <>
        {gallery.map((galleryItem, index) => (
            <div key={index}>
                {""}
                <img
                style={{ width: "100%", paddingLeft: "0px" }}
                className="imageAcademyItem"
                src={galleryItem.absolute_url}
                alt="Gallery illustration"
                />
            </div>
        ))}
        </>
    );
}

export default ArticleGallery;