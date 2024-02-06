import './Restaurants.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function Restaurants({ venueId, venueName, onSelect, priceChoice, restoId }) {
    console.log("Venue Id from Itinerary Form to Restaurants: ", venueId); // remove this eventually
    console.log("Price Choice from Itinerary Form to Restaurants: ", priceChoice); // remove this eventually
    const [restoOptions, setRestoOptions] = useState([]);
    const [restoInfo, setRestoInfo] = useState([]);
    const [selectedRestoId, setSelectedRestoId] = useState(restoId);

    useEffect(() => {
        const fetchRestoOptions = async () => {
          try {
            const response = await axios.get(`
                http://localhost:8080/api/restos-venues/by-venue?venue_id=${venueId}&price_level=${priceChoice}`);
            setRestoOptions(response.data);
            console.log("Restaurant options by venue ID and price level: ", response.data); // remove this eventually
          } catch (error) {
            console.log("Error fetching restaurant options: ", error);
          }
        };
        if (venueId && priceChoice) {
          fetchRestoOptions();
        }
      }, [venueId, priceChoice]);

    useEffect(() => {
        const fetchRestoInfo = async () => {
            try {
                const promises = restoOptions.map(async (option) => {
                    const response = await axios.get(`
                        http://localhost:8080/api/restaurants/by-venue/${option.resto_id}`);
                    return response.data;
                });

                const restoInfoArray = await Promise.all(promises)
                setRestoInfo(restoInfoArray);
                console.log("Restaurant info from options: ", restoInfoArray); // remove this eventually
            } catch (error) {
                console.log("Error fetching restaurant info: ", error);
            }
        }
        if (restoOptions.length > 0) {
            fetchRestoInfo();
        }
    }, [restoOptions]);
    
    const handleRestoSelection = (restoId) => {
        console.log('Selected Resto ID: ', restoId);
        setSelectedRestoId(restoId);
        onSelect(restoId);
    };

    return (
        <section className='main'>
            <section className='restos__header-container'>
                <h2 className='restos__header'>Restaurant Options near {venueName}</h2>
                <h2 className='restos__subheader'>Please choose a restaurant</h2>
            </section>
            <section>
                {restoInfo.map((option) => {
                    const isSelected = option.resto_id === selectedRestoId;
                return (
                    <article
                        className={`resto-card ${isSelected ? 'selected' : ''}`}
                        key={option.resto_id}
                        onClick={() => handleRestoSelection(option.resto_id)}
                    >
                        <h3 className='resto-card__name'>{option.restaurant_name}</h3>
                        <p className='resto-card__info'>{option.address}</p>
                        <p className='resto-card__info'>
                            <span className='resto-card__info--bold'>Cuisine Type: &nbsp;&nbsp;</span> 
                            {option.cuisine}
                        </p>
                        <div className="resto-card__distance">
                            <h4 className="resto-card__card-header">
                                Distance to {venueName}
                            </h4>
                            <p className="resto-card__info">
                            {option.distance_venue} metres
                            </p>
                        </div>
                        <div className="resto-card__duration">
                            <h4 className="resto-card__card-header">
                                Estimated walking time to {venueName}
                            </h4>
                            <p className="resto-card__info">
                            {option.duration_venue} minutes
                            </p>
                        </div>
                        <Link className='resto-card__website' to={option.website} target='_blank'>
                            <h4 className='resto-card__info'>Visit Website</h4>
                        </Link>
                    </article>
                )
                })}
            </section>
        </section>
    )
};

export default Restaurants;