import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const user = useSelector(store => store.auth.user); // 🔴 Get user from Redux

    // 🔴 Redirect to home if not authenticated
    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-12">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="mb-8 text-center">
                        <h1 className="font-bold text-3xl mb-2">🎯 Create Your Company</h1>
                        <p className="text-gray-500">What would you like to name your company?</p>
                    </div>

                    <div className="mb-5">
                        <Label className="block text-lg mb-2">Company Name</Label>
                        <Input
                            type="text"
                            className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="e.g., jobhunt, abc-corp"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                        <Button
                            className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100 transition"
                            variant="outline"
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition"
                            onClick={registerNewCompany}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany;
