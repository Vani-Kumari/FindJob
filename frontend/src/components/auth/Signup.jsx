import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: ""
  });

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.role) {
      return toast.error("Please select a role (Student or Recruiter)");
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className='flex flex-col md:flex-row items-center justify-center px-4 py-10 gap-0'> {/* Removed gap */}
        {/* Image Section */}
        <div className='w-full md:w-1/2 flex justify-center items-center'>
          <img
            src="https://img.freepik.com/free-vector/biophilic-design-workspace-abstract-concept-illustration-biophilic-room-eco-friendly-workspace-green-office-design-trend-bring-outdoors-indoors-vertical-garden_335657-114.jpg?t=st=1742727764~exp=1742731364~hmac=97a3f5535b91b74c57813d007b731cb69371ceec57ad60e512e75f16eb3dd072&w=826"
            alt="Job..."
            className='w-full max-w-md md:max-w-lg lg:max-w-xl'
          />
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/2 flex justify-center'>
          <form onSubmit={submitHandler} className='w-full max-w-lg bg-white shadow-xl rounded-2xl p-8'>
            <h1 className='font-bold text-2xl mb-6 text-center text-gray-700'>Create Your Account</h1>

            <div className='space-y-4'>
              <div className='flex flex-col gap-2'>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeHandler}
                  placeholder="Enter Full Name"
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeHandler}
                  placeholder="Enter valid Email"
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeHandler}
                  placeholder="Enter 10-digit Phone Number"
                  maxLength={10}
                  pattern="\d{10}"
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeHandler}
                  placeholder="Enter Strong Password"
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Role</Label>
                <div className='flex gap-6'>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="Student"
                      checked={input.role === 'Student'}
                      onChange={changeHandler}
                      className="cursor-pointer"
                    />
                    <Label>Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="role"
                      value="Recruiter"
                      checked={input.role === 'Recruiter'}
                      onChange={changeHandler}
                      className="cursor-pointer"
                    />
                    <Label>Recruiter</Label>
                  </div>
                </div>
              </div>

              {loading ? (
                <Button className="w-full mt-4">
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait...
                </Button>
              ) : (
                <Button type="submit" className="w-full mt-4">Sign up</Button>
              )}

              <p className='text-center text-sm mt-2'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;