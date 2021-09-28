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

  const onImgLoad = (robo, e) => {
    const galleryRef = imageRef.current;
    const loaded = imagesLoaded(galleryRef);
    setIsLoading(loaded);
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
          return (
            <div key={robo.image}>
              <img
                src={robo.image}
                onLoad={onImgLoad.bind(this, robo)}
                onError={onImgError.bind(this)}
                alt=""
              />
              <div>{robo.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default RoboList;
