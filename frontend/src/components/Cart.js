import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

import "./cart.css";

import { roboActions } from "../store/robo-slice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.robo.cartItems);

  const onClickIncrCart = (element) => {
    dispatch(
      roboActions.updateCart({
        item: element,
        userAction: "addItemToCart",
      })
    );
  };
  const onClickDecrCart = (element) => {
    dispatch(
      roboActions.updateCart({
        item: element,
        userAction: "removeItemFromCart",
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
        cartItems.map((element) => (
          <div key={element.createdAt} className="cart-item">
            <span className="cart-item-name">{element.name}</span>
            <span className="cart-qty-section">
              <IconButton
                color="primary"
                onClick={onClickDecrCart.bind(this, element)}
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
                onClick={onClickIncrCart.bind(this, element)}
                disabled={element.stock === 0}
              >
                <AddSharpIcon className="qty-icon" />
              </IconButton>
            </span>
          </div>
        ))}
    </div>
  );
}
export default Cart;
