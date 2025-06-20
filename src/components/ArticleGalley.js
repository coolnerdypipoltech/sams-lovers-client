function ArticleGallery({gallery}) {
    return (
        gallery.map((galleryItem, index) => {
            <img
                style={{ width: "100%", paddingLeft: "0px" }}
                key={index}
                className="imageAcademyItem"
                src={galleryItem.absolute_url}
                alt="bannerLogo"
        ></img>
        })
    );
}

export default ArticleGallery;