import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterJobs, setSearchedQuery } from '@/redux/jobSlice';
import { toast } from 'sonner';

const category = [
    {
        title: "Full-Stack Web Developer",
        description: "Work on both frontend & backend systems.",
        icon: "https://cdn-icons-png.flaticon.com/512/2721/2721297.png"
    },
    {
        title: "Frontend Developer",
        description: "Create responsive and modern user interfaces.",
        icon: "https://cdn-icons-png.flaticon.com/512/1006/1006360.png"
    },
    {
        title: "Backend Developer",
        description: "Build and maintain server-side logic & APIs.",
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png"
    },
    {
        title: "Software Developer",
        description: "Design and develop scalable software solutions.",
        icon: "https://cdn-icons-png.flaticon.com/512/2666/2666508.png"
    },
    {
        title: "Graphic Designer",
        description: "Craft visual designs for products and branding.",
        icon: "https://cdn-icons-png.flaticon.com/512/2922/2922022.png"
    },
    {
        title: "Data Scientist",
        description: "Analyze data to gain business insights.",
        icon: "https://cdn-icons-png.flaticon.com/512/4149/4149654.png"
    },
    {
        title: "Data Analyst",
        description: "Interpret complex data and generate reports.",
        icon: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
    },
    {
        title: "DevOps Engineer",
        description: "Manage infrastructure and automate workflows.",
        icon: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png"
    },
    {
        title: "AI/ML Engineer",
        description: "Build intelligent models and AI solutions.",
        icon: "https://cdn-icons-png.flaticon.com/512/3665/3665923.png"
    },
    {
        title: "Cybersecurity Analyst",
        description: "Protect systems and networks from threats.",
        icon: "https://cdn-icons-png.flaticon.com/512/2920/2920098.png"
    }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const searchJobHandler = (query) => {
        if (!user) {
            toast.warning("Please login or signup to view jobs!");
            navigate("/login");
            return;
        }
        dispatch(setSearchedQuery(query));
        dispatch(filterJobs({ location: "", jobType: "", role: query })); 
        navigate("/browse");
    };

    return (
        <div>
            <Carousel className="w-full max-w-6xl mx-auto my-5 px-4 relative">
                <CarouselContent className="gap-4 px-1 sm:px-0">
                    {category.map((cat) => (
                        <CarouselItem 
                          key={cat.title} 
                          className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3"
                        >
                            <div
                                onClick={() => searchJobHandler(cat.title)}
                                className="cursor-pointer transition-transform hover:scale-105 shadow-md rounded-2xl border p-5 flex flex-col items-center text-center gap-3 bg-white"
                            >
                                <img src={cat.icon} alt={cat.title} className="w-14 h-14" />
                                <h3 className="text-lg font-semibold">{cat.title}</h3>
                                <p className="text-sm text-gray-500">{cat.description}</p>
                                <Button className="mt-2 bg-[#1d2ea8f7] text-white rounded-full px-4 py-2 hover:bg-[#3e446f]">
                                    View Jobs
                                </Button>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-2 sm:left-4 z-10" />
                <CarouselNext className="right-2 sm:right-4 z-10" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
