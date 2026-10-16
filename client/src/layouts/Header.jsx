import { NavLink } from 'react-router-dom';

const Header = ()=>{

    return (
        <header className='header'>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>상품 목록</NavLink>
            </nav>
        </header>
    )
}

export default Header;