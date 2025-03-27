import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import UseGetAllJobs from '@/hooks/UseGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Job from './Job';

const Browse = () => {
    UseGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div style={{
            backgroundImage: `url('https://img.freepik.com/free-photo/top-view-notebook-doughnut-desk_23-2148415036.jpg?t=st=1742747458~exp=1742751058~hmac=ea0162bed0522b9b6f14bdd7896f16d11e72ae7758fa81fba9b1a1a098248c24&w=740')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            padding: "1rem", // Add padding for spacing
          }}>
            {/* Back Button */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6'>
                <button 
                    onClick={() => navigate('/')} 
                    className='flex items-center text-lg font-medium text-gray-700 hover:text-[#6c2ed7] transition-colors mb-6'
                >
                    <ArrowLeft className='mr-2' />
                    Back to Home
                </button>
            </div>

            {/* Jobs Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <h1 className='font-bold text-xl mb-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {allJobs.length > 0 ? (
                        allJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    ) : (
                        <p className='text-gray-600 text-lg col-span-full text-center'>No jobs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Browse;
