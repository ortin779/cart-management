import { useDispatch, useSelector } from 'react-redux';
import { uiSliceActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const {quantity} = useSelector(state=>state.cart)
  const dispatch = useDispatch()

  const handleCartToggle = ()=>{
    dispatch(uiSliceActions.toggleCartVisibility())
  }

  return (
    <button className={classes.button} onClick={handleCartToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
