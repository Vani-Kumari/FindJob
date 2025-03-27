import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Search, Briefcase } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery, filterJobs } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const categories = [
  "Full-Stack web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Developer",
  "Graphic Designer",
  "Data Scientist",
  "Data Analyst",
  "DevOps Engineer",
  "AI/ML Engineer",
  "Cybersecurity Analyst",
];

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth); // using your auth state
  const wrapperRef = useRef(null);

  const searchJobHandler = (query) => {
    if (!user) {
      toast.warning("Please login or signup to view jobs!");
      navigate("/login");
      return;
    }
    dispatch(setSearchedQuery(query));
    dispatch(filterJobs({ location: "", jobType: "", role: query }));
    navigate("/browse");
    setShowSuggestions(false);
  };

  const handleCategoryClick = (category) => {
    searchJobHandler(category);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='text-center px-4'>
      <div className='flex flex-col gap-8 md:gap-12 my-10 md:my-16'>
        <div className='flex items-center justify-center gap-2 animate-pulse'>
          <Briefcase className='text-[#4b2df6] h-6 w-6' />
          <span className='px-4 py-1 rounded-full text-[#6742ee] text-lg md:text-xl bg-[#fee2e2]'>
            Jobs at your fingertips..!!!
          </span>
        </div>
        <h1 className='text-4xl md:text-6xl font-extrabold leading-tight'>
          Swipe, match & <br />
          land your <span className='text-[#1d2ea8f7]'>Dream Job</span>
        </h1>
        <p className='text-black font-style: italic text-base md:text-xl'>
          Discover top opportunities tailored to you. <br className='hidden md:inline' />
          Apply effortlessly and get hired faster!
        </p>

        <div ref={wrapperRef} className='flex flex-col gap-2 w-full sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto relative'>
          <div className='flex shadow-xl border border-gray-200 pl-3 rounded-full items-center bg-white'>
            <input
              type='text'
              placeholder='Search your next opportunity...'
              value={query}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => setQuery(e.target.value)}
              className='outline-none border-none w-full py-3 px-3 text-sm md:text-base rounded-l-full'
            />
            <Button
              onClick={() => searchJobHandler(query)}
              className='rounded-r-full bg-[#1d2ea8f7] p-3 hover:bg-[#3f3965] transition-colors'
            >
              <Search className='h-6 w-6 md:h-7 md:w-7' />
            </Button>
          </div>

          {showSuggestions && (
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              {categories
                .filter((cat) => cat.toLowerCase().includes(query.toLowerCase()))
                .map((category, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCategoryClick(category)}
                    className="cursor-pointer px-4 py-2 hover:bg-[#f3e8ff] text-left text-[#1d2ea8f7] transition"
                  >
                    {category}
                  </div>
                ))}
              {query && categories.filter(cat => cat.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                <div className="px-4 py-2 text-gray-400">No matches found</div>
              )}
            </div>
          )}
        </div>

        <span className='text-[#0a0a0b] text-lg font-medium mt-2'>
          🔥 Trending Jobs Updated Daily
        </span>
      </div>
    </div>
  );
};

export default HeroSection;
