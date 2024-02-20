import FilterableSampleList from "./FilterableSampleList";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { fetchFromAPI } from "../modules/FetchSamples";
import { Sample } from "../types/sample";

type SampleData = {
  samples: Sample[];
  totalSamples: number;
  totalPages: number;
};

const UploadedSamplesList = () => {
  const { auth } = useContext(AuthContext);
  const { id: userId } = auth;
  const [page, setPage] = useState(1);

  const fetchSamples = async (page: number): Promise<SampleData | void> => {
    try {
      const result = await fetchFromAPI({
        endpoint: `user/${userId}/uploaded-samples`,
        page: page,
      });

      if (!result) {
        throw new Error("Error fetching Samples");
      }
      const samples: Sample[] = result[0];
      const totalSamples: number = result[1];
      const totalPages: number = result[2];

      return { samples, totalSamples, totalPages };
    } catch {
      console.error("Error fetching Samples");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <FilterableSampleList
        fetchSamples={fetchSamples}
        showEditButton={true}
        onPageChange={handlePageChange}
        currentPage={page}
      />
    </>
  );
};

export default UploadedSamplesList;
