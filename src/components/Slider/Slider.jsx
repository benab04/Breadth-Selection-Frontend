import React, { useState } from "react";
import "./Slider.css"; // Import your CSS file
import { options } from "../../assets/data/dropdown";
import LineGraphModal from "../LineGraph/Linegraph";
import { Button } from "react-bootstrap";
import Preloader from "../Preloader/Preloader";

const SliderComponent = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [preferenceValues, setPreferenceValues] = useState({});
  const [usePreferences, setUsePreferences] = useState(false);
  const [response, setResponse] = useState(null);
  const [details_response, setDetails] = useState(null);
  const [typedPreference, setTypedPreference] = useState("");
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [course, setCourse] = useState(null);
  const [received, setReceived] = useState(true);

  const handlePreferenceChange = (e) => {
    const selectedPref = e.target.value;
    addPreference(selectedPref);
  };

  const handleSliderChange = (e, preference) => {
    const updatedPrefValues = { ...preferenceValues };
    updatedPrefValues[preference] = parseInt(e.target.value);
    setPreferenceValues(updatedPrefValues);
  };

  const handleRemovePreference = (preference) => {
    setSelectedPreferences(
      selectedPreferences.filter((pref) => pref !== preference)
    );
    setPreferenceValues((prevState) => {
      const updatedValues = { ...prevState };
      delete updatedValues[preference];
      return updatedValues;
    });
  };

  const handleSubmit = () => {
    setReceived(false);
    const formData = new FormData();
    selectedPreferences.forEach((pref) => {
      formData.append(
        pref,
        usePreferences ? preferenceValues[pref] / 100 : 1.0
      );
    });

    fetch(base_url + "preferences/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setResponse(responseData);
        setReceived(true);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const addPreference = (preference) => {
    if (preference && !selectedPreferences.includes(preference)) {
      setSelectedPreferences([...selectedPreferences, preference]);
      setPreferenceValues((prevState) => ({
        ...prevState,
        [preference]: 100, // Set default value to 100%
      }));
      setTypedPreference("");
    }
  };

  const handleTypedPreferenceSubmit = (e) => {
    e.preventDefault();
    addPreference(typedPreference);
  };
  function handleDetails(e, f) {
    const formData = new FormData();
    formData.append("Course", e);
    setCourse(f);
    fetch(base_url + "analytics/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setDetails(responseData);
        setShowModal(true); // Open modal after details_response has been updated
      })
      .catch((error) => {
        console.error("Error getting response:", error);
        alert("Error getting response:", error);
      });
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const renderSliders = () => {
    const sliders = selectedPreferences.map((pref, index) => (
      <div className=" col-12 col-sm-6 col-md-4 mb-3" key={pref}>
        <div className="mb-3">
          <label htmlFor={`preferenceSlider-${pref}`} className="form-label">
            {pref}
          </label>
          <input
            type="range"
            className="form-range red-slider" // Add red-slider class
            id={`preferenceSlider-${pref}`}
            min="0"
            max="100"
            value={preferenceValues[pref]}
            onChange={(e) => handleSliderChange(e, pref)}
          />
          <p>{preferenceValues[pref]}%</p>
        </div>
      </div>
    ));

    const rows = [];
    for (let i = 0; i < sliders.length; i += 3) {
      rows.push(
        <div className="row" key={i}>
          {sliders.slice(i, i + 3)}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="data-section">
      <div className="container my-5 shadow-effect">
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="preferenceSelect" className="form-label">
              Select Preferences:
            </label>
            <select
              className="form-select"
              id="preferenceSelect"
              onChange={handlePreferenceChange}
            >
              <option value="">Select...</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleTypedPreferenceSubmit}>
              <label htmlFor="typedPreferenceInput" className="form-label">
                Additional Preferences:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="typedPreferenceInput"
                  value={typedPreference}
                  onChange={(e) => setTypedPreference(e.target.value)}
                />
                <button type="submit" className="btn btn-danger">
                  {" "}
                  {/* Change button color to red */}
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        {selectedPreferences.length > 0 && (
          <div className="mb-3">
            <p>Selected Subject Preferences:</p>
            <div className="d-flex flex-wrap">
              {selectedPreferences.map((pref) => (
                <div className="preference-box" key={pref}>
                  {pref}
                  <button
                    className="btn-close "
                    onClick={() => handleRemovePreference(pref)}
                  ></button>
                </div>
              ))}
            </div>
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="usePreferencesCheckbox"
                checked={usePreferences}
                onChange={() => setUsePreferences(!usePreferences)}
              />
              <label
                className="form-check-label"
                htmlFor="usePreferencesCheckbox"
              >
                Change importance to preferences
              </label>
            </div>
          </div>
        )}
        {usePreferences && (
          <div className="mb-3">
            {/* <p>Selected Preferences:</p> */}
            {renderSliders()}
          </div>
        )}
        <button
          className="btn btn-danger" // Change button color to red
          onClick={handleSubmit}
          disabled={selectedPreferences.length === 0}
        >
          Submit
        </button>
        {!received && (
          <div>
            <Preloader isFull={false} color={"gray"} />
          </div>
        )}
        {response && received && (
          <div className="mt-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p>Response from server:</p>
                </div>
                <div className="col-auto">
                  <div className="form-group text-end">
                    <label htmlFor="limitSelect" className="form-label">
                      Limit Rows:
                    </label>
                    <select
                      className="form-select"
                      id="limitSelect"
                      value={limit}
                      onChange={(e) => setLimit(parseInt(e.target.value))}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <h2 className="my-2">Recommended Courses</h2>
              <div className="row">
                <div className="col table-responsive">
                  <table className="table table-striped my-2">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Final Score</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {response.slice(0, limit).map((course, index) => (
                        <tr key={index}>
                          <td>{course.course}</td>
                          <td>{course.final_score}</td>
                          <td>
                            <button
                              className="details-btn"
                              onClick={() => {
                                handleDetails(course.course, course);
                              }}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {showModal && details_response && (
          <LineGraphModal
            showModal={showModal}
            data={details_response}
            course={course}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};
export default SliderComponent;
