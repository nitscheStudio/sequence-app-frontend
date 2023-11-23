import React from "react";
import { FaCaretRight } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { IoHeartCircleOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";

const SampleMusicPlayer = () => {
  return (
    <>
      <div className="music-player">
        <div className="user-profile-picture"></div>
        <div className="sample-title-progress">
          <span className="sample-title">Guitar_Riff_90_Loop.mp3</span>
          <div className="progress-bar">
            <input
              type="range"
              id="song-progress"
              min="0"
              max="100"
              value="0"
            />
          </div>
        </div>
        <div className="attribute-container">
          <div className="attribute">Gm</div>
          <div className="attribute-title">key</div>
        </div>
        <div className="attribute-container border-right">
          <div className="attribute">122</div>
          <div className="attribute-title">bpm</div>
        </div>
        <button className="play-button icon">
          <FaCaretRight />
        </button>
        <button className="download-button icon">
          <IoMdDownload />
        </button>
        <button className="like-button icon">
          <IoHeartCircleOutline />
        </button>
        <button className="more-button icon">
          <MdMoreVert />
        </button>
      </div>
    </>
  );
};

export default SampleMusicPlayer;
