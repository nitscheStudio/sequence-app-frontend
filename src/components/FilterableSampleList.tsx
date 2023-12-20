import React, { useEffect, useState, useRef } from "react";
import SampleMusicPlayer from "./SampleMusicPlayer";
import type { Sample } from "../types/sample";
import SearchbarSample from "./SearchbarSample";

// type Searchhits = {
//   hits: [
//     {
//       id: number;
//       title: string;
//       bpm: number;
//       key: string;
//       scale: string;
//       type: string;
//       file_path: string;
//       created_at: string; // or Date if you prefer to work with Date objects
//       genre: string;
//       instrument: string;
//       tags: [
//         {
//           id: number;
//           name: string;
//         }
//       ];
//       likes_count: number;
//     }
//   ];
// };


//dskfhsod
const FilterableSampleList = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  // const [filteredSamples, setFilteredSamples] = useState<Searchhits[]>([]);
  // const [isSearched, setIsSearched] = useState(false);
  const [filePath, setFilePath] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current;

  useEffect(() => {
    fetch("http://localhost/api/samples")
      .then((response) => response.json())
      .then((data) => {
        console.log("fetched from api:", data.data);
        setSamples(data.data);
      })
      .catch((error) => console.error("Error fetching the data: ", error));
  }, []);

  function handleSearch(hits: Sample[]) {
    console.log(hits);
    if (hits) {
      setSamples(hits);
      // setIsSearched(true);
    }
  }

  async function handlePlay(musicFilePath: string) {
    setFilePath(musicFilePath);
  }

  function handlePause() {
    audio?.pause();
    setFilePath("");
  }

  useEffect(() => {
    if (filePath != "") {
      audio?.play();
    }
  }, [filePath]);
  return (
    <>
      <SearchbarSample onSearch={handleSearch} />
      <div className="samples-list">
        <h1 className="headline">Samples</h1>
        <audio preload="auto" src={filePath} ref={audioRef}></audio>
        {samples.length === 0 ? (
          <h3>Sorry, no Samples found...</h3>
        ) : (
          samples.map((sample) => (
            <SampleMusicPlayer
              currentAudioPath={filePath}
              onPlay={handlePlay}
              onPause={handlePause}
              key={sample.id}
              sample={sample}
            />
          ))
        )}
      </div>
    </>
  );
};

export default FilterableSampleList;
