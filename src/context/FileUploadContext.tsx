import { createContext, useContext, useState, ReactNode } from "react";

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
