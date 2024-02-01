import './ItineraryFormPage.scss';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ItineraryFormPage() {
    const [startDate, setStartDate] = useState(new Date());

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
                </form>
            </section>
        </main>
    )
};

export default ItineraryFormPage;