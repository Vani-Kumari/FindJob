import React from 'react';
import { useSelector } from 'react-redux';
import Job from './Job';
import UseGetAllJobs from '@/hooks/UseGetAllJobs';

const LatestJobs = () => {
    UseGetAllJobs()
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto px-4 mt-8">
            <h2 className="text-3xl items-center font-bold mb-4">Latest Jobs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(allJobs) && allJobs.length > 0 ? (
                    allJobs.slice(0, 6).map((job) => (
                        <div key={job?._id}>
                            <Job job={job} />
                        </div>
                    ))
                ) : (
                    <span>No Jobs Available</span>
                )}
            </div>
        </div>
    );
}

export default LatestJobs;
