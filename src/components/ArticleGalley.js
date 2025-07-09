import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ArticleGallery({ gallery }) {
  let tempArray = [];
  if (gallery) {
    for (let index = 0; index < gallery.length; index++) {
      tempArray.push(gallery[index].absolute_url);
    }
  }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };

  if (tempArray.length > 0) {
    return (
      <div style={{ maxHeight: "300px", height: "300px", borderRadius: "8px", paddingBottom: "20px"}}>
        <Carousel
          responsive={responsive}
          infinite={true}
          showDots={true}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item-padding-40-px"
        >
          {tempArray.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                style={{ width: "100%", height: "300px", objectFit: "fill" }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    );
  } else {
    return <></>;
  }
}

export default ArticleGallery;
