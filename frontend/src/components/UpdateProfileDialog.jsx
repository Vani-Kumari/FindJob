import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.join(', '), // Convert array to string
    file: null,
    profilePhoto: null, // For new profile photo
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const changeProfilePhotoHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, profilePhoto: file });
  };

  const removeProfilePhotoHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`${USER_API_END_POINT}/remove-profile-photo`, {}, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile photo removed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error removing profile photo");
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile and upload resume or photo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="fullname" className="text-right">Name</Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="phoneNumber" className="text-right">Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="bio" className="text-right">Bio</Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="skills" className="text-right">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="file" className="text-right">Resume</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={changeFileHandler}
                className="col-span-3"
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="profilePhoto" className="text-right">Profile Photo</Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={changeProfilePhotoHandler}
                className="col-span-3"
              />
            </div>

            {/* Show current profile photo with remove option */}
            {user?.profile?.profilePhoto && (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={user.profile.profilePhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <Button variant="destructive" size="sm" type="button" onClick={removeProfilePhotoHandler}>
                  Remove Photo
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 cursor-pointer">Update</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
