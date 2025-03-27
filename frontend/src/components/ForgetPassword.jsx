import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/forgot-password`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Reset link sent to your email");
        setEmail('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-center items-center h-[80vh] px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Forgot Password?</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Enter your email address and we will send you a link to reset your password.
          </p>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>

            <p className="text-center text-sm mt-2">
              <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
