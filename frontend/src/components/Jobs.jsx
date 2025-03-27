import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, filteredJobs } = useSelector((store) => store.job);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  // Prioritize filteredJobs if available
  const jobsToDisplay = Array.isArray(filteredJobs) ? filteredJobs : allJobs;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/jobs");
        console.log("API Response -->", res.data);
        // Adjust this based on your API response structure
        dispatch(setAllJobs(res.data.jobs || []));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!Array.isArray(allJobs) || allJobs.length === 0) {
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [dispatch, allJobs.length]);

  return (
    <div
      className="bg-blue-100"
    >
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 ">
        {/* Button for small screens */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowFilter(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar on larger screens */}
          <div className="hidden md:block md:w-1/4">
            <FilterCard />
          </div>

          {/* Main content */}
          <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
            {loading ? (
              <span className="text-center text-2xl w-full mt-10 block">
                Loading Jobs...
              </span>
            ) : jobsToDisplay.length === 0 ? (
              <span className="text-center text-2xl w-full mt-10 block">
                Jobs Not Found
              </span>
            ) : (
              <motion.div
                key={filteredJobs ? "filtered" : "all"} // re-trigger animation on filter change
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <AnimatePresence mode="wait">
                  {jobsToDisplay.map((job) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Popup for small screens */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-3/4 sm:w-1/2 h-full p-5 relative">
            <button
              onClick={() => setShowFilter(false)}
              className="absolute top-3 right-3 text-xl font-bold"
            >
              ✕
            </button>
            <FilterCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
