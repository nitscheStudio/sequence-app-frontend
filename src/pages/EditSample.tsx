import { useForm } from "react-hook-form";
import http from "../utils/http";
import { useEffect, useState } from "react";
import { Sample } from "../types/sample";
import { useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import TagManager from "../components/TagManager";

type EditSampleProps = {
  sampleId: number;
};

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

const EditSample = () => {
  const form = useForm<FormValues>();
  //Params: react Router Dom v6 passing dynamic routes
  const { sampleId } = useParams();

  const [sampleData, setSampleData] = useState<Sample | null>(null);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  // const [tagsAreSet, setTagsareSet] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const fields: Array<keyof FormValues> = [
    "title",
    "key",
    "scale",
    "bpm",
    "genre_id",
    "instrument_id",
    "tags",
  ];

  // Fetch Sample from db
  const getSampleInfo = async () => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.get(`/sample/${sampleId}`);
      const sample = response.data;
      console.log("sample:", sample);
      //Set initial Sample Values
      fields.forEach((field) => {
        setValue(field, sample[field]);
      });

      // Set initial Tags
      setSelectedTags(sample.tags || []);
      // setTagsareSet(true);
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

  const handleTagsChange = (tags: Tag[]) => {
    setSelectedTags(tags);
  };

  const onError = () => {
    console.log("Form error");
  };

  useEffect(() => {
    getSampleInfo();
  }, []);

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

  console.log("selected Tags:", selectedTags);

  return (
    <>
      <h1 className="sample-form-headline">
        <FiEdit />
        Edit your Sample
      </h1>
      <form className="sample-form" onSubmit={handleSubmit(onError)}>
        {/*############# - Sample-Title - ##############*/}
        <div className="input-container-sample-form">
          <label htmlFor="title">Sample-Title:</label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: { value: true, message: "This field is required" },
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

          <div className="input-container-sample-form">
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

          <div className="input-container-sample-form">
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
      </form>

      <TagManager selectedTags={selectedTags} onTagsChange={setSelectedTags} />
    </>
  );
};

export default EditSample;
