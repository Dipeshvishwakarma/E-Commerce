import React,{ useState, useEffect} from 'react'
import { commerce } from './lib/commerce';
import { Products,Navbar } from './components';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout';

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [ order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts  = async () =>{
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart  = async () =>{
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async ( productId, quantity)=>{
        const item = await commerce.cart.add(productId,quantity);
        setCart(item);
  };

  const handleUpdateCartQty = async (productId,quantity) => {
            const response = await commerce.cart.update(productId, {quantity} );
            setCart(response);
            // console.log(response.cart);
  };
  const handleRemove = async (productId) => {
            const response = await commerce.cart.remove(productId);
            setCart(response)
  };
  const handleEmptyCart = async () => {
            const response = await commerce.cart.empty();
            setCart(response);
            // console.log(response.cart);
  };
  const refrashCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
      try{
            const incomingOder = await commerce.checkout.capture(checkoutTokenId,newOrder);
            setOrder(incomingOder);
            refrashCart();
      } catch(error){
             setErrorMessage(error.data.error.message);
      }   
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  
  // console.log(cart);
  return (
    <Router>

      <div>
        <Navbar totalItems={cart?.total_items}/>
        <Switch>
          <Route exact path="/">
             <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
             <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} onRemove={handleRemove} onEmpty={handleEmptyCart}/>
          </Route>
          <Route exact path="/checkout">
            <Checkout 
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
                />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App