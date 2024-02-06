import './Footer.scss';

function Footer() {
    const copyright = String.fromCodePoint(169);

    return (
        <footer className='footer__container'>
            <h4 className='footer__copy'>
                {`${copyright} Copyright Salt and PEP-ahh, 2024`}
            </h4>
        </footer>
    )
};

export default Footer;