import "./ItineraryFormPage.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Parking from "../../components/Parking/Parking";
import Restaurants from "../../components/Restaurants/Restaurants";

function ItineraryFormPage() {
  const [form, setForm] = useState({});
  const [venueName, setVenueName] = useState("");
  const [venueId, setVenueId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [parkingChoice, setParkingChoice] = useState("");
  const [parkingId, setParkingId] = useState(1);
  const [eatChoice, setEatChoice] = useState("");
  const [priceChoice, setPriceChoice] = useState("");
  const [restoId, setRestoId] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formId, setFormId] = useState("");

  const toCompletedItinerary = useNavigate();

  const params = useParams();
  const storedFormId = params.formId;

  useEffect(() => {
    const storedForm = async () => {
      try {
        const fetchStoredForm = await axios.get(`
                http://localhost:8080/api/forms/${storedFormId}`);
        setForm(fetchStoredForm);
        setVenueName(fetchStoredForm.data.venue_name);
        setStartDate(new Date(fetchStoredForm.data.event_date));
        setTime(fetchStoredForm.data.preferred_time);
        setParkingChoice(fetchStoredForm.data.option_parking);
        setParkingId(fetchStoredForm.data.parking_id);
        setEatChoice(fetchStoredForm.data.option_restaurant);
        setPriceChoice(fetchStoredForm.data.option_price);
        setRestoId(fetchStoredForm.data.resto_id);
      } catch (error) {
        console.log("Error fetching stored form: ", error);
      }
    };
    if (storedFormId) {
      storedForm();
    }
  }, [storedFormId]);

  const changeVenueName = (event) => {
    const selectedVenueName = event.target.value;
    setVenueName(selectedVenueName);

    setForm((form) => ({
      ...form,
      venue_name: selectedVenueName,
    }));
  };

  useEffect(() => {
    const fetchVenueId = async () => {
      try {
        const venueIdResponse = await axios.get(`
                http://localhost:8080/api/venues/name/${venueName}`);
        setVenueId(venueIdResponse.data.id);
      } catch (error) {
        console.log("Unable to retrieve venue Id: ", error);
      }
    };
    if (!venueId && venueName) {
      fetchVenueId();
    }
  }, [venueName, venueId]);

  const changeDate = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const formattedTime = date.toLocaleTimeString("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    setForm((form) => ({
      ...form,
      event_date: formattedDateTime,
    }));
    setStartDate(date);
  };
  const changeTime = (time) => {
    setForm((form) => ({
      ...form,
      preferred_time: time,
    }));
    setTime(time);
  };
  const changeParking = (event) => {
    setForm((form) => ({
      ...form,
      option_parking: event.target.value,
    }));
    setParkingChoice(event.target.value);
  };
  const changeEat = (event) => {
    setForm((form) => ({
      ...form,
      option_restaurant: event.target.value,
    }));
    setEatChoice(event.target.value);
  };
  const changePrice = (event) => {
    setForm((form) => ({
      ...form,
      option_price: event.target.value,
    }));
    setPriceChoice(event.target.value);
  };

  const handleParkingSelection = async (parkingChoice, selectedParkingId) => {
    setForm((form) => ({
      ...form,
      option_parking: parkingChoice,
    }));
    setParkingId(selectedParkingId);
  };

  const handleRestoSelection = async (priceChoice, selectedRestoId) => {
    setForm((form) => ({
      ...form,
      option_price: priceChoice,
    }));
    setRestoId(selectedRestoId);
  };

  const postNewForm = async (newForm) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/forms",
        newForm
      );
      return response;
    } catch (error) {
      console.log("Error posting form: ", error);
    }
  };

  const updateLastForm = async (updatedForm) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/forms/${storedFormId}`,
        updatedForm
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.log("Error updating form: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedForm = {
        ...form,
        parking_id: parkingId,
        resto_id: restoId,
        venue_id: venueId,
      };

      if (storedFormId) {
        await updateLastForm(updatedForm);
      } else {
        await postNewForm(updatedForm);
      }

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        toCompletedItinerary("/completed");
      }, 3000);
    } catch (error) {
      console.log("Form submission error: ", error);
    }
  };

  return (
    <main className="main">
      <section className="form__header-container">
        <h1 className="form__header">
          Let's Start Planning Your Event Journey
        </h1>
        <h2 className="form__subheader">Please answer the questions below</h2>
      </section>
      <section className="form__container">
        <form onSubmit={handleSubmit}>
          <article className="form__venue-container">
            <div>
              <label>Where is your event taking place?</label>
            </div>
            <div>
              <select
                onChange={changeVenueName}
                value={venueName}
                name="venue-list"
                id="venue-list"
                className="venue-list__drop-down"
              >
                {!venueName && (
                  <option
                    value=""
                    className="venue-list__drop-down-option"
                    disabled
                  >
                    Please select a venue
                  </option>
                )}
                <option
                  value="BMO Field"
                  className="venue-list__drop-down-option"
                >
                  BMO Field
                </option>
                <option
                  value="Budweiser Stage"
                  className="venue-list__drop-down-option"
                >
                  Budweiser Stage
                </option>
                <option
                  value="Four Seasons Centre"
                  className="venue-list__drop-down-option"
                >
                  Four Seasons Centre for the Performing Arts
                </option>
                <option
                  value="Massey Hall"
                  className="venue-list__drop-down-option"
                >
                  Massey Hall
                </option>
                <option
                  value="Meridian Hall"
                  className="venue-list__drop-down-option"
                >
                  Meridian Hall
                </option>
                <option
                  value="Princess of Wales Theatre"
                  className="venue-list__drop-down-option"
                >
                  Princess of Wales Theatre
                </option>
                <option
                  value="Rogers Centre"
                  className="venue-list__drop-down-option"
                >
                  Rogers Centre
                </option>
                <option
                  value="Roy Thomson Hall"
                  className="venue-list__drop-down-option"
                >
                  Roy Thomson Hall
                </option>
                <option
                  value="Scotiabank Arena"
                  className="venue-list__drop-down-option"
                >
                  Scotiabank Arena
                </option>
                <option
                  value="Elgin Winter Garden"
                  className="venue-list__drop-down-option"
                >
                  The Elgin & Winter Garden Theatre Centre
                </option>
              </select>
            </div>
          </article>
          <article className="date-picker__container">
            <div>
              <label>What is the date of your event?</label>
            </div>
            <div className="date-picker__widget-container">
              <DatePicker
                className="date-picker__widget"
                defaultValue={startDate}
                selected={startDate}
                onChange={changeDate}
              />
            </div>
          </article>
          <article className="time-picker__container">
            <div>
              <label>What is your preferred time to arrive at the venue?</label>
            </div>
            <div className="time-picker__widget-container">
              <TimePicker
                className="time-picker__widget"
                value={time}
                onChange={changeTime}
                clockIcon={null}
                hourPlaceholder="hh"
                minutePlaceholder="mm"
                format="h:mm a"
                disableClock={true}
              />
            </div>
          </article>
          <article className="radio-group__parking-container">
            <div>
              <p>Would you like to park near the venue?</p>
            </div>
            <div className="radio-group__two-options">
              <label>
                <input
                  onChange={changeParking}
                  className="radio-group__parking-yes"
                  type="radio"
                  id="yes"
                  value="yes"
                  name="parking-choice"
                  checked={parkingChoice === "yes" ? true : false}
                />
                Yes
              </label>
              <label>
                <input
                  onChange={changeParking}
                  className="radio-group__parking-no"
                  type="radio"
                  id="no"
                  value="no"
                  name="parking-choice"
                  checked={parkingChoice === "no" ? true : false}
                />
                No
              </label>
            </div>
          </article>
          {parkingChoice === "yes" && (
            <Parking
              onSelect={(selectedParkingId) =>
                handleParkingSelection("yes", selectedParkingId)
              }
              venueId={venueId}
              venueName={venueName}
              parkingId={parkingId}
            />
          )}
          <article className="radio-group__restaurant-container">
            <div>
              <p>Would you like to eat near the venue?</p>
            </div>
            <div className="radio-group__two-options">
              <label>
                <input
                  className="radio-group__resto-yes"
                  type="radio"
                  id="yes"
                  value="yes"
                  name="resto-choice"
                  onChange={changeEat}
                  checked={eatChoice === "yes" ? true : false}
                />
                Yes
              </label>
              <label>
                <input
                  className="radio-group__resto-no"
                  type="radio"
                  id="no"
                  value="no"
                  name="resto-choice"
                  onChange={changeEat}
                  checked={eatChoice === "no" ? true : false}
                />
                No
              </label>
            </div>
          </article>
          {eatChoice === "yes" && (
            <article className="radio-group__price-container">
              <div>
                <p>
                  What is your preferred price range for eating at a restaurant?
                </p>
              </div>
              <div className="radio-group__three-options">
                <label>
                  <input
                    className="radio-group__price-1"
                    type="radio"
                    id="price-1"
                    value="$"
                    name="price-choice"
                    onChange={changePrice}
                    checked={priceChoice === "$" ? true : false}
                  />
                  $
                </label>
                <label>
                  <input
                    className="radio-group__price-2"
                    type="radio"
                    id="price-2"
                    value="$$"
                    name="price-choice"
                    onChange={changePrice}
                    checked={priceChoice === "$$" ? true : false}
                  />
                  $$
                </label>
                <label>
                  <input
                    className="radio-group__price-3"
                    type="radio"
                    id="price-3"
                    value="$$$"
                    name="price-choice"
                    onChange={changePrice}
                    checked={priceChoice === "$$$" ? true : false}
                  />
                  $$$
                </label>
              </div>
            </article>
          )}
          {(priceChoice === "$" ||
            priceChoice === "$$" ||
            priceChoice === "$$$") && (
            <Restaurants
              onSelect={(selectedRestoId) =>
                handleRestoSelection(priceChoice, selectedRestoId)
              }
              venueId={venueId}
              venueName={venueName}
              priceChoice={priceChoice}
              restoId={restoId}
            />
          )}
          {showSuccessMessage && (
            <div className="form__success">
              <p className="form__success-copy">Thank you for submitting your answers!</p> 
              <p className="form__success-copy">Your Pre-Event Planner will be ready momentarily.</p>
            </div>
          )}
          <div className="form__button-container">
            <button type="submit" className="form__submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ItineraryFormPage;
