import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import UseGetAllJobs from "@/hooks/UseGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/Images/BG-Job.jpg';

const Home = () => {
  UseGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div>
      {/* Wrapper div with background image */}
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          minHeight: "100vh", // Use minHeight to ensure it covers the content
        }}
      >
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer /> {/* Footer is now inside the wrapper div */}
      </div>
    </div>
  );
};

export default Home;
