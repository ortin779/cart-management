import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/notification/Notification';
import { getCartData, sendCartData } from './store/cart-slice';

let initialState = true

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state)=>state.ui.isCartVisible)
  const notification = useSelector((state)=>state.ui.notification)
  const cart = useSelector(state=>state.cart)


  useEffect(()=>{
    dispatch(getCartData())
  },[dispatch])

  useEffect(()=>{

    if(initialState){
      initialState = false;
      return;
    }

    dispatch(sendCartData(cart))
   
  },[cart, dispatch])

  return (
    <>
    {notification && <Notification {...notification}/>}
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
