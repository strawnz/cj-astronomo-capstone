import './ItineraryFormPage.scss';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

function ItineraryFormPage() {
    const [startDate, setStartDate] = useState(new Date());
    const [time, setTime] = useState('12:00');
    const [parkingChoice, setParkingChoice] = useState('');
    const [eatChoice, setEatChoice] = useState('');

    return (
        <main className='main'>
            <section className='form__header-container'>
                <h1 className='form__header'>Let's Start Planning Your Event Journey</h1>
                <h2 className='form__subheader'>
                    Please answer the questions below
                </h2>
            </section>
            <section className='form__container'>
                <form>
                    <article className='form__venue-container'>
                        <div>
                            <label>
                                Where is your event taking place?
                            </label>
                        </div>     
                        <div>
                            <select name='venue-list' id='venue-list'
                            className='venue-list__drop-down'>
                                <option value='' disabled selected>
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
                                onChange={date => setStartDate(date)}
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
                                onChange={setTime}
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
                                className='radio-group__parking-yes'
                                type='radio'
                                id='yes'
                                name='parking-choice'
                            />
                            Yes
                            </label>
                            <label>
                            <input
                                className='radio-group__parking-no'
                                type='radio'
                                id='no'
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
                                name='resto-choice'
                                onChange={() => setEatChoice('yes')}
                            />
                            Yes
                            </label>
                            <label>
                            <input
                                className='radio-group__resto-no'
                                type='radio'
                                id='no'
                                name='resto-choice'
                                onChange={() => setEatChoice('no')}
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
                                    name='price-choice'
                                />
                                $
                                </label>
                                <label>
                                <input
                                    className='radio-group__price-2'
                                    type='radio'
                                    id='price-2'
                                    name='price-choice'
                                />
                                $$
                                </label>
                                <label>
                                <input
                                    className='radio-group__price-3'
                                    type='radio'
                                    id='price-3'
                                    name='price-choice'
                                />
                                $$$
                                </label>
                            </div>
                        </article>
                    )}
                    <div>
                        <button>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
};

export default ItineraryFormPage;