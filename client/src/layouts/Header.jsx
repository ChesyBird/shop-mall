import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({isLoggedIn, username, onLogout})=>{

    const navigate = useNavigate();

    return (
        <header className='header'>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>상품 목록</NavLink>
                <NavLink to='/products/new'>상품 등록</NavLink>
                {isLoggedIn ? (
                    <div className='header-user'>
                        <span>{username}님</span>
                        <button
                            className='logout-btn'
                            onClick={()=>{onLogout(); navigate('/')}}
                        >로그아웃</button>
                    </div>
                ) : (
                    <NavLink to='/signin'>로그인</NavLink>
                )}
            </nav>
        </header>
    )
}

export default Header;