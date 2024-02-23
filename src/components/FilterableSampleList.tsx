import { useEffect, useState, useRef } from "react";

// Type Imports
import type { Sample } from "../types/sample";

//Component Imports
import SampleMusicPlayer from "./SampleMusicPlayer";

//Image & Icon Imports
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type SampleData = {
  samples: Sample[];
  totalSamples: number;
  totalPages: number;
};

type FilterableSampleListProps = {
  onPageChange?: (page: number) => void;
  showEditButton: boolean;
  // fetchSamples: (page: number) => Promise<SampleData | void>;
  currentPage: number;
  samplesData: SampleData;
};

const FilterableSampleList = ({
  samplesData,
  showEditButton,
  onPageChange,
  currentPage,
}: FilterableSampleListProps) => {
  const [filePath, setFilePath] = useState("");
  const [playerState, setPlayerState] = useState("paused");
  const [samples, setSamples] = useState<Sample[]>([]);
  const [page, setPage] = useState(currentPage);
  const [totalSamples, setTotalSamples] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // for ContextMenu
  const [visibleContextMenu, setVisibleContextMenu] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (samplesData) {
      setSamples(samplesData.samples);
      setTotalSamples(samplesData.totalSamples);
      setTotalPages(samplesData.totalPages);
    }
  }, [samplesData]);

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

  const handleMusicEnd = () => {
    setPlayerState("paused");
  };

  //notify parent about page change so it can fetch data for new page
  const setPageAndNotify = (newPage: number) => {
    setPage(newPage);
    // window.scrollTo(0, 0);
    onPageChange?.(newPage); // Notify the parent about the page change
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <>
      <div ref={componentRef} className="filterable-sample-list">
        <div className="samples-list">
          <h3 className="total-samples">{totalSamples} Samples:</h3>
          <audio
            onCanPlay={() => audio?.play()}
            onEnded={handleMusicEnd}
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
            onClick={() => setPageAndNotify(page - 1)}
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
            onClick={() => setPageAndNotify(page + 1)}
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
