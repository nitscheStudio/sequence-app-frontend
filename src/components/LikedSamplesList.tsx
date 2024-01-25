import FilterableSampleList from "./FilterableSampleList";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const LikedSamplesList = () => {
  const { auth } = useContext(AuthContext);
  const { id: userId } = auth;

  return (
    <>
      <FilterableSampleList
        showEditButton={false}
        endpoint={`user/${userId}/liked-samples`}
      />
    </>
  );
};

export default LikedSamplesList;
