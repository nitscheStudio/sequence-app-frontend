import React from "react";
import { useForm } from "react-hook-form";
import http from "../utils/http";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LuUploadCloud } from "react-icons/lu";
import FileDragAndDrop from "../components/FileDragAndDrop";
import { IoIosArrowRoundForward } from "react-icons/io";

type FormValues = {
  title: string;
  bpm?: number;
  key: string;
  scale: string;
  genre_id: number;
  instrument_id: number;
  tags?: Array<{
    id: number;
    name: string;
  }>;
  sample_file: FileList;
};

type Genre = {
  id: number;
  name: string;
};

type Instrument = {
  id: number;
  name: string;
};

const SampleUpload = () => {
  const form = useForm<FormValues>();
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = form;
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    // Fetch genres and instruments from backend
    const fetchGenresAndInstruments = async () => {
      const genresResponse = await http.get("/genres");
      const instrumentsResponse = await http.get("/instruments");

      setGenres(genresResponse.data);
      setInstruments(instrumentsResponse.data);
    };

    fetchGenresAndInstruments();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("bpm", String(data.bpm));
    formData.append("key", data.key);
    formData.append("scale", data.scale);
    formData.append("genre_id", String(data.genre_id));
    formData.append("instrument_id", String(data.instrument_id));
    // Store the form data
    setFormData(data);

    // Go to the next step
    setStep(step + 1);

    // Append tags if they exist
    if (data.tags) {
      data.tags.forEach((tag) => {
        formData.append("tags[]", JSON.stringify(tag));
      });
    }

    // Append file from Drag n Drop to formData
    if (file) {
      formData.append("sample_file", file);
    }

    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.post("/uploadSample", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadSuccess(true);
      setFile(null);
      reset();
    } catch (exception: any) {
      const errors = exception.response.data.errors;

      for (let [fieldName, errorList] of Object.entries(errors)) {
        type Field =
          | "title"
          | "key"
          | "scale"
          | "bpm"
          | "genre_id"
          | "instrument_id"
          | "tags"
          | "root";
        const errors = (errorList as any[]).map((message) => ({ message }));
        console.log(fieldName, errors);
        setError(fieldName as Field, errors[0]);
      }
    }
  };

  const onError = () => {
    console.log("Form error");
  };

  return (
    <>
      {step === 1 ? <h1>Upload a Sample</h1> : <h1>Choose fitting Tags</h1>}

      {uploadSuccess && (
        <p className="success-message">
          Upload successful! Want to upload another sample?
        </p>
      )}
      {step === 1 && (
        <form
          className="upload-form"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <FileDragAndDrop file={file} setFile={setFile} />

          {/*############# - Sample-Title - ##############*/}
          <div className="input-container">
            <label htmlFor="title">Sample-Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Choose a title that fits your sound best..."
              {...register("title", {
                required: { value: true, message: "This field is required" },
              })}
            />
            <p className="error-message">{errors.title?.message}</p>
          </div>

          {/*############# - BPM, Key, Scale - ##############*/}
          <div className="upload-form-row">
            <div className="input-container">
              <label htmlFor="bpm">BPM:</label>
              <input
                placeholder="40 - 240"
                min="40"
                max="240"
                type="number"
                id="number"
                {...register("bpm", {
                  required: { value: true, message: "This field is required" },
                  min: { value: 40, message: "Minimum value is 40" },
                  max: { value: 240, message: "Maximum value is 240" },
                })}
              />
              <p className="error-message">{errors.bpm?.message}</p>
            </div>

            <div className="input-container">
              <label htmlFor="keySignature">Key:</label>
              <select
                id="keySignature"
                {...register("key", {
                  required: { value: true, message: "This field is required" },
                })}
              >
                <option value="-">-</option>
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

            <div className="input-container">
              <label htmlFor="scale">Scale:</label>
              <select
                id="scale"
                {...register("scale", {
                  required: { value: true, message: "This field is required" },
                })}
              >
                <option value="-">-</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </select>
              <p className="error-message">{errors.scale?.message}</p>
            </div>
          </div>

          {/*############# - Genre, Instrument - ##############*/}

          <div className="upload-form-row-2">
            <div className="input-container">
              <label htmlFor="genre_id">Genre:</label>
              <select
                id="genre_id"
                {...register("genre_id", {
                  required: { value: true, message: "This field is required" },
                })}
              >
                <option value="">Select a genre</option>

                {genres.map((genre: Genre) => (
                  <option value={genre.id} key={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <p className="error-message">{errors.genre_id?.message}</p>
            </div>

            <div className="input-container">
              <label htmlFor="instrument_id">Instrument:</label>
              <select
                id="instrument_id"
                {...register("instrument_id", {
                  required: { value: true, message: "This field is required" },
                })}
              >
                <option value="">Select an instrument</option>

                {instruments.map((instrument: Instrument) => (
                  <option value={instrument.id} key={instrument.id}>
                    {instrument.name}
                  </option>
                ))}
              </select>
              <p className="error-message">{errors.instrument_id?.message}</p>
            </div>
          </div>

          <button className="submit-btn" disabled={isSubmitting}>
            Next Step
          </button>
        </form>
      )}
    </>
  );
};

export default SampleUpload;
