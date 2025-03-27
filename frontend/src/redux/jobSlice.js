import { createSlice } from "@reduxjs/toolkit";

// Load saved jobs from localStorage
const loadSavedJobs = () => {
    try {
        const savedState = localStorage.getItem("savedJobs");
        return savedState ? JSON.parse(savedState) : {};
    } catch (error) {
        console.log(error);
        return {};
    }
};

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        savedJobs: loadSavedJobs(), // Load saved jobs from localStorage
        filteredJobs:[],
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
            state.filteredJobs = null;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        saveJob: (state, action) => {
            const { userId, job } = action.payload;
            
            // ✅ Ensure userId exists in savedJobs, else initialize it
            if (!state.savedJobs[userId]) {
                state.savedJobs[userId] = [];
            }
            
            // ✅ Check if job is already saved
            const jobExists = state.savedJobs[userId].some(savedJob => savedJob._id === job._id);
            if (!jobExists) {
                state.savedJobs[userId].push(job);
            }
        },

        removeSavedJob: (state, action) => {
            const { userId, jobId } = action.payload;
            if (state.savedJobs[userId]) {
                state.savedJobs[userId] = state.savedJobs[userId].filter(job => job._id !== jobId);
            }
        },
        filterJobs: (state, action) => {
            const filters = action.payload || {};

            state.filteredJobs = state.allJobs.filter(job => {
                const matchRole = filters.role
                    ? (job.role?.toLowerCase().includes(filters.role.toLowerCase()) ||
                        job.title?.toLowerCase().includes(filters.role.toLowerCase()))
                    : true;

                const matchLocation = filters.location
                    ? job.location?.toLowerCase() === filters.location.toLowerCase()
                    : true;

                const matchJobType = filters.jobType
                    ? job.jobType?.toLowerCase() === filters.jobType.toLowerCase()
                    : true;

                return matchLocation && matchJobType && matchRole;
            });
        },
        clearFilteredJobs: state => {
            state.filteredJobs = null;
        }
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    saveJob,
    removeSavedJob,
    filterJobs,
    clearFilteredJobs
} = jobSlice.actions;

export default jobSlice.reducer;
