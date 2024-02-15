import React, { useEffect, useState, useRef } from "react";
import SampleMusicPlayer from "./SampleMusicPlayer";
import type { Sample } from "../types/sample";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import http from "../utils/http";

type FilterableSampleListProps = {
  showEditButton: boolean;
  samples: Sample[];
  onNextPage: () => void;
  onPrevPage: () => void;
  totalSamples: number;
  totalPages: number;
  page: number;
  setSamples: React.Dispatch<React.SetStateAction<Sample[]>>;
};

const FilterableSampleList = ({
  setSamples,
  samples,
  onNextPage,
  onPrevPage,
  totalSamples,
  totalPages,
  page,
  showEditButton,
}: FilterableSampleListProps) => {
  const [filePath, setFilePath] = useState("");
  const [playerState, setPlayerState] = useState("paused");

  // Popup for update and delete sample messages

  // for ContextMenu
  const [visibleContextMenu, setVisibleContextMenu] = useState<number | null>(
    null
  );

  //Sample deletion passed down to Modal Component
  const handleSampleDeletion = (deletedSampleId: number) => {
    setSamples((currentSamples) =>
      currentSamples.filter((sample) => sample.id !== deletedSampleId)
    );
  };

  const toggleVisibility = (id: number) => {
    setVisibleContextMenu(visibleContextMenu === id ? null : id);
  };

  const closeMenu = () => {
    setVisibleContextMenu(null);
  };

  //Ref for scrolling to top of the container when page changes
  const componentRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio = audioRef.current;

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

  return (
    <>
      <div ref={componentRef} className="filterable-sample-list">
        <div className="samples-list">
          <h3 className="total-samples">{totalSamples} Samples:</h3>
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
                showEditButton={showEditButton}
                isContextMenuVisible={visibleContextMenu === sample.id}
                toggleVisibility={toggleVisibility}
                closeMenu={closeMenu}
                handleSampleDeletion={handleSampleDeletion}
              />
            ))
          )}
        </div>
      </div>

      <div className="page-controller">
        {/* Your sample list goes here */}
        {totalPages > 1 && (
          <button
            className="page-controller-button flex-center"
            disabled={page === 1}
            onClick={() => {
              onPrevPage();
              // setPage((page) => Math.max(page - 1, 1));
              // if (componentRef.current) {
              //   const rect = componentRef.current.getBoundingClientRect();
              //   window.scrollTo({
              //     top: rect.top + window.scrollY - 100,
              //     behavior: "instant",
              //   });
              // }
              // window.scrollTo(0, 0);
            }}
          >
            <MdArrowBackIos />
            <span className="page-controll-button-descr">Prev</span>
          </button>
        )}
        <span className="pages-display">
          Page {page} of {totalPages}
        </span>
        {totalPages > 1 && (
          <button
            className="page-controller-button flex-center"
            disabled={page >= totalPages}
            onClick={() => {
              onNextPage();
              // setPage((page) => page + 1);
              // if (componentRef.current) {
              //   const rect = componentRef.current.getBoundingClientRect();
              //   window.scrollTo({
              //     top: rect.top + window.scrollY - 100,
              //     behavior: "instant",
              //   });
              // }
              // window.scrollTo(0, 0);
            }}
          >
            <span className="page-controll-button-descr">Next</span>
            <MdArrowForwardIos />
          </button>
        )}
      </div>
    </>
  );
};

export default FilterableSampleList;
