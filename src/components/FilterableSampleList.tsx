import { useEffect, useState, useRef } from "react";
import SampleMusicPlayer from "./SampleMusicPlayer";
import type { Sample } from "../types/sample";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import http from "../utils/http";

// const client = new MeiliSearch({
//   host: "http://localhost:7700/",
//   apiKey: "",
// });

// const index = client.index("samples_index");

type FilterableSampleListProps = {
  endpoint: string;
  showEditButton: boolean;
};

const FilterableSampleList = ({
  endpoint,
  showEditButton,
}: FilterableSampleListProps) => {
  const [filePath, setFilePath] = useState("");
  const [playerState, setPlayerState] = useState("paused");
  const [samples, setSamples] = useState<Sample[]>([]);
  const [page, setPage] = useState(1);

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

  const fetchSamples = async () => {
    try {
      const samples = await http.get(`/${endpoint}?page=${page}`);
      // const samples = await http.get(`/samples?page=${page}`);

      setSamples(samples.data);
    } catch (error) {}
  };

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

  useEffect(() => {
    fetchSamples();
  }, [page]);

  return (
    <>
      {/* <h1>Browse all Samples</h1> */}
      {/* <Searchbar searchQuery={searchQuery} onSearch={handleSearchInput} /> */}
      <div ref={componentRef} className="filterable-sample-list">
        {/* <FilterForm /> */}

        <div className="samples-list">
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

        <button
          className="page-controller-button flex-center"
          disabled={page <= 1}
          onClick={() => {
            setPage((page) => Math.max(page - 1, 1));
            if (componentRef.current) {
              const rect = componentRef.current.getBoundingClientRect();
              window.scrollTo({
                top: rect.top + window.scrollY - 100,
                behavior: "instant",
              });
            }
            // window.scrollTo(0, 0);
          }}
        >
          <MdArrowBackIos />
          <span className="page-controll-button-descr">Prev</span>
        </button>

        <button
          className="page-controller-button flex-center"
          disabled={samples.length < 10}
          onClick={() => {
            setPage((page) => page + 1);
            if (componentRef.current) {
              const rect = componentRef.current.getBoundingClientRect();
              window.scrollTo({
                top: rect.top + window.scrollY - 100,
                behavior: "instant",
              });
            }
            // window.scrollTo(0, 0);
          }}
        >
          <span className="page-controll-button-descr">Next</span>
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
};

export default FilterableSampleList;
