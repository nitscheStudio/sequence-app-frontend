import FilterableSampleList from "../components/FilterableSampleList";

const Browse = () => {
  return (
    <>  
      <FilterableSampleList showEditButton={false} endpoint="samples" />
    </>
  );
};

export default Browse;
