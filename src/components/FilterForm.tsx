import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../context/InstrumentGenreContext";

// Libraries (3rd Party)
import RangeSlider from "./RangeSlider";

type FormValues = {
  bpmRange?: number[];
  key?: string;
  scale?: string;
  genre_id?: number;
  instrument_id?: number;
  tags?: Array<{
    id: number;
    name: string;
  }>;
};

type Genre = {
  id: number;
  name: string;
};

type Instrument = {
  id: number;
  name: string;
};

type OnSearchFunction = (data: FormValues) => void;

type FilterFormProps = {
  onSearch: OnSearchFunction;
};

const FilterForm: React.FC<FilterFormProps> = ({ onSearch }) => {
  const form = useForm<FormValues>();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;
  const { genres, instruments } = useContext(DataContext);
  const [bpmRange, setBpmRange] = useState<number[]>([40, 240]);

  // Update the form state with the bpmRange whenever it changes
  useEffect(() => {
    setValue("bpmRange", bpmRange); // Use setValue to update the form state
  }, [bpmRange, setValue]);

  const onSubmit = (data: FormValues) => {
    onSearch(data);
  };

  // Watch form fields
  const watchedInstrument = watch("instrument_id");
  const watchedGenre = watch("genre_id");
  const watchedKey = watch("key");
  const watchedScale = watch("scale");

  const filterSetClass = (value: any) => (value ? "filter-set" : "");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
        <div className="range-slider-container">
          <div className="bpm-indicator">
            <div className="filter-input-title">BPM</div>
            <div className="bpm-range-indicator">
              {bpmRange[0] === bpmRange[1]
                ? `${bpmRange[0]}`
                : `${bpmRange[0]} - ${bpmRange[1]}`}
            </div>
          </div>

          <RangeSlider bpmRange={bpmRange} setBpmRange={setBpmRange} />
        </div>
        {/* Instruments Selector */}

        <div
          className={`input-container-filter-form ${filterSetClass(
            watchedInstrument
          )}`}
        >
          <select id="instrument_id" {...register("instrument_id")}>
            <option value="">Instrument</option>

            {instruments.map((instrument) => (
              <option value={instrument.id} key={instrument.id}>
                {instrument.name}
              </option>
            ))}
          </select>
        </div>
        {/* Genres Selector */}
        <div
          className={`input-container-filter-form ${filterSetClass(
            watchedGenre
          )}`}
        >
          <select id="genre_id" {...register("genre_id")}>
            <option value="">Genre</option>

            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`input-container-filter-form ${filterSetClass(
            watchedKey
          )}`}
        >
          <select id="keySignature" {...register("key")}>
            <option value="">Key</option>
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="D">D</option>
            <option value="D">Db</option>
            <option value="D#">D#</option>
            <option value="E">E</option>
            <option value="D">Eb</option>
            <option value="F">F</option>
            <option value="F#">F#</option>
            <option value="G">G</option>
            <option value="G">Gb</option>
            <option value="G#">G#</option>
            <option value="A">A</option>
            <option value="G">Ab</option>
            <option value="A#">A#</option>
            <option value="B">B</option>
            <option value="B">Bb</option>
          </select>
          {errors.key && <p className="error-message">{errors.key?.message}</p>}
        </div>

        <div
          className={`input-container-filter-form ${filterSetClass(
            watchedScale
          )}`}
        >
          <select id="scale" {...register("scale")}>
            <option value="">Scale</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
          </select>
          {errors.scale && (
            <p className="error-message">{errors.scale?.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button className="submit-btn" disabled={isSubmitting}>
          Search
        </button>
      </form>
    </>
  );
};

export default FilterForm;
