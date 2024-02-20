import { createContext, useContext, useState, ReactNode } from "react";

// Used to manage and keep the state of the uploaded file accross steps in the upload form

interface FileUploadContextProps {
  file: File | null;
  updateFile: (file: File | null) => void;
}

interface FileUploadProviderProps {
  children: ReactNode;
}

export const FileUploadContext = createContext<FileUploadContextProps>({
  file: null,
  updateFile: () => {},
});

export const useFileUpload = () => useContext(FileUploadContext);

export const FileUploadProvider = ({ children }: FileUploadProviderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const updateFile = (newFile: File | null) => {
    setFile(newFile);
  };

  return (
    <FileUploadContext.Provider value={{ file, updateFile }}>
      {children}
    </FileUploadContext.Provider>
  );
};
