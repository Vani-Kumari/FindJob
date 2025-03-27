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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });

  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className='flex flex-col md:flex-row items-center justify-center px-4 py-10 gap-0'>
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
            <h1 className='font-bold text-2xl mb-6 text-center text-gray-700'>Login to Your Account</h1>

            <div className='space-y-4'>
              <div className='flex flex-col gap-2'>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="Enter valid Email id"
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Enter Strong Password"
                  required
                />
                <div className="text-right text-sm">
                  <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
                </div>
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
                      onChange={changeEventHandler}
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
                      onChange={changeEventHandler}
                      className="cursor-pointer"
                    />
                    <Label>Recruiter</Label>
                  </div>
                </div>
              </div>

              {loading ? (
                <Button className="w-full mt-4" disabled>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait...
                </Button>
              ) : (
                <Button type="submit" className="w-full mt-4">Login</Button>
              )}

              <p className='text-center text-sm mt-2'>Don't have an account? <Link to="/signup" className='text-blue-600'>Create Account</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
