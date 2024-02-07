import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "../context/InstrumentGenreContext";

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

      {/* Submit Button */}
      <input type="submit" value="Search" />
    </form>
  );
};

export default FilterForm;
