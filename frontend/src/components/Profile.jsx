import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Contact, Mail, Pen } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';

const defaultImage = "https://img.freepik.com/premium-vector/user-icon-simple-editable-vector-graphics_1178600-10766.jpg"; // Set your default image URL here

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const profileImage = user?.profile?.profilePhoto || defaultImage;

    return (
        <div>
            
            {/* Wrapper div with background image */}
            <div style={{
                backgroundImage: `url('https://img.freepik.com/free-photo/top-view-notebook-doughnut-desk_23-2148415036.jpg?t=st=1742747458~exp=1742751058~hmac=ea0162bed0522b9b6f14bdd7896f16d11e72ae7758fa81fba9b1a1a098248c24&w=740')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                padding: '1rem', // Add padding for spacing
            }}>
                <Navbar />
                <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8'>
                    <div className='flex flex-col sm:flex-row sm:justify-between gap-4'>
                        <div className='flex items-center gap-4'>
                            <div className='relative'>
                                <Avatar className="h-24 w-24 sm:h-28 sm:w-28">
                                    <AvatarImage src={profileImage} alt="profile" />
                                </Avatar>
                            </div>
                            <div>
                                <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                                <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} variant="outline" className="self-start sm:self-center">
                            <Pen />
                        </Button>
                    </div>
                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className='my-5'>
                        <h1 className='font-semibold'>Skills:</h1>
                        <div className='flex flex-wrap items-center gap-2 mt-2'>
                            {
                                user?.profile?.skills?.length > 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : "NA"
                            }
                        </div>
                    </div>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className="text-md font-bold">Resume</Label>
                        {
                            user?.profile?.resume ? (
                                <a target='blank' href={user?.profile?.resume} className='text-blue-500 hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>
                            ) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='max-w-4xl mx-auto bg-white rounded-2xl my-6 p-4 sm:p-6'>
                    <h1 className='font-bold text-lg mb-5'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default Profile;