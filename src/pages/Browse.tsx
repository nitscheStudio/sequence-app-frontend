import { useState, useEffect } from "react";

//Component Imports
import FilterableSampleList from "../components/FilterableSampleList";
import FilterForm from "../components/FilterForm";

// Module Imports
import { fetchFromMeiliSearch } from "../modules/FetchSamples";
import { fetchLikedSamples } from "../modules/FetchSamples";

//Type imports
import { Sample } from "../types/sample";

//Icon & Image Imports
import { CgLoadbarSound } from "react-icons/cg";

type SampleData = {
  samples: Sample[];
  totalSamples: number;
  totalPages: number;
};

// type MeiliSearchParams = {
//   text?: string;
//   filter?: string;
// };

type FormValues = {
  text?: string;
  bpmRange?: number[];
  key?: string;
  scale?: string;
  genre_id?: number;
  instrument_id?: number;
  tags?: Array<{
    id: number;
    name: string;
  }>;
};

const Browse = () => {
  const [page, setPage] = useState(1);
  const [formValues, setFormValues] = useState<FormValues>({});

  const [samplesData, setSamplesData] = useState<SampleData>({
    samples: [],
    totalSamples: 0,
    totalPages: 0,
  });

  const fetchSamples = async (
    currentPage: number
  ): Promise<SampleData | void> => {
    let filterExpressions: string[] = [];

    if (formValues.genre_id) {
      filterExpressions.push(`genre_id = ${formValues.genre_id}`);
    }
    if (formValues.instrument_id) {
      filterExpressions.push(`instrument_id = ${formValues.instrument_id}`);
    }
    if (formValues.key) {
      filterExpressions.push(`key = "${formValues.key}"`);
    }
    if (formValues.scale) {
      filterExpressions.push(`scale = "${formValues.scale}"`);
    }
    if (formValues.bpmRange && formValues.bpmRange.length === 2) {
      const [minBPM, maxBPM] = formValues.bpmRange;
      filterExpressions.push(`bpm >= ${minBPM} AND bpm <= ${maxBPM}`);
    }

    const filterString = filterExpressions.join(" AND ");

    try {
      const result = await fetchFromMeiliSearch({
        indexName: "samples_index",
        searchParams: {
          text: formValues.text || "", // optionally add text search
          filter: filterExpressions.length > 0 ? filterString : undefined,
        },
        page: currentPage,
      });

      if (!result) {
        throw new Error("No data returned from MeiliSearch");
      }

      return result;
    } catch (error) {
      console.error("Error fetching from MeiliSearch:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    console.log("New page:", newPage);
    setPage(newPage);
  };

  // Form submission handler to update search parameters and reset pagination
  const handleSearch = (newFormValues: FormValues) => {
    setFormValues(newFormValues);
    setPage(1); // Reset to first page on new search
  };

  //Merge meilisearch sample data with liked samples ids to display sample likes
  useEffect(() => {
    const fetchAndMergeData = async () => {
      // Fetch samples from MeiliSearch
      const samplesData = await fetchSamples(page);
      // Fetch liked sample IDs
      const likedIds = await fetchLikedSamples();

      // Merge the liked status into samples
      if (samplesData) {
        const mergedSamples = samplesData.samples.map((sample) => ({
          ...sample,
          isLikedByCurrentUser: likedIds.includes(sample.id),
        }));

        setSamplesData({ ...samplesData, samples: mergedSamples });
      }
    };

    fetchAndMergeData();
  }, [page, formValues]);

  return (
    <>
      <h1 className="sample-form-headline">
        <CgLoadbarSound />
        Browse All Samples
      </h1>

      <div className="browse-main-container">
        <section className="filter-sample-container">
          <div className="filter-sample-wrapper">
            <h3>Filter:</h3>
            <FilterForm onSearch={handleSearch} />
          </div>
        </section>
        <section className="filter-sample-container">
          <FilterableSampleList
            samplesData={samplesData}
            showEditButton={false}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        </section>
      </div>
    </>
  );
};

export default Browse;
