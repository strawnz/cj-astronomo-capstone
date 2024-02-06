import './Header.scss';
import { Link } from 'react-router-dom';
import logoGrey from '../../assets/logo/grey_transparent.svg';

function Header() {
    return (
        <>
        <header className='header'>
            <Link to="/" >
                <img src={logoGrey} className='logo__grey' alt='logo in grey'/>
            </Link>
        </header>
        </>
    )
};

export default Header;