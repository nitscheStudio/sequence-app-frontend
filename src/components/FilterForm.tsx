import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../context/InstrumentGenreContext";
import RangeSlider from "./RangeSlider"; // adjust the path as needed

type FormValues = {
  bpm?: number;
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

const FilterForm = () => {
  const form = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = form;
  const { genres, instruments, error } = useContext(DataContext);


  return (
    <>
      <form className="filter-form">
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
      <RangeSlider />
    </>
  );
};

export default FilterForm;
