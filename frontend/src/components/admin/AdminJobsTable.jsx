import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const user = useSelector((store) => store.auth.user);
    const [filterJobs, setFilterJobs] = useState([]);
    const navigate = useNavigate();

    // Redirect unauthenticated users
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
            <Table>
                <TableCaption className="text-gray-600 text-sm pb-4">Your posted jobs overview</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="py-3">Company</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Posted On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow
                                key={job._id}
                                className="hover:bg-gray-50 transition-all duration-200 group"
                            >
                                <TableCell className="py-4 font-medium">{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{new Date(job?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger aria-label="More options">
                                            <MoreHorizontal className="cursor-pointer opacity-70 group-hover:opacity-100 transition-opacity" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 shadow-lg rounded-lg">
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
                                            >
                                                <Eye className="w-4 h-4 text-gray-700" aria-label="View Applicants" />
                                                <span className="text-sm text-gray-700">View Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-sm py-6 text-gray-500">
                                No jobs found {searchJobByText ? `for "${searchJobByText}"` : ''}.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
