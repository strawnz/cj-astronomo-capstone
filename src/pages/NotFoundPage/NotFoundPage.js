import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <>
            <section className='not-found__container'>
                <h1 className='not-found__title'>404 - Page Not Found</h1>
                <p>Go to <Link to="/" className='not-found__link'>Home Page</Link></p>
            </section>
        </>
    )
};

export default NotFoundPage;