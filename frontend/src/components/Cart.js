import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";

import "./Cart.css";

import { roboActions } from "../store/robo-slice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.robo.cartItems);

  const onClickIncrCart = (element) => {
    dispatch(
      roboActions.addToCart({
        item: element,
        userAction: "add",
      })
    );
  };
  const onClickDecrCart = (element) => {
    dispatch(
      roboActions.addToCart({
        item: element,
        userAction: "remove",
      })
    );
  };
  return (
    <div className="cart-section">
      <header>MY CART</header>
      {cartItems.map((element) => (
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
