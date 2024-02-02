import './ParkingPage.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ParkingPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const venueId = searchParams.get('venueId');
    const venueName = searchParams.get('venueName');
    console.log(venueName);
    const [parkingOptions, setParkingOptions] = useState([]);

    useEffect(() => {
        const fetchParkingOptions = async () => {
            try {
                const response = await axios.get(`
                http://localhost:8080/api/parking/by-venue?venue_id=${venueId}`);
                setParkingOptions(response.data);
                console.log(response.data); // remove this eventually
            } catch (error) {
                console.log("Error fetching parking options: ", error);
            }
        };
        if (venueId) {
            fetchParkingOptions();
        }
    }, [venueId]);

    return (
        <main className='main'>
            <section className='parking__header-container'>
                <h1 className='parking__header'>Parking Options near {venueName}</h1>
                <h2 className='parking__subheader'>
                    Please choose a parking lot
                </h2>
            </section>
            <section>
                <form>
                    {parkingOptions.map((parking) => (
                        <article className='park-card' key={parking.id}>
                            <h3 className='park-card__address'>{parking.address}</h3>
                            <div className='park-card__distance'>
                                <h4 className='park-card__card-header'>
                                    Distance to {venueName}
                                </h4>
                                <p className='park-card__info'>{parking.distance_venue} metres</p>
                            </div>
                            <div className='park-card__duration'>
                                <h4 className='park-card__card-header'>
                                    Estimated walking time to {venueName}
                                </h4>
                                <p className='park-card__info'>{parking.duration_venue} minutes</p>
                            </div>
                        </article>
                    ))}
                    <article className='parking__buttons'>
                        <button type='submit' className='parking__submit'>Submit</button>
                        <button type='' className='parking__back'>Go Back to Form</button>
                    </article>
                </form>
            </section>
        </main>
    )
};

export default ParkingPage;