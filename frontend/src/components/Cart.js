import { useSelector } from "react-redux";

import "./Cart.css";

import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";

function Cart() {
  const cartItems = useSelector((state) => state.robo.cartItems);
  console.log("cart1: ", cartItems);

  // {/* ${element.qty} in Cart; */}
  return (
    <div className="Cart-section">
      <header>MY CART</header>
      {cartItems.map((element) => (
        <div key={element.createdAt} className="cart-item">
          <span className="cart-item-name">{element.name}</span>
          <span className="cart-qty-section">
            <RemoveSharpIcon className="qty-icon"/>
            <input className="cart-qty" disabled={true} type="text" value={element.qty} />
            <AddSharpIcon className="qty-icon"/>
          </span>
        </div>
      ))}
    </div>
  );
}
export default Cart;
