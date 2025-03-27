import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import UseGetAllCompanies from "@/hooks/UseGetAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  UseGetAllCompanies();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl shadow-md">
          <Input
            className="w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="🔍 Filter companies by name"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            onClick={() => navigate("/admin/companies/create")}
          >
            ➕ New Company
          </Button>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
