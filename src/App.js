import React,{useContext,useEffect,lazy,Suspense} from 'react';
import {Route,Switch,useHistory,Redirect} from 'react-router-dom';
import Login from './pages/Login';
/* import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './components/Products/ProductDetails'; */
import AuthContext from './store/auth-context';
import CartContext from './store/cart-context';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const HomePage=lazy(()=>import('./pages/Home'));
const ProductsPage=lazy(()=>import('./pages/Products'));
const AboutPage=lazy(()=>import('./pages/About'));
const ContactPage=lazy(()=>import('./pages/Contact'));
const ProductDetailsPage=lazy(()=>import('./components/Products/ProductDetails'));

const App = () => {
  const authCtx=useContext(AuthContext);
  const cartCtx=useContext(CartContext);
  const history=useHistory();
  const location=useLocation();
  useEffect(()=>cartCtx.cartUpdater(),[])
  if(localStorage.length!==0){
    Object.entries(localStorage).forEach((key)=>{
      authCtx.login(key[1])
    })
    if(location.pathname==='/')
      history.push('/products');
  }
  async function newUserHandler(newUser){
    await fetch('https://react-http-a5c75-default-rtdb.firebaseio.com/users.json',{
      method:'POST',
      body:JSON.stringify(newUser),
      headers:{
        'Content-Type':'application/json'
      }
    })
  }
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <Login/>
        </Route>
        <Route path='/home'>
          <Suspense fallback={<p>Loading...</p>}>
            <HomePage/>
          </Suspense>
        </Route>
        <Route path='/products' exact>
          {authCtx.isLoggedIn?(
            <Suspense fallback={<p>Loading...</p>}>
              <ProductsPage/>
            </Suspense>):<Redirect to='/'/>}
        </Route>
        <Route path='/about'>
          <Suspense fallback={<p>Loading...</p>}>
            <AboutPage/>
          </Suspense>
        </Route>
        <Route path='/contact'>
          <Suspense fallback={<p>Loading...</p>}>
            <ContactPage onAddUser={newUserHandler}/>
          </Suspense>
        </Route>
        <Route path='/products/:productID'>
          <Suspense fallback={<p>Loading...</p>}>
            <ProductDetailsPage/>
          </Suspense>
        </Route>
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </>
  )
};
export default App;