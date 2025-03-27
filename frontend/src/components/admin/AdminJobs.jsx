import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import UseGetAllAdminJobs from "@/hooks/UseGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { useSelector } from "react-redux";

const AdminJobs = () => {
  UseGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user); // adjust this according to your auth state structure

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 my-8">
        {/* Search & Create */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <Input
            className="md:w-1/2 w-full"
            placeholder="Search by job title or role"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="w-full md:w-auto"
            onClick={() => navigate("/admin/jobs/create")}
          >
            + New Job
          </Button>
        </div>

        {/* Jobs Table */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
