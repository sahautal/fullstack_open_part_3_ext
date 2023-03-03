const FilterForm = ({ nameToFind, handleNameToFindChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={nameToFind} onChange={handleNameToFindChange} />
    </div>
  );
};

export default FilterForm;
