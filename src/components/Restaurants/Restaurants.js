import './Restaurants.scss';
import { useState, useEffect } from "react";
import axios from "axios";

function Restaurants({ venueId, venueName, onSelect, priceChoice }) {
    console.log("Venue Id from Itinerary Form to Restaurants: ", venueId); // remove this eventually
    console.log("Price Choice from Itinerary Form to Restaurants: ", priceChoice); // remove this eventually
    const [restoOptions, setRestoOptions] = useState([]);
    const [restoOptionsByPrice, setRestoOptionsByPrice] = useState([]);
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
    
    return (
        <h1>Restaurants Component Placeholder</h1>
    )
};

export default Restaurants;