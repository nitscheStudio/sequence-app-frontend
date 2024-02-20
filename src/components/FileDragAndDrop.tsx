import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import fileUploadIcon from "../assets/file-upload-icon.svg";
import { FaCheckToSlot } from "react-icons/fa6";

type FileDragAndDropProps = {
  file: File | null;
  setFile: (file: File | null) => void;
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
    // "image/webp": [".webp"],
  },
  // Add more categories as needed
};

const FileDragAndDrop: React.FC<FileDragAndDropProps> = ({
  file,
  setFile,
  dataTypes,
}) => {
  // const [fileError, setFileError] = useState<string | null>(null);
  const [isFileDropped, setIsFileDropped] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: fileTypeMap[dataTypes],
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]); //call handleChange method from parent component
        setIsFileDropped(true);
      }
    },
  });

  useEffect(() => {
    if (file) {
      setIsFileDropped(true);
    }
  }, [file]);

  const fileTypes = Object.values(fileTypeMap[dataTypes])
    .flat()
    .map((type) => type.replace(".", "")) // remove the dot from the extension
    .join("/"); // join the extensions with a slash

  return (
    <div className="file-drop-zone">
      <div {...getRootProps()}>
        {isFileDropped ? (
          <FaCheckToSlot size="48" className="file-drag-n-drop-check" />
        ) : (
          <img src={fileUploadIcon} alt="upload icon" />
        )}
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
