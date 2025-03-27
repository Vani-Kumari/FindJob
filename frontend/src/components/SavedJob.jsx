import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';
import { removeSavedJob } from '@/redux/jobSlice';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';

const SavedJob = () => {
    const { user } = useSelector(state => state.auth);
    const { savedJobs } = useSelector(state => state.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userSavedJobs = user ? savedJobs[user._id] || [] : [];

    return (
        <div
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/top-view-notebook-doughnut-desk_23-2148415036.jpg?t=st=1742747458~exp=1742751058~hmac=ea0162bed0522b9b6f14bdd7896f16d11e72ae7758fa81fba9b1a1a098248c24&w=740')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "1rem", // Add padding for spacing
      }}
    >
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-center mb-5">
                    Saved <span className="text-blue-600">Jobs</span>
                </h1>

                {/* Back to Jobs Button */}
                <div className="text-center mb-6">
                    
                </div>

                {userSavedJobs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userSavedJobs.map((job) => (
                            <div key={job._id} className="p-5 rounded-xl shadow-lg bg-white border border-gray-100 flex flex-col justify-between">
                                {/* Job Created Date */}
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        {new Date(job.createdAt).toDateString()}
                                    </p>
                                </div>

                                {/* Company Info */}
                                <div className="flex items-center gap-3 my-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={job?.company?.logo} />
                                    </Avatar>
                                    <div>
                                        <h1 className="font-semibold">{job?.company?.name}</h1>
                                        <p className="text-sm text-gray-500">{job?.location}</p>
                                    </div>
                                </div>

                                {/* Job Title */}
                                <h1 className="font-bold text-lg my-2">{job?.title}</h1>

                                {/* Job Description */}
                                <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>

                                {/* Job Details (Badges) */}
                                <div className="flex flex-wrap items-center gap-2 mt-4">
                                    <Badge variant="ghost" className="text-blue-700 font-semibold">
                                        {job?.position} positions
                                    </Badge>
                                    <Badge variant="ghost" className="text-[#6c1400] font-semibold">
                                        {job?.jobType}
                                    </Badge>
                                    <Badge variant="ghost" className="text-[#7209b7] font-semibold">
                                        {job?.salary} LPA
                                    </Badge>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                                    <Button onClick={() => navigate(`/jobs/description/${job._id}`)} variant="outline">
                                        View Details
                                    </Button>
                                    <Button 
                                        onClick={() => dispatch(removeSavedJob({ userId: user._id, jobId: job._id }))} 
                                        className="bg-red-600 text-white"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <p className="text-lg">No Saved Jobs...</p>
                        <Link to="/jobs" className="text-blue-600 underline">
                            Explore Jobs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedJob;
