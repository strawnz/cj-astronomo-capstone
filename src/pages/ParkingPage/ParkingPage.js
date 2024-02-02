import './ParkingPage.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ParkingPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const venueId = searchParams.get('venueId');
    const [parkingOptions, setParkingOptions] = useState([]);

    useEffect(() => {
        const fetchParkingOptions = async () => {
            try {
                const response = await axios.get(`
                http://localhost:8080/api/parking/by-venue?venue_id=${venueId}`);
                setParkingOptions(response.data);
            } catch (error) {
                console.log("Error fetching parking options: ", error);
            }
        };
        if (venueId) {
            fetchParkingOptions();
        }
    }, [venueId]);

    return (
        <h1>Parking Page Placeholder</h1>
    )
};

export default ParkingPage;