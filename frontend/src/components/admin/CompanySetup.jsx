import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import UseGetCompanyById from '@/hooks/UseGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    UseGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const user = useSelector(store => store.auth.user); // 🔴 Added this
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 🔴 Redirect if user is not authenticated
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null
        })
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-10">
                <form onSubmit={submitHandler} className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8">
                        <Button
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            variant="outline"
                            className="flex items-center gap-2 text-gray-600 hover:bg-gray-100"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-2xl text-gray-800">Company Setup</h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter company name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Short description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                placeholder="e.g. https://company.com"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                placeholder="e.g. New York, USA"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-1"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        {loading ? (
                            <Button disabled className="w-full flex justify-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                Update Company
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
