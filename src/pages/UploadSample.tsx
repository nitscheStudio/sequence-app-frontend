import { useForm } from "react-hook-form";
import http from "../utils/http";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import FileDragAndDrop from "../components/FileDragAndDrop";
import TagManager from "../components/TagManager";
// import predefinedTags from "../predefinedArrays/TagData";
import stepBackIcon from "../assets/stepBackBtn.svg";
import uploadSucces from "../assets/uploadSuccess.svg";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaArrowUpLong,
} from "react-icons/fa6";
import { ImUpload } from "react-icons/im";

import { DataContext } from "../context/InstrumentGenreContext";

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

type Tag = {
  id: number;
  name: string;
};

const SampleUpload = () => {
  const form = useForm<FormValues>();
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [fileSelectionError, setFileSelectionError] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = form;
  const navigate = useNavigate();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { genres, instruments, error } = useContext(DataContext);

  let stepHeader;
  if (uploadSuccess) {
    stepHeader = <h1 className="success-message">Congrats!</h1>;
  } else if (step === 1) {
    stepHeader = (
      <h1 className="sample-form-headline">
        <ImUpload />
        Upload a Sample
      </h1>
    );
  } else if (step === 2) {
    stepHeader = <h1>Choose Fitting Tags</h1>;
  } else if (step === 3) {
    stepHeader = <h1>Review and Submit</h1>;
  }

  const onNextStep = () => {
    if (!file) {
      setFileSelectionError("Please select a file to upload.");
      return;
    }

    // Clear any previous file selection errors
    setFileSelectionError(null);

    window.scrollTo(0, 0);

    // Go to the next step
    setStep(step + 1);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("bpm", String(data.bpm));
    formData.append("key", data.key);
    formData.append("scale", data.scale);
    formData.append("genre_id", String(data.genre_id));
    formData.append("instrument_id", String(data.instrument_id));

    if (file) {
      formData.append("sample_file", file);
    }
    // Store the form data
    setFormData(formData);
    selectedTags.forEach((tag) => {
      formData.append("tags[]", tag.name);
    });

    try {
      await http.get("/sanctum/csrf-cookie");
      await http.post("/uploadSample", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadSuccess(true);
      setFile(null);
    } catch (exception: any) {
      const errors = exception.response.data.errors;
      if (exception.response) {
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
          // console.log(fieldName, errors);
          setError(fieldName as Field, errors[0]);
        }
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
      }
    }
  };

  //Reset all input fields
  const resetForm = () => {
    reset(); //
    setFile(null);
    setSelectedTags([]);
    setStep(1);
    setUploadSuccess(false);
    setFileSelectionError(null);
    window.scrollTo(0, 0);
  };

  //Callback function from TagManager.tsx
  const handleTagsChange = (tags: Tag[]) => {
    setSelectedTags(tags);
  };

  const MAX_FILE_SIZE = 20 * 1024 * 1024; //20mb

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      setFileSelectionError(
        `File size exceeds the maximum allowed size of ${
          MAX_FILE_SIZE / 1024 / 1024
        } MB.`
      );
      setFile(null); // Clear the file state
    } else {
      setFile(selectedFile); // Update the file state with the new file
      setFileSelectionError(null); // Clear any file selection error message
      form.clearErrors("sample_file");
    }
  };

  const handleStepBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      {step > 1 && !uploadSuccess && (
        <button className="back-step-btn" onClick={handleStepBack}>
          <img src={stepBackIcon} alt="step back icon" />
          previous step
        </button>
      )}
      {stepHeader}

      {step === 1 && (
        <form className="sample-form" onSubmit={handleSubmit(onNextStep)}>
          <FileDragAndDrop
            file={file}
            setFile={handleFileChange}
            dataTypes={"audio"}
          />
          {fileSelectionError && (
            <div className="error-message">{fileSelectionError}</div>
          )}

          {/*############# - Sample-Title - ##############*/}
          <div className="input-container-sample-form">
            <label htmlFor="title">Sample-Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Choose a title that fits your sound best..."
              {...register("title", {
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 8,
                  message: "The title must be at least 8 characters long",
                },
              })}
            />
            <p className="error-message">{errors.title?.message}</p>
          </div>

          {/*############# - BPM, Key, Scale - ##############*/}
          <div className="upload-form-row">
            <div className="input-container-sample-form">
              <label htmlFor="bpm">BPM:</label>
              <input
                placeholder="40 - 240"
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

            <div className="input-container-sample-form">
              <label htmlFor="keySignature">Key:</label>
              <select
                id="keySignature"
                {...register("key", {
                  required: { value: true, message: "This field is required" },
                  validate: (value) => value !== "" || "Please select a key",
                })}
              >
                <option value="">-</option>
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
              <label htmlFor="scale">Scale:</label>
              <select
                id="scale"
                {...register("scale", {
                  required: { value: true, message: "This field is required" },
                  validate: (value) => value !== "" || "Please select a scale",
                })}
              >
                <option value="">-</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </select>
              <p className="error-message">{errors.scale?.message}</p>
            </div>
          </div>

          {/*############# - Genre, Instrument - ##############*/}

          <div className="upload-form-row-2">
            <div className="input-container-sample-form">
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

            <div className="input-container-sample-form">
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

          <button className="next-step-btn" disabled={isSubmitting}>
            Next Step <FaArrowRightLong />
          </button>
        </form>
      )}
      {step === 2 && (
        <>
          <p>
            Tags can help other producers to better understand your sound.
            <br />
            Choose up to <strong>three Tags</strong> that you think will fit
            your sample.
          </p>
          <TagManager
            // onTagsChange={handleTagsChange}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
          <button className="next-step-btn" onClick={onNextStep}>
            Next Step <FaArrowRightLong />
          </button>
        </>
      )}
      {step === 3 && (
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {!uploadSuccess ? (
            <>
              <p>
                All necessary information has been collected. <br /> You can
                check sample details in the previous steps or upload it now.
              </p>
              <button
                disabled={isSubmitting}
                className="submit-btn icon-button margin-auto-center"
                onClick={handleSubmit(onSubmit)}
              >
                Upload Your Sample Now <ImUpload />
              </button>
            </>
          ) : (
            <>
              <p className="success-message">
                Your sample upload was successful!
              </p>
              <img src={uploadSucces} alt="upload success image" />
              <div className="redirect-buttons-container">
                <Link className="redirect-button" to={"/dashboard"}>
                  <FaArrowLeftLong />
                  View uploaded Samples
                </Link>
                <div className="redirect-button" onClick={resetForm}>
                  Upload another Sample
                  <FaArrowRightLong />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SampleUpload;
