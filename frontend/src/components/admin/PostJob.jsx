import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);
    const user = useSelector(store => store.auth.user); // 🔴 Get user from Redux

    // 🔴 Redirect logic
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
            <Navbar />
            <div className="flex items-center justify-center w-full px-4 py-8">
                <form onSubmit={submitHandler} className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg space-y-6">
                    <h1 className="text-xl font-bold mb-4">Post a New Job</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                placeholder="e.g. Frontend Developer"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Brief job description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                placeholder="e.g. React, Node.js"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                placeholder="e.g. ₹12,00,000 / year"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="e.g. Bengaluru, India"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                placeholder="e.g. Full-time, Remote"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                placeholder="e.g. 2+ years"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                placeholder="e.g. 3"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <div className="sm:col-span-2">
                                    <Label>Select Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => (
                                                        <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                            {company.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }
                    </div>

                    {loading ? (
                        <Button disabled className="w-full">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Post New Job
                        </Button>
                    )}

                    {companies.length === 0 && (
                        <p className="text-xs text-red-600 font-semibold text-center">
                            * Please register a company first, before posting jobs
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PostJob
