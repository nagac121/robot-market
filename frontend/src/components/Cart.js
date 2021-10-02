import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

import "./cart.css";

import { roboActions } from "../store/robo-slice";
import { useEffect, useState } from "react";

function Cart() {
  const dispatch = useDispatch();
  const [totalAmt, setTotalAmt] = useState(0);

  const cartItems = useSelector((state) => state.robo.cartItems);

  useEffect(() => {
    let amt = cartItems.reduce((sum, i) => {
      sum = sum + i.qty * i.price;

      return sum;
    }, 0);
    amt = parseFloat(amt)
      .toFixed(2)
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    setTotalAmt(amt);
  }, [cartItems]);

  const onClickIncrQtyBtn = (element) => {
    dispatch(
      roboActions.updateCart({
        item: element,
        userAction: "addItemToCart",
      })
    );
    dispatch(
      roboActions.createMaterialMap({
        materialType: element.material,
        userAction: "cartPlus",
      })
    );
  };
  const onClickDecrQtyBtn = (element) => {
    dispatch(
      roboActions.updateCart({
        item: element,
        userAction: "removeItemFromCart",
      })
    );
    dispatch(
      roboActions.createMaterialMap({
        materialType: element.material,
        userAction: "cartMinus",
      })
    );
  };
  return (
    <div className="cart-section">
      <header>MY CART</header>
      {cartItems.length === 0 && (
        <div style={{ fontSize: "20px" }}>Cart is empty !</div>
      )}
      {cartItems.length > 0 &&
        cartItems.map((element, index) => (
          <div key={element.createdAt} className="cart-item">
            <span className="cart-item-name">{element.name}</span>
            <span className="cart-qty-section">
              <IconButton
                color="primary"
                onClick={onClickDecrQtyBtn.bind(this, element)}
              >
                <RemoveSharpIcon className="qty-icon" />
              </IconButton>
              <input
                className="cart-qty"
                disabled={true}
                type="text"
                value={element.qty}
              />
              <IconButton
                color="primary"
                onClick={onClickIncrQtyBtn.bind(this, element)}
                disabled={element.stock === 0}
              >
                <AddSharpIcon className="qty-icon" />
              </IconButton>
            </span>
            <div className="cart-item-name">Material: {element.material}</div>
            <div>Total price: {element.qty * element.price} </div>
          </div>
        ))}
      {cartItems.length !== 0 && <div> Total amount: {totalAmt}</div>}
    </div>
  );
}
export default Cart;
