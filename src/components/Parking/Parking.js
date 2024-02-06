import "./Parking.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function Parking({ venueId, venueName, onSelect, parkingId }) {
  const [parkingOptions, setParkingOptions] = useState([]);
  const [selectedParkingId, setSelectedParkingId] = useState(parkingId);

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

  const handleParkingSelection = (parkingId) => {
    setSelectedParkingId(parkingId);
    onSelect(parkingId);
  };

  return (
    <section className="main">
      <section className="parking__header-container">
        <h2 className="parking__header">Parking Options near {venueName}</h2>
        <h2 className="parking__subheader">Please choose a parking lot</h2>
      </section>
      <section className="parking__card-container">
        {parkingOptions.map((parking) => {
            const isSelected = parking.id === selectedParkingId; 
          return (
            <article
              className={`park-card ${isSelected ? 'selected' : ''}`}
              key={parking.id}
              onClick={() => handleParkingSelection(parking.id)}
            >
              <h3 className="park-card__address">{parking.address}</h3>
              <div className="park-card__distance">
                <h4 className="park-card__card-header">
                  Distance to {venueName}
                </h4>
                <p className="park-card__info">
                  {parking.distance_venue} metres
                </p>
              </div>
              <div className="park-card__duration">
                <h4 className="park-card__card-header">
                  Estimated walking time to {venueName}
                </h4>
                <p className="park-card__info">
                  {parking.duration_venue} minutes
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}

export default Parking;
