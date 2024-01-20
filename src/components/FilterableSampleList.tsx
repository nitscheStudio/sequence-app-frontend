import React, { useEffect, useState, useRef } from "react";
import SampleMusicPlayer from "./SampleMusicPlayer";
import type { Sample } from "../types/sample";
import Searchbar from "./Searchbar";
import MeiliSearch from "meilisearch";
import { useQuery } from "react-query";
import FilterForm from "./FilterForm";
import http from "../utils/http";

// const client = new MeiliSearch({
//   host: "http://localhost:7700/",
//   apiKey: "",
// });

// const index = client.index("samples_index");

const FilterableSampleList = () => {
  const [filePath, setFilePath] = useState("");
  const [playerState, setPlayerState] = useState("paused");
  const [samples, setSamples] = useState<Sample[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current;

  const fetchSamples = async () => {
    try {
      const samples = await http.get("/samples");
      setSamples(samples.data);
    } catch (error) {}
  };

  function handlePlay(musicFilePath: string) {
    if (!audio) return;
    setFilePath(musicFilePath);
    setPlayerState("playing");

    audio.src = musicFilePath;
  }

  function handlePause() {
    audio?.pause();
    setPlayerState("paused");
  }

  useEffect(() => {
    fetchSamples();
  }, []);

  return (
    <>
      {/* <Searchbar searchQuery={searchQuery} onSearch={handleSearchInput} /> */}
      <div className="filterable-sample-list">
        <FilterForm />

        <div className="samples-list">
          <audio
            onCanPlay={() => audio?.play()}
            preload="auto"
            ref={audioRef}
          ></audio>
          {samples?.length === 0 ? (
            <h3>Sorry, no Samples found...</h3>
          ) : (
            samples?.map((sample) => (
              <SampleMusicPlayer
                currentFilePath={filePath}
                playerState={playerState}
                onPlay={handlePlay}
                onPause={handlePause}
                key={sample.id}
                sample={sample}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FilterableSampleList;
