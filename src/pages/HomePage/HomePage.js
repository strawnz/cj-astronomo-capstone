import './HomePage.scss';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <main class='main'>
            <section className='hero__container'> 
                <div className='hero__concert'></div>
                <div className='hero__sports'></div>
                <div className='hero__theatre'></div>
            </section>
            <h1>Home Page Placeholder</h1>
        </main>
    )
};

export default HomePage;