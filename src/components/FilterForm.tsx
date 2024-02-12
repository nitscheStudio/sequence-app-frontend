import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../context/InstrumentGenreContext";
import RangeSlider from "./RangeSlider"; // adjust the path as needed

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
    console.log(data);
    onSearch(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
        {/* Instruments Selector */}
        <select id="instrument_id" {...register("instrument_id")}>
          <option value="">Instrument</option>

          {instruments.map((instrument) => (
            <option value={instrument.id} key={instrument.id}>
              {instrument.name}
            </option>
          ))}
        </select>
        {/* Genres Selector */}
        <select id="genre_id" {...register("genre_id")}>
          <option value="">Genre</option>

          {genres.map((genre) => (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <div className="input-container-sample-form">
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
          <p className="error-message">{errors.key?.message}</p>
        </div>

        <div className="input-container-sample-form">
          <select id="scale" {...register("scale")}>
            <option value="">Scale</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
          </select>
          <p className="error-message">{errors.scale?.message}</p>
        </div>

        {/* Submit Button */}
        <button disabled={isSubmitting}>Search</button>
      </form>
      <RangeSlider bpmRange={bpmRange} setBpmRange={setBpmRange} />
    </>
  );
};

export default FilterForm;
