import './Header.scss';
import { Link } from 'react-router-dom';
import logoWhite from '../../assets/logo/white_transparent.svg';

function Header() {
    return (
        <>
        <header className='header'>
            <img src={logoWhite} className='logo__white' alt='logo in white'/>
        </header>
        </>
    )
};

export default Header;