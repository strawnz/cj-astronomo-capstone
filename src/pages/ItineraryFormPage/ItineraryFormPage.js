import './ItineraryFormPage.scss';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function ItineraryFormPage() {
    const [venue, setVenue] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('12:00');
    const [parkingChoice, setParkingChoice] = useState('');
    const [eatChoice, setEatChoice] = useState('');
    const [priceChoice, setPriceChoice] = useState('');

    const toParking = useNavigate();
    const toRestaurants = useNavigate();

    const changeVenue = (event) => {
        setVenue(event.target.value);
    };
    const changeDate = (date) => {
        setStartDate(date);
    };
    const changeTime = (time) => {
        setTime(time);
    };
    const changeParking = (event) => {
        setParkingChoice(event.target.value);
    };
    const changeEat = (event) => {
        setEatChoice(event.target.value);
    };
    const changePrice = (event) => {
        setPriceChoice(event.target.value);
    };

    const postNewForm = async (newForm) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/forms",
                newForm
                );
                console.log(response.data); // remove this eventually
                return response;
        } catch (error) {
            console.log("Error posting form: ", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formattedDate = startDate.toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

            const formattedTime = startDate.toLocaleTimeString('en-CA', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });

            const formattedDateTime = `${formattedDate} ${formattedTime}`;

            const newFormData = {
                venue_name: venue,
                event_date: formattedDateTime,
                preferred_time: time,
                option_parking: parkingChoice,
                option_restaurant: eatChoice,
                option_price: priceChoice,
            }
            await postNewForm(newFormData);

            const venueIdResponse = await axios.get(`
                http://localhost:8080/api/venues/${venue}`);
            const venueId = venueIdResponse.data.id;

            if (parkingChoice === 'yes') {
                toParking(`/parking?venueId=${venueId}&venueName=${encodeURIComponent(venue)}`);
            } else {
                toRestaurants(`/restaurants?venueId=${venueId}`);
            };

        } catch (error) {
            console.log("Form submission error: ", error);
        }
    };

    return (
        <main className='main'>
            <section className='form__header-container'>
                <h1 className='form__header'>Let's Start Planning Your Event Journey</h1>
                <h2 className='form__subheader'>
                    Please answer the questions below
                </h2>
            </section>
            <section className='form__container'>
                <form onSubmit={handleSubmit}> 
                    <article className='form__venue-container'>
                        <div>
                            <label>
                                Where is your event taking place?
                            </label>
                        </div>     
                        <div>
                            <select
                                onChange={changeVenue}
                                defaultValue=''
                                name='venue-list' 
                                id='venue-list'
                                className='venue-list__drop-down'
                            >
                                <option value='' disabled>
                                    Please select a venue
                                </option>
                                <option value='BMO Field'>BMO Field</option>
                                <option value='Budweiser Stage'>Budweiser Stage</option>
                                <option value='Four Seasons Centre'>Four Seasons Centre for the Performing Arts</option>
                                <option value='Massey Hall'>Massey Hall</option>
                                <option value='Meridian Hall'>Meridian Hall</option>
                                <option value='Princess of Wales Theatre'>Princess of Wales Theatre</option>
                                <option value='Rogers Centre'>Rogers Centre</option>
                                <option value='Roy Thomson Hall'>Roy Thomson Hall</option>
                                <option value='Scotiabank Arena'>Scotiabank Arena</option>
                                <option value='Elgin Winter Garden'>The Elgin & Winter Garden Theatre Centre</option>
                            </select>
                        </div>                   
                    </article>
                    <article className='date-picker__container'>
                        <div>
                            <label>
                                What is the date of your event?
                            </label>
                        </div> 
                        <div className='date-picker__widget-container'>
                            <DatePicker 
                                className='date-picker__widget'
                                defaultValue={startDate}
                                selected={startDate}
                                onChange={changeDate}
                            />
                        </div>
                    </article>
                    <article className='time-picker__container'>
                        <div>
                            <label>
                                What is your preferred time to arrive at the venue?
                            </label>
                        </div>
                        <div className='time-picker__widget-container'>
                            <TimePicker 
                                className='time-picker__widget'
                                value={time}
                                onChange={changeTime}
                                clockIcon={null}
                                hourPlaceholder='hh'
                                minutePlaceholder='mm'
                                format='h:mm a'
                                disableClock={true}
                            />
                        </div>
                    </article>
                    <article className='radio-group__parking-container'>
                        <div>
                            <p>Would you like to park near the venue?</p>
                        </div>
                        <div>
                            <label>
                            <input
                                onChange={changeParking}
                                className='radio-group__parking-yes'
                                type='radio'
                                id='yes'
                                value='yes'
                                name='parking-choice'
                            />
                            Yes
                            </label>
                            <label>
                            <input
                                onChange={changeParking}
                                className='radio-group__parking-no'
                                type='radio'
                                id='no'
                                value='no'
                                name='parking-choice'
                            />
                            No
                            </label>
                        </div>
                    </article>
                    <article className='radio-group__restaurant-container'>
                        <div>
                            <p>Would you like to eat near the venue?</p>
                        </div>
                        <div>
                            <label>
                            <input
                                className='radio-group__resto-yes'
                                type='radio'
                                id='yes'
                                value='yes'
                                name='resto-choice'
                                onChange={changeEat}
                            />
                            Yes
                            </label>
                            <label>
                            <input
                                className='radio-group__resto-no'
                                type='radio'
                                id='no'
                                value='no'
                                name='resto-choice'
                                onChange={changeEat}
                            />
                            No
                            </label>
                        </div>
                    </article>
                    {eatChoice === 'yes' && (
                        <article className='radio-group__price-container'>
                            <div>
                                <p>What is your preferred price range for eating at a restaurant?</p>
                            </div>
                            <div>
                                <label>
                                <input
                                    className='radio-group__price-1'
                                    type='radio'
                                    id='price-1'
                                    value='$'
                                    name='price-choice'
                                    onChange={changePrice}
                                />
                                $
                                </label>
                                <label>
                                <input
                                    className='radio-group__price-2'
                                    type='radio'
                                    id='price-2'
                                    value='$$'
                                    name='price-choice'
                                    onChange={changePrice}
                                />
                                $$
                                </label>
                                <label>
                                <input
                                    className='radio-group__price-3'
                                    type='radio'
                                    id='price-3'
                                    value='$$$'
                                    name='price-choice'
                                    onChange={changePrice}
                                />
                                $$$
                                </label>
                            </div>
                        </article>
                    )}
                    <div>
                        <button type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
};

export default ItineraryFormPage;