import type { Sample, TagType } from "../types/sample";
import { IoMdDownload, IoIosPlay, IoIosPause } from "react-icons/io";
import { IoHeartCircleOutline } from "react-icons/io5";
import http from "../utils/http";
import { useState } from "react";
import SampleContextMenu from "./SampleContextMenu";
import { Tooltip } from "react-tooltip";
import profilePictureDefault from "../assets/profile-picture-default.svg";

type SampleMusicPlayerProps = {
  showEditButton: boolean;
  sample: Sample;
  currentFilePath: string;
  onPlay: (arg: string) => void;
  onPause: () => void;
  playerState: string;
  isContextMenuVisible: boolean;
  toggleVisibility: (id: number) => void;
  closeMenu: () => void;
  handleSampleDeletion: (deletedSampleId: number) => void;
};

function getScaleDisplay(key: string, scale: string) {
  if (scale.toLowerCase() === "major") {
    return key;
  } else if (scale.toLowerCase() === "minor") {
    return `${key}m`;
  }
  // Return just the key if scale is neither 'major' nor 'minor'
  // Or return an empty string, depending on how you want to handle unexpected values
  return key;
}

const SampleMusicPlayer = ({
  sample,
  currentFilePath,
  onPlay,
  onPause,
  playerState,
  showEditButton,
  isContextMenuVisible,
  toggleVisibility,
  closeMenu,
  handleSampleDeletion,
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
    profile_picture_path,
  } = sample;
  const audioUrl = `http://localhost/storage/${file_path}`;
  const isPlaying = currentFilePath === audioUrl && playerState === "playing";
  const [likes, setLikes] = useState(likes_count);
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);

  const profilePictureUrl = `http://localhost/storage/${profile_picture_path}`;

  function handlePlay() {
    onPlay(audioUrl);
  }

  function handlePause() {
    onPause();
  }

  const handleSampleLike = async () => {
    // Optimistically update the UI
    if (!isLiked) {
      setLikes((prevLikes) => (prevLikes || 0) + 1);
      setIsLiked(true);
    } else {
      // Optimistically update the UI for unliking
      setLikes((prevLikes) => Math.max((prevLikes || 0) - 1, 0));
      setIsLiked(false);
    }

    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.post(`/sample/${id}/like`);
      if (response.data.status === "unliked" && isLiked) {
      } else if (response.data.status === "liked" && !isLiked) {
      }
    } catch (error) {
      console.error("An error occurred during liking:", error);

      if (isLiked) {
        // If the error occurred while trying to like, revert to unliked state
        setLikes((prevLikes) => (prevLikes || 0) + 1);
        setIsLiked(false);
      } else {
        // If the error occurred while trying to unlike, revert to liked state
        setLikes((prevLikes) => Math.max((prevLikes || 0) - 1, 0));
        setIsLiked(true);
      }
    }
  };

  const handleDownload = async () => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.get(`/sample/download/${id}`, {
        responseType: "arraybuffer",
      });

      console.log(response);

      if (response.status !== 200) {
        throw new Error(`Error: Status code ${response.status}`);
      }

      if (!response.data) {
        throw new Error("No data in response");
      }

      // Extract filename from the Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      // console.log(contentDisposition);
      let filename = "sample.mp3";
      if (contentDisposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        let matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, "");
        }
      }
      // Create a new Blob object using the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a URL for the Blob object
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");

      // Set the href and download attributes of the link
      link.href = url;
      link.download = filename;

      // Append the link to the body
      document.body.appendChild(link);

      // Simulate a click on the link
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    } catch (error) {
      console.error("An error occured during download:", error);
    }
  };

  return (
    <>
      <div className="music-player-container">
        <div className="music-player">
          <div className="user-profile-picture">
            <img
              src={
                profile_picture_path ? profilePictureUrl : profilePictureDefault
              }
              alt="profile picture"
            />
          </div>
          <div className="sample-title-progress">
            <span className="sample-title">{title}</span>
            <div className="tags">
              <ul className="tags-list">
                {tags.map((tag: TagType) => (
                  <li key={tag.id}>{"#" + tag.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="attribute-container">
            <div className="attribute">{getScaleDisplay(key, scale)}</div>
            <div className="attribute-title">key</div>
          </div>
          <div className="attribute-container border-right">
            <div className="attribute">{bpm}</div>
            <div className="attribute-title">bpm</div>
          </div>
          {!isPlaying ? (
            <>
              <button
                onClick={handlePlay}
                className="sample-player-button play-button icon"
              >
                <IoIosPlay />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handlePause}
                className="sample-player-button play-button icon"
              >
                <IoIosPause />
              </button>
            </>
          )}
          <button
            data-tooltip-id="download-tooltip"
            data-tooltip-content="Download"
            data-tooltip-delay-show={800}
            onClick={handleDownload}
            className="sample-player-button download-button icon"
          >
            <IoMdDownload />
          </button>
          <Tooltip id="download-tooltip" />

          <div>
            <button
              data-tooltip-id="like-tooltip"
              data-tooltip-content="Save to Likes"
              data-tooltip-delay-show={800}
              className={`sample-player-button like-button icon ${
                isLiked ? "liked" : ""
              }`}
              onClick={handleSampleLike}
            >
              <IoHeartCircleOutline />
            </button>
            <div className="attribute-title">{likes}</div>
            <Tooltip id="like-tooltip" />
          </div>
          {showEditButton && (
            <SampleContextMenu
              sampleId={sample.id}
              isVisible={isContextMenuVisible}
              toggleVisibility={toggleVisibility}
              closeMenu={closeMenu}
              handleSampleDeletion={handleSampleDeletion}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SampleMusicPlayer;
