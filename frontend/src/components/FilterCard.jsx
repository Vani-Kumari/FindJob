import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { filterJobs, clearFilteredJobs } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    key: "location",
    Array: [
         "Bengaluru, Karnataka" ,
        "Delhi" ,
         "Hyderabad, Telangana" ,
        "Chennai,Tamil Nadu" ,
         "Noida ,Uttar Pradesh" ,
         "Gurugram, Haryana" ,
         "Pune, Maharashtra" ,
         "Mumbai, Maharashtra" ,
         "Remote" ,  
    ],
  },
  { filterType: "Job Type", key: "jobType", Array: ["Full-Time", "Part-Time"] },
  {
    filterType: "Role",
    key: "role",
    Array: [
      "Software Developer",
      "Full-Stack Web Developer",
      "Android Developer",
      "Frontend Developer",
      "Backend Developer",
      "Data Scientist",
      "Data Analyst",
    ],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    jobType: "",
    role: "",
  });

  const handleFilterChange = (key, value) => {
    const isSameValue = selectedFilters[key] === value;
    const updatedFilters = {
      ...selectedFilters,
      [key]: isSameValue ? "" : value,
    };
    setSelectedFilters(updatedFilters);
    dispatch(filterJobs(updatedFilters));
  };

  const clearAllFilters = () => {
    const cleared = { location: "", jobType: "", role: "" };
    setSelectedFilters(cleared);
    dispatch(clearFilteredJobs());
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear All Filters
        </button>
      </div>

      {filterData.map((filter) => (
        <div key={filter.key} className="mb-3">
          <h1 className="font-semibold text-md mb-1">{filter.filterType}</h1>
          <RadioGroup
            value={selectedFilters[filter.key] || ""}
            onValueChange={(value) => handleFilterChange(filter.key, value)}
          >
            {filter.Array.map((item) => (
              <div key={item} className="flex items-center space-x-2 my-0">
                <RadioGroupItem
                  value={item}
                  id={`${filter.key}-${item}`}
                  onClick={() => {
                    // toggle logic
                    if (selectedFilters[filter.key] === item) {
                      handleFilterChange(filter.key, "");
                    }
                  }}
                />
                <Label htmlFor={`${filter.key}-${item}`} className="text-sm cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
