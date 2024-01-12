import React from "react";
import { useState } from "react";

const FilterForm = () => {
  const [bpm, setBpm] = useState(120);
  const [selectedKey, setSelectedKey] = useState("");
  const [scale, setScale] = useState("major");
  const [type, setType] = useState("loop");
  const [instruments, setInstruments] = useState([]);

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(event.currentTarget.value));
  };

  return (
    <form className="filter-form">
      {/* BPM Slider */}
      <div>
        <label>BPM:</label>
        <input
          type="range"
          min="0"
          max="240"
          value={bpm}
          onChange={handleBpmChange}
          className="bpm-slider"
        />
        <span>{bpm} bpm</span>
      </div>

      {/* Key Selector */}
      <div>
        <label>Key:</label>
        {/* Map through your keys here */}
        <button type="button" onClick={() => setSelectedKey("C")}>
          C
        </button>

        {/* Repeat for other keys */}
      </div>

      {/* Major/Minor Toggle */}
      <div>
        <label>
          <input
            type="radio"
            name="scale"
            value="major"
            checked={scale === "major"}
            onChange={() => setScale("major")}
          />
          Major
        </label>
        <label>
          <input
            type="radio"
            name="scale"
            value="minor"
            checked={scale === "minor"}
            onChange={() => setScale("minor")}
          />
          Minor
        </label>
      </div>

      {/* Type Selector */}
      <div>
        <label>
          <input
            type="radio"
            name="type"
            value="loop"
            checked={type === "loop"}
            onChange={() => setType("loop")}
          />
          Loop
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="one-shot"
            checked={type === "one-shot"}
            onChange={() => setType("one-shot")}
          />
          One-Shot
        </label>
      </div>

      {/* Instruments Selector */}

      {/* Submit Button */}
      <input type="submit" value="Search" />
    </form>
  );
};

export default FilterForm;
