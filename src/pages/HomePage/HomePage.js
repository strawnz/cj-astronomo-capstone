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
                <p className='home__subheader'>
                    Ready to transform your journey to a live event 
                    from chaos to coordinated elegance?
                </p>    
                <div className='home__paragraph-container'>
                    <p className='home__body'>
                        Elevate your event experience with Pre-Event Planner (PEP), the 
                        ultimate itinerary builder designed for live event enthusiasts
                        in Toronto.
                    </p>
                </div>
                <div className='home__paragraph-container'> 
                    <p className='home__body'>
                        Select from our curated list of the city's top 10 venues, and let PEP
                        handle the details. We recommend nearby parking and dining options, 
                        and calculate the perfect travel times for a stress-free journey to
                        your concert, sports event or theatre show. 
                    </p>            
                </div>
                <div className='home__paragraph-container'> 
                    <p className='home__body'>
                        Your path to unforgettable moments begins here.
                        Click below to PEP up your itinerary!
                    </p>          
                </div>
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