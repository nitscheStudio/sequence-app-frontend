import React from "react";
import type { Sample, Tag } from "../types/sample";
import { IoMdDownload, IoIosPlay, IoIosPause } from "react-icons/io";
import { IoHeartCircleOutline } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import http from "../utils/http";
import { useState } from "react";

type SampleMusicPlayerProps = {
  sample: Sample;
  currentFilePath: string;
  onPlay: (arg: string) => void;
  onPause: () => void;
  playerState: string;
};

function shortenScale(scale: string) {
  let shortScale = scale.slice(0, 3);
  return shortScale;
}

const SampleMusicPlayer = ({
  sample,
  currentFilePath,
  onPlay,
  onPause,
  playerState,
}: SampleMusicPlayerProps) => {
  const {
    title,
    bpm,
    key,
    scale,
    likes_count,
    file_path,
    tags,
    id,
    isLikedByCurrentUser,
  } = sample;
  const audioUrl = `http://localhost/storage/${file_path}`;
  const isPlaying = currentFilePath === audioUrl && playerState === "playing";
  const [likes, setLikes] = useState(likes_count);
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);

  function handlePlay() {
    onPlay(audioUrl);
  }

  function handlePause() {
    onPause();
  }

  const handleSampleLike = async () => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.post(`/sample/${id}/like`);

      if (response.data.status === "liked") {
        // Using an updater function to ensure the latest state is used
        setLikes((prevLikes) => prevLikes + 1);
        setIsLiked(true);
      } else if (response.data.status === "unliked") {
        setLikes((prevLikes) => (prevLikes > 0 ? prevLikes - 1 : 0));
        setIsLiked(false);
      }
    } catch (error) {
      console.error("An error occured during liking:", error);
    }
  };

  const handleDownload = async () => {
    await http.get("/sanctum/csrf-cookie");
    const response = await http.get(`/sample/download/${id}`, {
      responseType: "blob", // important for handling binary files
    });
    console.log(response);
  };

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
          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="sample-player-button play-button icon"
            >
              <IoIosPlay />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="sample-player-button play-button icon"
            >
              <IoIosPause />
            </button>
          )}
          <button
            onClick={handleDownload}
            className="sample-player-button download-button icon"
          >
            <IoMdDownload />
          </button>
          <div>
            <button
              className={`sample-player-button like-button icon ${
                isLiked ? "liked" : ""
              }`}
              onClick={handleSampleLike}
            >
              <IoHeartCircleOutline />
            </button>
            <div className="attribute-title">{likes}</div>
          </div>
          <button className=" sample-player-button more-button icon">
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
