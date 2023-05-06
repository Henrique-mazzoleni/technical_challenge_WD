import { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function PhoneDetails({ phoneId, onClearPhone }) {
  const [phone, setPhone] = useState(null);
  useEffect(() => {
    const getPhoneDetails = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/phones/${phoneId}`
      );
      setPhone(response.data);
    };
    const loadingPhone = setTimeout(getPhoneDetails, 700);
    return () => clearTimeout(loadingPhone)
  }, [phoneId]);
  return (
    <Fragment>
      {phone ? (
        <Fragment>
          <img src={`/images/${phone.imageFileName}`} alt={phone.name} />
          <h2>{phone.name}</h2>
          <h4>Manufacturer: {phone.manufacturer}</h4>
          <p>{phone.description}</p>
          <p>Price: € {phone.price}</p>
          <p>Screen: {phone.screen}</p>
          <p>Processor: {phone.processor}</p>
        </Fragment>
      ) : (
        <div id="loader"></div>
      )}
      <button onClick={onClearPhone}>Back to phone list</button>
    </Fragment>
  );
}

PhoneDetails.propTypes = {
  phoneId: PropTypes.number.isRequired,
  onClearPhone: PropTypes.func.isRequired,
};
