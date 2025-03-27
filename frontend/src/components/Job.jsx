import React, { useMemo } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveJob, removeSavedJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const savedJobs = useSelector(state => state.job.savedJobs);

    const userSavedJobs = useMemo(() => {
        return user ? savedJobs[user._id] || [] : [];
    }, [savedJobs, user?._id]);

    const isJobSaved = useMemo(() => {
        return userSavedJobs.some(saved => saved._id === job._id);
    }, [userSavedJobs, job._id]);

    const handleSaveJob = (e) => {
        e.stopPropagation();
        if (!user) {
            toast.warning("Please login to save jobs!");
            navigate('/login');
            return;
        }

        if (!isJobSaved) {
            dispatch(saveJob({ userId: user._id, job }));
        }
    };

    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        if (!user) {
            toast.warning("Please login to save jobs!");
            navigate('/login');
            return;
        }

        if (!isJobSaved) {
            dispatch(saveJob({ userId: user._id, job }));
        } else {
            dispatch(removeSavedJob({ userId: user._id, jobId: job._id }));
        }
    };

    const handleCardClick = () => {
        navigate(`/jobs/description/${job?._id}`);
    };

    const handleDetailsClick = (e) => {
        e.stopPropagation();
        if (!user) {
            toast.warning("Please login to view job details!");
            navigate('/login');
            return;
        }
        navigate(`/jobs/description/${job?._id}`);
    };

    const daysAgo = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    };

    return (
        <div 
            className='p-5 rounded-2xl shadow-lg bg-white border border-gray-100 transition-transform hover:scale-[1.02] duration-300 flex flex-col justify-between h-full cursor-pointer'
            onClick={handleCardClick}
        >
            {/* Top section */}
            <div className='flex items-center justify-between'>
                <p className='text-xs md:text-sm text-gray-600'>
                    {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
                </p>
                <Button 
                    variant={isJobSaved ? "default" : "outline"} 
                    className='rounded-full' 
                    size="icon" 
                    onClick={handleBookmarkClick}
                >
                    <Bookmark className={isJobSaved ? "fill-current text-[#6A38C2]" : ""} />
                </Button>
            </div>

            {/* Company info */}
            <div className='flex items-center gap-3 my-4'>
                <Avatar className="w-12 h-12">
                    <AvatarImage src={job?.company?.logo} alt="logo" />
                </Avatar>
                <div>
                    <h1 className='font-semibold text-base md:text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            {/* Job info */}
            <div>
                <h1 className='font-bold text-lg md:text-xl my-2'>{job?.title}</h1>
                <p className='text-sm md:text-base text-gray-600 line-clamp-3'>{job?.description}</p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge variant="ghost" className='text-blue-700 font-semibold'>{job?.position} positions</Badge>
                <Badge variant="ghost" className='text-[#6c1400] font-semibold'>{job?.jobType}</Badge>
                <Badge variant="ghost" className='text-[#7209b7] font-semibold'>{job?.salary} LPA</Badge>
            </div>

            {/* Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 mt-5'>
                <Button onClick={handleDetailsClick} variant="outline">
                    Details
                </Button>
                <Button 
                    onClick={handleSaveJob}
                    className={`w-full sm:w-auto transition-colors ${
                        isJobSaved ? "bg-green-600 hover:bg-green-700" : "bg-[#1d2ea8f7] hover:bg-[#3f3965]"
                    }`}
                >
                    {isJobSaved ? "Saved" : "Save for Later"}
                </Button>
            </div>
        </div>
    );
};

export default Job;
