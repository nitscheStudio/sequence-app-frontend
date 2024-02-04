import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import fileUploadIcon from "../assets/file-upload-icon.svg";

type FileDragAndDropProps = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  dataTypes: DataType;
};
type DataType = "audio" | "image";

const fileTypeMap = {
  audio: {
    "audio/mpeg": [".mp3"],
    "audio/wav": [".wav"],
  },
  image: {
    "image/jpeg": [".jpeg", ".jpg"],
    "image/png": [".png"],
  },
  // Add more categories as needed
};

const FileDragAndDrop: React.FC<FileDragAndDropProps> = ({
  file,
  setFile,
  dataTypes,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: fileTypeMap[dataTypes],
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const fileTypes = Object.values(fileTypeMap[dataTypes])
    .flat()
    .map((type) => type.replace(".", "")) // remove the dot from the extension
    .join("/"); // join the extensions with a slash

  return (
    <div className="file-drop-zone">
      <div {...getRootProps()}>
        <img src={fileUploadIcon} alt="file upload icon" />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag n' Drop your file ({fileTypes}) here or <span>click</span> to
            choose a file from your Computer
          </p>
        )}
        {file && <p>Selected file: {file.name}</p>}
      </div>
    </div>
  );
};

export default FileDragAndDrop;
