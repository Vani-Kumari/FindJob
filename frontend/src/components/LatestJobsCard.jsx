import React from 'react';
import { Badge } from "@/components/ui/badge";

const LatestJobsCard = ({ job }) => {
  return (
    <div className='p-5 rounded-xl shadow-md bg-white border border-gray-100 cursor-pointer transition-transform hover:scale-105 duration-300'>
      <div className='space-y-1'>
        <h1 className='font-semibold text-base sm:text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
      </div>
      <div className='mt-3 space-y-2'>
        <h1 className='font-bold text-lg sm:text-xl'>{job?.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
      </div>
      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge variant="ghost" className='text-blue-700 font-semibold'>{job?.position} positions</Badge>
        <Badge variant="ghost" className='text-[#6c1400] font-semibold'>{job?.jobType}</Badge>
        <Badge variant="ghost" className='text-[#7209b7] font-semibold'>{job?.salary} LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobsCard;
