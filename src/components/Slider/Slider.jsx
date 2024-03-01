import React, { useState } from "react";

const SliderComponent = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [preferenceValues, setPreferenceValues] = useState({});
  const [usePreferences, setUsePreferences] = useState(false);
  const [response, setResponse] = useState(null);

  const handlePreferenceChange = (e) => {
    const selectedPref = e.target.value;
    if (!selectedPreferences.includes(selectedPref)) {
      const updatedPrefs = [...selectedPreferences, selectedPref];
      setSelectedPreferences(updatedPrefs);
      setPreferenceValues((prevState) => ({
        ...prevState,
        [selectedPref]: 50, // Set default value to 50%
      }));
    }
  };

  const handleSliderChange = (e, preference) => {
    const updatedPrefValues = { ...preferenceValues };
    updatedPrefValues[preference] = parseInt(e.target.value);
    setPreferenceValues(updatedPrefValues);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    selectedPreferences.forEach((pref) => {
      formData.append(
        pref,
        usePreferences ? preferenceValues[pref] / 100 : 0.5
      );
    });

    fetch("http://127.0.0.1:8000/preferences/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setResponse(responseData);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="preferenceSelect" className="form-label">
          Select Preferences:
        </label>
        <select
          className="form-select"
          id="preferenceSelect"
          onChange={handlePreferenceChange}
        >
          <option value="">Select...</option>
          <option value="Aerodynamics">Aerodynamics</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Language">Language</option>
        </select>
      </div>
      {selectedPreferences.length > 0 && (
        <div className="mb-3">
          <p>Selected Preferences: {selectedPreferences.join(", ")}</p>
          <div className="form-check">
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
      {usePreferences &&
        selectedPreferences.map((pref) => (
          <div className="mb-3" key={pref}>
            <label htmlFor={`preferenceSlider-${pref}`} className="form-label">
              {pref}
            </label>
            <input
              type="range"
              className="form-range"
              id={`preferenceSlider-${pref}`}
              min="0"
              max="100"
              value={preferenceValues[pref]}
              onChange={(e) => handleSliderChange(e, pref)}
            />
            <p>{preferenceValues[pref]}%</p>
          </div>
        ))}
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={selectedPreferences.length === 0}
      >
        Submit
      </button>
      {response && (
        <div className="mt-3">
          <p>Response from server:</p>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SliderComponent;
