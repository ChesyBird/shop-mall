import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import Main from './layouts/Main';
import ProductList from './products/ProductList';
import ProductInfo from './products/ProductInfo';
import AddProduct from './products/AddProduct';

function App() {

  return (
    <>
      <section className="app">
        <BrowserRouter>
          <Header />
          <div className='container'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/products' element={<ProductList />} />
            <Route path='/products/:id' element={<ProductInfo />} />
            <Route path='/products/new' element={<AddProduct />} />
          </Routes>
          </div>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
