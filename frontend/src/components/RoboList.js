import "./RoboList.css";
import Button from "@mui/material/Button";

import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { roboActions } from "../store/robo-slice";

function RoboList(props) {
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const roboItems = useSelector((state) => state.robo.items);

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

  const onImgLoad = () => {
    const galleryRef = imageRef.current;
    const imgLoadingNotCompleted = !imagesLoaded(galleryRef);
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

  const onClkAddToCart = (robo) => {
    // cart should contain list of selected robots, total amount and total price
    if (robo.stock === 0) {
      return alert("stock out of date");
    }
    dispatch(roboActions.addToCart({ cartItems: robo || [] }));
  };

  return (
    <div className="gallery" ref={imageRef}>
      {renderSpinner()}
      {roboItems.map((robo) => {
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
              <div>Stock: {robo.stock}</div>
              <div>Date: {robo.formattedDate}</div>
              <div>Material: {robo.material}</div>
            </div>
            <Button
              variant="outlined"
              startIcon={<AddShoppingCartIcon fontSize="small" />}
              disabled={robo.stock === 0}
              onClick={onClkAddToCart.bind(this, robo)}
            >
              Add To Cart
            </Button>
          </div>
        );
      })}
    </div>
  );
}
export default RoboList;
