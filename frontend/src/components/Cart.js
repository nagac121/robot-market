import { useSelector } from "react-redux";

import "./Cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.robo.cartItems);
  console.log("cart1: ",cartItems)

  return (
    <div className="Cart-section">
      <header>CART ITEMS</header>
      {cartItems.map((element) => (
        <div key={element.createdAt}>
          <div>Name: {element.name}</div>
          <div>Qty: {element.qty}</div>
        </div>
      ))}
    </div>
  );
}
export default Cart;
