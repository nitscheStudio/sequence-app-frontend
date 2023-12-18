import React, { useEffect, useState } from "react";
import SampleMusicPlayer from "./SampleMusicPlayer";
import type { Sample } from "../types/sample";

const FilterableSampleList = () => {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    // console.log("hello");
    setIsPlaying(false);
  };

  useEffect(() => {
    fetch("http://localhost/api/samples?page=1")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setSamples(data.data);
      })
      .catch((error) => console.error("Error fetching the data: ", error));
  }, []);

  return (
    <div className="samples-list">
      <h1 className="headline">Samples</h1>
      {samples.map((sample) => (
        <SampleMusicPlayer
          onPlay={handlePlay}
          isPlaying={isPlaying}
          key={sample.id}
          sample={sample}
        />
      ))}
    </div>
  );
};

export default FilterableSampleList;
