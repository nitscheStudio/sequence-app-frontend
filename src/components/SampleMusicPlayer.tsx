import React from "react";
import type { Sample, Tag } from "../types/sample";

import { IoMdDownload, IoIosPlay, IoIosPause } from "react-icons/io";
import { IoHeartCircleOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

type SampleMusicPlayerProps = {
  sample: Sample;
  currentAudioPath: string;
  onPlay: (arg0: string) => void;
  onPause: () => void;
};

function shortenScale(scale: string) {
  let shortScale = scale.slice(0, 3);
  return shortScale;
}

const SampleMusicPlayer = ({
  sample,
  currentAudioPath,
  onPlay,
  onPause,
}: SampleMusicPlayerProps) => {
  const { title, bpm, key, scale, likes_count, file_path, tags } = sample;
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(null);
  // console.log(audioRef);
  const [displayPlayBtn, setDisplayPlayBtn] = useState(true);

  const audioUrl = `http://localhost/storage/${file_path}`;

  async function handlePlay() {
    await onPlay(audioUrl);
    setDisplayPlayBtn(false);
  }

  function handlePause() {
    onPause();
    setDisplayPlayBtn(true);
  }

  useEffect(() => {
    setDisplayPlayBtn(true);
  }, [currentAudioPath]);
  // console.log(audioUrl);

  return (
    <>
      <div className="music-player-container">
        <div className="music-player">
          <div className="user-profile-picture"></div>
          <div className="sample-title-progress">
            <span className="sample-title">{title}</span>
            <div className="tags">
              <ul className="tags-list">
                {tags.map((tag: Tag) => (
                  <li key={tag.id}>{"#" + tag.name}</li>
                ))}
              </ul>
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
          {displayPlayBtn ? (
            <button onClick={handlePlay} className="play-button icon">
              <IoIosPlay />
            </button>
          ) : (
            <button onClick={handlePause} className="play-button icon">
              <IoIosPause />
            </button>
          )}
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
