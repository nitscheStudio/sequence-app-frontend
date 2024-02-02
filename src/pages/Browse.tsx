import FilterableSampleList from "../components/FilterableSampleList";
import FilterForm from "../components/FilterForm";

const Browse = () => {
  return (
    <>
      <FilterForm />
      <FilterableSampleList showEditButton={false} endpoint="samples" />
    </>
  );
};

export default Browse;
