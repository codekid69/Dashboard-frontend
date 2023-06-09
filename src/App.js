import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signup from './components/signup/Signup';
import PrivateComponent from './components/private/PrivateComponent';
import Login from './components/login/Login';
import Product from './components/product/Product';
import ProductList from './components/productlist/ProductList';
import Update from './components/updateproduct/Update';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route exact path='/' element={<ProductList/>} />
            <Route exact path='/add' element={<Product/>} />
            <Route exact path='/dashboard' element={<Dashboard/>} />
            <Route exact path='/update/:id' element={<Update/>} />
            <Route exact path='/logout' element={<h1>LOGOUT COMPONENTS</h1>} />
            <Route exact path='/profile' element={<Profile/>} />
          </Route >
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='*' element={<h1>404 CANNOT FIND THE PAGE</h1>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
