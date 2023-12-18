import React from "react";
import type { Sample } from "../types/sample";
import { IoMdDownload, IoIosPlay, IoIosPause } from "react-icons/io";
import { IoHeartCircleOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

type SampleMusicPlayerProps = {
  sample: Sample;
  isPlaying: boolean;
  onPlay: () => void;
};

function shortenScale(scale: string) {
  let shortScale = scale.slice(0, 3);
  return shortScale;
}

const SampleMusicPlayer = ({
  sample,
  isPlaying,
  onPlay,
}: SampleMusicPlayerProps) => {
  const { title, bpm, key, scale, likes_count, file_path, id } = sample;
  // const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  // console.log(audioRef);

  const audioUrl = `http://localhost/storage/${file_path}`;

  function togglePlayPause() {
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        // onPlay();
        audio.play();
      } else {
        audio.pause();
      }
    }
  }

  // console.log(audioUrl);
  return (
    <>
      <div className="music-player-container">
        <audio preload="auto" src={audioUrl} ref={audioRef}></audio>
        <div className="music-player">
          <div className="user-profile-picture"></div>
          <div className="sample-title-progress">
            <span className="sample-title">{title}</span>
            {/* <audio src={audioUrl}></audio> */}
            <div className="progress-bar">
              <input
                type="range"
                id="song-progress"
                min="0"
                max="100"
                value="15"
              />
            </div>
          </div>
          <div className="attribute-container">
            <div className="attribute">
              {key}
              {shortenScale(scale)}
            </div>
            <div className="attribute-title">key</div>
          </div>
          <div className="attribute-container border-right">
            <div className="attribute">{bpm}</div>
            <div className="attribute-title">bpm</div>
          </div>
          <button onClick={togglePlayPause} className="play-button icon">
            {!isPlaying ? <IoIosPlay /> : <IoIosPause />}
          </button>
          <button className="download-button icon">
            <IoMdDownload />
          </button>
          <div>
            <button className="like-button icon">
              <IoHeartCircleOutline />
            </button>
            <div className="attribute-title">{likes_count}</div>
          </div>
          <button className="more-button icon">
            <MdMoreVert />
          </button>
        </div>
        {/* <div className="tags">
          <ul className="tags-list">
            <li>#guitar</li>
            <li>#spanish</li>
            <li>#melody</li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default SampleMusicPlayer;
