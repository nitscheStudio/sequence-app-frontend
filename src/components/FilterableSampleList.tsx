import React, { useEffect, useState, useRef } from "react";
import SampleMusicPlayer from "./SampleMusicPlayer";
import type { Sample } from "../types/sample";

const FilterableSampleList = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [filePath, setFilePath] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch("http://localhost/api/samples?page=1")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setSamples(data.data);
      })
      .catch((error) => console.error("Error fetching the data: ", error));
  }, []);

  async function handlePlay(musicFilePath: string) {
    setFilePath(musicFilePath);
  }

  function handlePause() {
    const audio = audioRef.current;
    audio?.pause();
    setFilePath("");
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (filePath != "") {
      audio?.play();
    }
  }, [filePath]);

  return (
    <div className="samples-list">
      <h1 className="headline">Samples</h1>
      <audio preload="auto" src={filePath} ref={audioRef}></audio>
      {samples.map((sample) => (
        <SampleMusicPlayer
          currentAudioPath={filePath}
          onPlay={handlePlay}
          onPause={handlePause}
          key={sample.id}
          sample={sample}
        />
      ))}
    </div>
  );
};

export default FilterableSampleList;
