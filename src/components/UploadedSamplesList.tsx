import FilterableSampleList from "./FilterableSampleList";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const UploadedSamplesList = () => {
  const { auth } = useContext(AuthContext);
  const { id: userId } = auth;
  return (
    <>
      <FilterableSampleList
        showEditButton={true}
        endpoint={`user/${userId}/uploaded-samples`}
      />
    </>
  );
};

export default UploadedSamplesList;
