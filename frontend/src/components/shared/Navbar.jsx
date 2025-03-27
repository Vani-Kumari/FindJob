import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2, Menu, X, Briefcase } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const defaultImage = "https://img.freepik.com/premium-vector/user-icon-simple-editable-vector-graphics_1178600-10766.jpg";

  return (
    <div>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Briefcase className='text-[#ffffff]' />
          <h1 className='text-2xl font-extrabold tracking-tight text-[#886262]'>Career<span className='text-[#8893db]'>Craft</span></h1>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-12'>
          {user && (
            <ul className='flex font-medium items-center gap-5'>
              {user.role === 'Recruiter' ? (
                <>
                  <li><Link to="/admin/companies" className='hover:text-[#F83002] transition-colors'>Companies</Link></li>
                  <li><Link to="/admin/jobs" className='hover:text-[#F83002] transition-colors'>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className='text-lg underline hover:text-gray-700 transition-colors'>Home</Link></li>
                  <li><Link to="/jobs" className='text-lg underline hover:text-gray-700 transition-colors'>Jobs</Link></li>
                  <li><Link to="/resources" className='text-lg underline hover:text-gray-700 transition-colors'>Resources</Link></li>
                </>
              )}
            </ul>
          )}
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login"><Button variant="outline" className='cursor-pointer'>Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#63439f] hover:bg-[#6c2ed7] cursor-pointer">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>
                    <img src={defaultImage} alt="Default Avatar" className="w-full h-full object-cover" />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='w-80'>
                <div className='flex gap-4 space-y-2'>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>
                      <img src={defaultImage} alt="Default Avatar" className="w-full h-full object-cover" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullname}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                  {user.role === 'Student' && (
                    <>
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant="link"><Link to='/profile'>View profile</Link></Button>
                      </div>
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <Briefcase />
                        <Button variant="link"><Link to='/saved-jobs'>Saved Jobs</Link></Button>
                      </div>
                    </>
                  )}
                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className='md:hidden'>
          <Button variant="ghost" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white shadow-lg'>
          {user && (
            <ul className='flex flex-col font-medium items-center gap-5 py-4'>
              {user.role === 'Recruiter' ? (
                <>
                  <li><Link to="/admin/companies" className='hover:text-[#F83002] transition-colors'>Companies</Link></li>
                  <li><Link to="/admin/jobs" className='hover:text-[#F83002] transition-colors'>Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/" className='hover:text-[#F83002] transition-colors'>Home</Link></li>
                  <li><Link to="/jobs" className='hover:text-[#F83002] transition-colors'>Jobs</Link></li>
                  <li><Link to="/saved-jobs" className='hover:text-[#F83002] transition-colors'>Saved Jobs</Link></li>
                  <li><Link to="/resources" className='hover:text-[#F83002] transition-colors'>Resources</Link></li>
                </>
              )}
            </ul>
          )}
          {!user ? (
            <div className='flex flex-col items-center gap-2 pb-4'>
              <Link to="/login"><Button variant="outline" className='w-full'>Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#63439f] hover:bg-[#6c2ed7] w-full">Signup</Button></Link>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-2 pb-4'>
              <div className='flex items-center gap-2 cursor-pointer'>
                <User2 />
                <Button variant="link"><Link to='/profile'>View profile</Link></Button>
              </div>
              <div className='flex items-center gap-2 cursor-pointer'>
                <LogOut />
                <Button onClick={logoutHandler} variant="link">Logout</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
