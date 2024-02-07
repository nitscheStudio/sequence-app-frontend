import FilterableSampleList from "../components/FilterableSampleList";
import FilterForm from "../components/FilterForm";

const Browse = () => {
  return (
    <>
      <section className="filter-sample-container">
        <h1>Filter All Samples</h1>
        <div>
          <FilterForm />
        </div>
        <section className="sample-list-container">
          <FilterableSampleList showEditButton={false} endpoint="samples" />
        </section>
      </section>
    </>
  );
};

export default Browse;
