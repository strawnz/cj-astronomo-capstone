import './Restaurants.scss';
import { useState, useEffect } from "react";
import axios from "axios";

function Restaurants({ venueId, venueName, onSelect, priceChoice }) {
    console.log("Venue Id from Itinerary Form to Restaurants: ", venueId); // remove this eventually
    console.log("Price Choice from Itinerary Form to Restaurants: ", priceChoice); // remove this eventually
    const [restoOptions, setRestoOptions] = useState([]);
    const [restoInfo, setRestoInfo] = useState([]);
    const [selectedRestoId, setSelectedRestoId] = useState(null);

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
    
    return (
        <h1>Restaurants Component Placeholder</h1>
    )
};

export default Restaurants;