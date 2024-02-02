import './HomePage.scss';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <main className='main'>
            <section className='hero__container'> 
                <div className='hero__concert'></div>
                <div className='hero__sports'></div>
                <div className='hero__theatre'></div>
            </section>
            <section className='home__container'>
                <h1 className='home__header'>Pre-Event Planner</h1>
                <p className='home__body'>
                    Ready to transform your journey to a live event 
                    from chaos to coordinated elegance?
                </p>                
                <p className='home__body'>
                    Your path to unforgettable moments begins here.
                    Click below to 'PEP' up your itinerary!
                </p>
            </section>
            <section className='home__button-container'>
                <Link to='/form' className='home__button'>
                    START
                </Link>
            </section>
        </main>
    )
};

export default HomePage;