import FilterableSampleList from "../components/FilterableSampleList";
import FilterForm from "../components/FilterForm";

const Browse = () => {
  return (
    <>
      <FilterForm />
      <section className="sample-list-container">
        <FilterableSampleList showEditButton={false} endpoint="samples" />
      </section>
    </>
  );
};

export default Browse;
