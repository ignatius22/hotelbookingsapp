import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSeachParams] = useSearchParams();
 const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);

    setSeachParams(searchParams);
  }
  return <Select options={options} onChange={handleChange} type="white" value={sortBy}/>;
}

export default SortBy;
