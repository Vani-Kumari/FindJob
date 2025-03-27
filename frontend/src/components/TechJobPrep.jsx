import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "./shared/Navbar";
import dsaImg from '../assets/Images/DSA.png';
import systemDesignImg from '../assets/Images/System Design.png';
import aiImg from '../assets/Images/AI.png';
import mlImg from '../assets/Images/ML.jpg';
import csFundamentalsImg from '../assets/Images/computer.png';
import networksImg from '../assets/Images/CN.png';
import dbmsImg from '../assets/Images/DBMS.png';
import oopsImg from '../assets/Images/Oops.png';
import osImg from '../assets/Images/operating-system.png';


const TechJobPrep = () => {
    
        const resources = [
          {
            title: "Data Structures and Algorithms (DSA)",
            description:
              "Master the fundamentals of DSA to crack coding interviews. Practice problems, learn time complexity, and improve problem-solving skills.",
            links: [
              { text: "Striver's DSA Sheet (Free)", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/" },
              { text: "Coding Ninjas DSA Course (Paid)", url: "https://www.codingninjas.com/" },
            ],
            image: dsaImg, // Working image
          },
          {
            title: "System Design",
            description:
              "Learn how to design scalable systems, understand microservices, and prepare for system design interviews.",
            links: [
              { text: "Grokking the System Design Interview (Paid)", url: "https://www.educative.io/courses/grokking-the-system-design-interview" },
              { text: "System Design Primer (Free)", url: "https://github.com/donnemartin/system-design-primer" },
            ],
            image: systemDesignImg, // Working image
          },
          {
            title: "Artificial Intelligence (AI)",
            description:
              "Explore AI concepts, algorithms, and applications. Learn about neural networks, NLP, and computer vision.",
            links: [
              { text: "Coursera AI Specialization (Paid)", url: "https://www.coursera.org/specializations/ai" },
              { text: "Google AI Free Course (Free)", url: "https://ai.google/education/" },
            ],
            image: aiImg, // Working image
          },
          {
            title: "Machine Learning (ML)",
            description:
              "Dive into ML algorithms, data preprocessing, model training, and evaluation. Build real-world projects.",
            links: [
              { text: "Kaggle Learn (Free)", url: "https://www.kaggle.com/learn" },
              { text: "Fast.ai Course (Free)", url: "https://www.fast.ai/" },
            ],
            image: mlImg, // Working image
          },
          {
            title: "Computer Fundamentals",
            description:
              "Learn the basics of computer science, including operating systems, networking, and database management.",
            links: [
              { text: "CS50 by Harvard (Free)", url: "https://cs50.harvard.edu/" },
              { text: "Computer Networking: A Top-Down Approach (Paid)", url: "https://www.amazon.com/Computer-Networking-Top-Down-Approach-7th/dp/0133594149" },
            ],
            image: csFundamentalsImg, // Working image
          },
          {
            title: "Computer Networks",
            description:
              "Understand networking concepts, protocols, and architectures. Learn about TCP/IP, DNS, HTTP, and more.",
            links: [
              { text: "Computer Networking: A Top-Down Approach (Free PDF)", url: "https://gaia.cs.umass.edu/kurose_ross/ppt.htm" },
              { text: "Coursera Computer Networking Specialization (Paid)", url: "https://www.coursera.org/specializations/computer-networking" },
            ],
            image: networksImg, // Working image
          },
          {
            title: "Database Management Systems (DBMS)",
            description:
              "Learn about relational databases, SQL, normalization, and database design.",
            links: [
              { text: "SQL for Data Science (Free)", url: "https://www.coursera.org/learn/sql-for-data-science" },
              { text: "Database Systems: The Complete Book (Paid)", url: "https://www.amazon.com/Database-Systems-Complete-Book-2nd/dp/0131873253" },
            ],
            image: dbmsImg, // Working image
          },
          {
            title: "Object-Oriented Programming (OOPS)",
            description:
              "Master OOP concepts like classes, objects, inheritance, polymorphism, and encapsulation.",
            links: [
              { text: "Java OOP Course (Free)", url: "https://www.codecademy.com/learn/learn-java" },
              { text: "C++ OOP Course (Paid)", url: "https://www.udemy.com/course/beginning-c-plus-plus-programming/" },
            ],
            image: oopsImg, // Working image
          },
          {
            title: "Operating Systems (OS)",
            description:
              "Learn about processes, threads, memory management, file systems, and more.",
            links: [
              { text: "Operating Systems: Three Easy Pieces (Free)", url: "http://pages.cs.wisc.edu/~remzi/OSTEP/" },
              { text: "Coursera OS Specialization (Paid)", url: "https://www.coursera.org/specializations/operating-systems" },
            ],
            image: osImg, // Working image
          },
        ];

  return (
    <div className="min-h-screen bg-gradient-to-br py-8 px-4 sm:px-6 lg:px-8 bg-blue-100">
      <Navbar />
      <h1 className="text-4xl font-extrabold text-center text-[#2d2d2d] mb-4">
        🚀 Tech Job Prep Hub
      </h1>
      <p className="text-center text-gray-700 mb-12 text-lg">
        Explore essential topics to boost your tech career and ace interviews.
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {resources.map((resource, index) => (
          <Card
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <CardHeader className="p-6 flex flex-col items-center">
              <div className="bg-gradient-to-r from-[#001df88b] to-[#2575fc] p-3 rounded-full">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-14 h-14"
                />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 text-center mt-4">
                {resource.title}
              </CardTitle>
              <CardDescription className="text-gray-600 text-center mt-2 text-sm">
                {resource.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {resource.links.map((link, idx) => (
                  <Button
                    key={idx}
                    asChild
                    variant="outline"
                    className={`w-full text-sm font-semibold ${
                      idx % 2 === 0
                        ? "bg-gradient-to-r from-[#1f2bb4] to-[#062182] text-white hover:from-[#001df88b] hover:to-[#032ff1]"
                        : "border-[#1931e4cb] text-[#0016b9] hover:bg-[#f3f0fb]"
                    }`}
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.text}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TechJobPrep;
