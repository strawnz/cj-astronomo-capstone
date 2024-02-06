import './CompletedItineraryPage.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function CompletedItineraryPage() {
    const [latestFormInfo, setLatestFormInfo] = useState([]);
    const [restoToVenueTime, setRestoToVenueTime] = useState(null);
    const [timeAtResto, setTimeAtResto] = useState(null);
    const [parkingToRestoTime, setParkingToRestoTime] = useState(null);
    const [findParkingTime, setFindParkingTime] = useState(null);
    const [parkingToVenueTime, setParkingToVenueTime] = useState(null);
    const [findParkingNoRestoTime, setFindParkingNoRestoTime] = useState(null);

    useEffect(() => {
        const fetchLatestFormInfo = async () => {
            try {
                const response = await axios.get(`
                http://localhost:8080/api/forms/last-updated`);
                console.log("Latest form info: ", response.data); // remove this eventually
                setLatestFormInfo(response.data);
            } catch (error) {
                console.log("Error fetching latest form info: ", error);
            }
        }
        fetchLatestFormInfo();
    }, []);

    const calculateTimeBackwards = (startTime, duration) => {
        // console.log("calculateTimeBackwards - startTime: ", startTime);
        const time = new Date(`2024-01-01T${startTime}`);
        // console.log("calculateTimeBackwards - time before adjustment: ", time);
        time.setMinutes(time.getMinutes() - duration);
        // console.log("calculateTimeBackwards - time after adjustment: ", time);
        return time.toLocaleTimeString('en-GB'); 
    }

    useEffect(() => {
        if (latestFormInfo && latestFormInfo.latest_form) {
            const calculateRestoToVenueTime = calculateTimeBackwards(
                latestFormInfo.latest_form.preferred_time,
                latestFormInfo.resto_venue_info.duration_venue
            );
            console.log("Time from Resto to Venue: ", calculateRestoToVenueTime); // remove this eventually
            setRestoToVenueTime(calculateRestoToVenueTime);
        }
    }, [latestFormInfo]); 
    
    useEffect(() => {
        console.log("Resto to Venue Time in useEffect: ", restoToVenueTime);
        if (restoToVenueTime) {
            const calculateTimeAtResto = calculateTimeBackwards(
                restoToVenueTime, 90);
            console.log("Time at Resto: ", calculateTimeAtResto);
            setTimeAtResto(calculateTimeAtResto);
        }
    }, [restoToVenueTime]); 

    useEffect(() => {
        console.log("Time spent at Resto in useEffect: ", timeAtResto);
        if (timeAtResto) {
            const calculateParkingToRestoTime = calculateTimeBackwards(
                timeAtResto, latestFormInfo.parking_resto_info.duration_resto
            );
            console.log("Time from Parking to Resto: ", calculateParkingToRestoTime);
            setParkingToRestoTime(calculateParkingToRestoTime);
        }
    }, [timeAtResto]);

    useEffect(() => {
        console.log("Parking to Resto Time in useEffect: ", parkingToRestoTime);
        if (parkingToRestoTime) {
            const calculateFindParkingTime = calculateTimeBackwards(
                parkingToRestoTime, 5
            );
            console.log("Time to Find Parking: ", calculateFindParkingTime);
            setFindParkingTime(calculateFindParkingTime);
        }
    }, [parkingToRestoTime]);

    useEffect(() => {
        if (latestFormInfo && latestFormInfo.latest_form) {
            const calculateParkingToVenueTime = calculateTimeBackwards(
                latestFormInfo.latest_form.preferred_time,
                latestFormInfo.parking_info.duration_venue
            );
            console.log("Time from Parking to Venue: ", calculateParkingToVenueTime); // remove this eventually
            setParkingToVenueTime(calculateParkingToVenueTime);
        }
    }, [latestFormInfo])

    useEffect(() => {
        console.log("Parking to Venue Time in useEffect: ", parkingToVenueTime);
        if (parkingToVenueTime) {
            const calculateFindParkingNoRestoTime = calculateTimeBackwards(
                parkingToVenueTime, 5
            );
            console.log("Time to Find Parking (no resto): ", calculateFindParkingNoRestoTime);
            setFindParkingNoRestoTime(calculateFindParkingNoRestoTime);
        }
    }, [parkingToVenueTime]);

    const formatTime = (timeString) => {
        const time = new Date(`2024-01-01T${timeString}`);
        return time.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit', hour12: true });
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: 'numeric' });
    }

    if (!latestFormInfo || !latestFormInfo.latest_form) {
        return <div>Loading...</div>;
    }

        const eventDate = latestFormInfo.latest_form.event_date;
        const parkingAddress = latestFormInfo.parking_info.address;
        const restoName = latestFormInfo.resto_info.restaurant_name;
        const restoAddress = latestFormInfo.resto_info.address;
        const restoDuration = latestFormInfo.parking_resto_info.duration_resto;
        const venueName = latestFormInfo.venue_info.venue_name;
        const venueAddress = latestFormInfo.venue_info.address;
        const venueDurationFromResto = latestFormInfo.resto_venue_info.duration_venue;
        const venueDurationFromParking = latestFormInfo.parking_info.duration_venue;
        const venueImage = `http://localhost:8080${latestFormInfo.venue_info.image_path}`;
        const preferredTime = latestFormInfo.latest_form.preferred_time;
        const formId = latestFormInfo.latest_form.id;
        const optionalParking = latestFormInfo.latest_form.option_parking;
        const optionalRestaurant = latestFormInfo.latest_form.option_restaurant;

        console.log('optional Restaurant', optionalRestaurant);

    return (
        <main className='main'>
            <section className='completed__header-container'>
                <h1 className='completed__header'>Your Pre-Event Planner is Ready!</h1>
                <h2 className='completed__subheader'>
                    Here is a personalized itinerary for your event on {formatDate(eventDate)} that we've tailored just for you
                </h2>
            </section>
            <section className='completed__itinerary-container'>
                {optionalParking !== "no" && optionalRestaurant !== "no" && (
                <>
                <article className='itin__pit-stop'>
                    <div className='itin__dest-point'></div>
                    <div className='itin__content'>
                        <h3 className='itin__header'>{formatTime(findParkingTime)}</h3>
                        <h4 className='itin__subheader'>Arrive at parking lot and find parking</h4>
                        <p className='itin__info'>{parkingAddress}</p>
                    </div>
                </article>
                <article className='itin__pit-stop'>
                    <div className='itin__dest-point'></div>
                    <div className='itin__content'>
                        <h3 className='itin__header'>{formatTime(parkingToRestoTime)}</h3>
                        <h4 className='itin__subheader'>Walk to {restoName}</h4>
                        <p className='itin__info'>{restoAddress}</p>
                        <p className='itin__info--sm'>Approximately {restoDuration} minutes</p>
                    </div>
                </article>
                </>
                )}
                {optionalRestaurant !== "no" && (
                <>
                <article className='itin__pit-stop'>
                    <div className='itin__dest-point'></div>
                    <div className='itin__content'>
                        <h3 className='itin__header'>{formatTime(timeAtResto)}</h3>
                        <h4 className='itin__subheader'>Arrive at {restoName} and eat a delicious meal</h4>
                        <p className='itin__info--sm'>
                            Please note that we've allocated 90 minutes for this activity
                        </p>
                    </div>
                </article>
                <article className='itin__pit-stop'>
                    <div className='itin__dest-point'></div>
                    <div className='itin__content'>
                        <h3 className='itin__header'>{formatTime(restoToVenueTime)}</h3>
                        <h4 className='itin__subheader'>Walk to {venueName}</h4>
                        <p className='itin__info'>{venueAddress}</p>
                        <p className='itin__info--sm'>Approximately {venueDurationFromResto} minutes</p>
                    </div>
                </article>
                </>
                )}
                {optionalParking !== "no" && optionalRestaurant === "no" && (
                    <>
                    <article className='itin__pit-stop'>
                        <div className='itin__dest-point'></div>
                        <div className='itin__content'>
                            <h3 className='itin__header'>{formatTime(findParkingNoRestoTime)}</h3>
                            <h4 className='itin__subheader'>Arrive at parking lot and find parking</h4>
                            <p className='itin__info'>{parkingAddress}</p>
                        </div>
                    </article>
                    <article className='itin__pit-stop'>
                    <div className='itin__dest-point'></div>
                    <div className='itin__content'>
                        <h3 className='itin__header'>{formatTime(parkingToVenueTime)}</h3>
                        <h4 className='itin__subheader'>Walk to {venueName}</h4>
                        <p className='itin__info'>{venueAddress}</p>
                        <p className='itin__info--sm'>Approximately {venueDurationFromParking} minutes</p>
                    </div>
                </article>
                    </>
                )}
                <article className='itin__final-dest'>
                    <div className='itin__dest-point--final'></div>
                    <div className='itin__content'>
                        <h3 className='itin__header'>{formatTime(preferredTime)}</h3>
                        <h3 className='itin__subheader'>Arrive at {venueName}</h3>
                        <img src={venueImage} className='itin__image' alt={venueName}/>
                        <h3 className='itin__header--final'>Have a great time at your event!</h3>
                    </div>
                </article>
            </section>
            <section className='completed__buttons'>
                <Link to={`/form/${formId}`} className='completed__back'>Change Form</Link>
                <Link to='/' className='completed__home'>Home Page</Link>
            </section>
        </main>
    )
};

export default CompletedItineraryPage;