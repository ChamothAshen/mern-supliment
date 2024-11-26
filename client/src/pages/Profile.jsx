import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase'; // Ensure you have Firebase initialized in this file
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
 import { useDispatch } from 'react-redux';
 import {updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
 } from '../redux/user/userSlice';
 import {Link} from 'react-router-dom';

 
export default function Profile() {
  const { currentUser,loading ,error } = useSelector((state) => state.user);
  const fileRef = useRef(null); // Fixed variable name consistency
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const[formData,setFormData]= useState({});
  const dispatch = useDispatch();
  console.log(updateSuccess);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app); // Ensure the app instance is initialized
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error('File upload error:', error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({...formData,avatar:downloadURL}); 
          console.log('File uploaded successfully:', downloadURL);
   
        });
      }
    );
  };
     const handleChange = (e) =>{
      setFormData({ ...formData, [e.target.id]: e.target.value });  

    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(updateUserFailure(data.message));
          return;
        }
  
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
      } catch (error) {
        dispatch(updateUserFailure(error.message));
      }
    };
    const handleDeleteUser = async () => {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };
    const handleSignOut = async () => {
      try {
        dispatch(signOutUserStart());
        const res = await fetch('/api/auth/signout');
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(data.message));
      }
    };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>
        <ul className="space-y-4">
          <li className="text-purple-600 font-medium cursor-pointer">Public Profile</li>
          <li className="text-gray-600 cursor-pointer hover:text-purple-600">
            Account Settings
          </li>
          <li className="text-gray-600 cursor-pointer hover:text-purple-600">
            Notifications
          </li>
          <li className="text-gray-600 cursor-pointer hover:text-purple-600">PRO Account</li>
        </ul>
      </aside>

      {/* Profile Content */}
      <main className="p-3 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Public Profile</h2>
        <div className="flex items-center mb-8">
          {/* Profile Picture */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-600">
            <img
              onClick={() => fileRef.current.click()}
              src={formData?.avatar || currentUser.avatar} // Fallback to default avatar
              alt="Profile"
              className="w-full h-full object-cover"
            /> 
             
          </div>
          {/* Buttons */}
          <div className="ml-6">
            <input
               onChange={(e) => setFile(e.target.files[0])}
               type='file'
               ref={fileRef}
               hidden
               accept='image/*'
            />
            
          <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
         </p>
            <button
              onClick={() => fileRef.current.click()}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
            >
              Change Picture
            </button>
            <button className="ml-4 text-red-600 py-2 px-4 rounded-lg hover:underline">
              Delete Picture
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              defaultValue={currentUser.username}
              id="username"
              onChange={handleChange}
              placeholder="Your username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              defaultValue={currentUser.email}
              id="email"
              onChange={handleChange}
              placeholder="Your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              defaultValue={currentUser.password}
              id="password" 
              onChange={handleChange} //onchange is nessasary in this error 
              placeholder="Your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
               {loading ? 'Loading...' : ' Save Changes'}
           
          </button>
           <Link
              className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              to={'/create-listing'}
            >
              Create Listing
            </Link>
        </form>

        <div className="flex justify-between mt-5">
          <span  onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
        </div>
        <p className='text-red-700 mt-5'>{error ? error : ''}</p>
       <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      </main>
      
    </div>
  );
}
