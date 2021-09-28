import React, { useRef, useState } from "react";

import "./RoboList.css";

function RoboList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef();

  const imagesLoaded = (parentNode) => {
    // returns 'true' if all imgs are loaded, otherwise returns false.
    const imgElements = [...parentNode.querySelectorAll("img")];
    for (let i = 0; i < imgElements.length; i += 1) {
      const img = imgElements[i];
      if (!img.complete) {
        return false;
      }
    }
    return true;
  };

  // useEffect(() => {
  //   console.log(`Image Urls list: ${props.roboData}`);
  // }, [props.roboData]);

  const onImgLoad = () => {
    const galleryRef = imageRef.current;
    const imgLoadingNotCompleted = !imagesLoaded(galleryRef);
    console.log("imgLoadingNotCompleted: ", imgLoadingNotCompleted);
    setIsLoading(imgLoadingNotCompleted);
  };

  const onImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "./image-not-found.png";
  };

  const renderSpinner = () => {
    if (!isLoading) {
      return null;
    }
    return <div className="loader">Loading...</div>;
  };

  return (
    <div className="gallery" ref={imageRef}>
      {renderSpinner()}
      <div className="images">
        {props.roboData.map((robo) => {
          // image, name, price, stock, created date, material,
          return (
            <div key={robo.image} className="robo-item">
              <div className="robo-img">
                <img
                  alt=""
                  onError={onImgError.bind(this)}
                  onLoad={onImgLoad.bind(this, robo)}
                  src={robo.image}
                />
              </div>
              <div className="robo-name">{robo.name}</div>
              <div className="item-detail">
                <div>MRP: &#3647;{robo.price}</div>
                <div>Qty: {robo.stock}</div>
                <div>Date: {robo.formattedDate}</div>
                <div>Material:  {robo.material}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default RoboList;
