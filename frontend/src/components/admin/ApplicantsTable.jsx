import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

const shortlisting = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const navigate = useNavigate();
  const { applicants } = useSelector((store) => store.application);
  const user = useSelector((store) => store.auth.user);
  const [loadingId, setLoadingId] = useState(null);
  const [statuses, setStatuses] = useState({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const statusHandler = async (status, id) => {
    try {
      setLoadingId(id);
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setStatuses((prev) => ({
          ...prev,
          [id]: status,
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <Table>
        <TableCaption className="text-gray-500 text-sm">
          Recent Applicants List
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item._id}
                className="hover:bg-gray-50 transition-all duration-150"
              >
                <TableCell>{item?.applicant?.fullname || "NA"}</TableCell>
                <TableCell>{item?.applicant?.email || "NA"}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber || "NA"}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt
                    ? new Date(item.applicant.createdAt).toLocaleDateString()
                    : "NA"}
                </TableCell>
                <TableCell>
                  {statuses[item._id] ? (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        statuses[item._id] === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {statuses[item._id]}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">Pending</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        aria-label="More options"
                        className="p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36 p-2 space-y-1 shadow-lg rounded-md">
                      {shortlisting.map((status) => (
                        <button
                          key={status}
                          disabled={loadingId === item._id}
                          onClick={() => statusHandler(status, item._id)}
                          className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                            loadingId === item._id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {loadingId === item._id ? "Processing..." : status}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
