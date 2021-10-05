import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { roboActions } from "../store/robo-slice";
import { useSelector } from "react-redux";

function CartButton(props) {
  const cartList = useSelector((state) => state.robo.cartItems);

  const dispatch = useDispatch();

  const onClickAddBtn = () => {
    if (cartList && cartList.length > 4) {
      alert(`cannot add more than ${cartList.length} items`);
    } else {
      dispatch(
        roboActions.updateCart({
          item: props.item,
          userAction: "addItemToCart",
        })
      );
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<AddShoppingCartIcon fontSize="small" />}
      disabled={props.item.stock === 0}
      onClick={onClickAddBtn}
    >
      Add
    </Button>
  );
}
export default CartButton;
