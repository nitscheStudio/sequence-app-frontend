import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import fileUploadIcon from "../assets/file-upload-icon.svg";

type FileDragAndDropProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const FileDragAndDrop: React.FC<FileDragAndDropProps> = ({ file, setFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "audio/mpeg": [".mp3"], "audio/wav": [".wav"] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  return (
    <div className="file-drop-zone">
      <div {...getRootProps()}>
        <img src={fileUploadIcon} alt="file upload icon" />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag n' Drop your file here (.mp3 or .wav) or <span>click</span> to
            choose a file from your Computer
          </p>
        )}
        {file && <p>Selected file: {file.name}</p>}
      </div>
    </div>
  );
};

export default FileDragAndDrop;
