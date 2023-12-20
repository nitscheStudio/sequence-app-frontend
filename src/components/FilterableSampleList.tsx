import React, { useEffect, useState, useRef } from "react";
import SampleMusicPlayer from "./SampleMusicPlayer";
import type { Sample } from "../types/sample";
import SearchbarSample from "./SearchbarSample";

const FilterableSampleList = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [filePath, setFilePath] = useState("");
  const [playerState, setPlayerState] = useState("paused");
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
    if (!audio) return;
    setFilePath(musicFilePath);
    setPlayerState("playing");

    audio.src = musicFilePath;
  }

  function handlePause() {
    audio?.pause();
    setPlayerState("paused");
  }

  return (
    <>
      <SearchbarSample onSearch={handleSearch} />
      <div className="samples-list">
        <h1 className="headline">Samples</h1>
        <audio
          onCanPlay={(e) => audio?.play()}
          preload="auto"
          ref={audioRef}
        ></audio>
        {samples.length === 0 ? (
          <h3>Sorry, no Samples found...</h3>
        ) : (
          samples.map((sample) => (
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
    </>
  );
};

export default FilterableSampleList;
