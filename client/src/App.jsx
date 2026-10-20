import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import Main from './layouts/Main';
import ProductList from './products/ProductList';
import ProductInfo from './products/ProductInfo';
import AddProduct from './products/AddProduct';
import UpdateProduct from './products/UpdateProduct';
import { useState } from 'react';
import SignIn from './users/SignIn';
import SignUp from './users/SignUp';

function App() {
  // 로그인 상태 관리하기
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인한 사용자 Id
  const [username, setUsername] = useState("");

  // 로그인 핸들러 함수
  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username); // 로그인 한 사용자 상태
  }

  // 로그아웃 핸들러
  const handleLogout = () =>{
    setIsLoggedIn(false);
    setUsername(""); // 로그아웃 시 사용자 상태 초기화
  }

  return (
    <>
      <section className="app">
        <BrowserRouter>
          <Header
            isLoggedIn={isLoggedIn}
            username={username}
            onLogout={handleLogout}
          />
          <div className='container'>
          <Routes>
            <Route path='/' element={<Main />} />
            {/* 상품 */}
            <Route path='/products' element={<ProductList />} />
            <Route path='/products/:id' element={<ProductInfo />} />
            <Route path='/products/new' element={<AddProduct />} />
            <Route path='/products/update/:id' element={<UpdateProduct />} />
            {/* 회원 */}
            <Route path='/signin' element={<SignIn onLogin={handleLogin} />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
          </div>
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
