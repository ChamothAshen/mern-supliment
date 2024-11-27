import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: 'shan',
    description: 'ashrnunjkdkdokdkkidnjvvjhf',
    category: '',
    brand: '',
    regularPrice: '0',
    discountPrice: '',
    stock: '0',
    dosageForm: 'tablet',
    available: false,
    offer: false,
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    setFormData((prevFormData) => {
      if (type === 'checkbox') {
        if (id === 'available') {
          return {
            ...prevFormData,
            available: checked,
            offer: !checked ? prevFormData.offer : false,
          };
        } else if (id === 'offer') {
          return {
            ...prevFormData,
            offer: checked,
            available: !checked ? prevFormData.available : false,
          };
        }
      }

      if (type === 'number' || type === 'text' || e.target.tagName.toLowerCase() === 'textarea') {
        return {
          ...prevFormData,
          [id]: value,
        };
      }
      return prevFormData;
    });
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create a Listing</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                <input
                  type="text"
                  id="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <textarea
                  type="text"
                  id="description"
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    id="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <input
                    type="text"
                    id="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <input
                type="text"
                id="dosageForm"
                placeholder="Dosage Form"
                value={formData.dosageForm}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Pricing & Stock</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    id="regularPrice"
                    placeholder="Regular Price"
                    value={formData.regularPrice}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <input
                    type="number"
                    id="stock"
                    placeholder="Stock Quantity"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <input
                  type="number"
                  id="discountPrice"
                  placeholder="Discount Price (optional)"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Images</h2>
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={handleImageSubmit}
                  className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg"
                >
                  Upload Images
                </button>
                {imageUploadError && (
                  <p className="text-red-500 mt-2">{imageUploadError}</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt="Product Image"
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Availability</h2>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="available"
                    name="available"
                    checked={formData.available}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <label htmlFor="available">Available</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="offer"
                    name="offer"
                    checked={formData.offer}
                    onChange={handleChange}
                    className="w-5 h-5"
                  />
                  <label htmlFor="offer">Offer</label>
                </div>
              </div>
              <button
                disabled={loading || uploading}
              className='w-full p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
                     {loading ? 'Creating...' : 'Create listing'}
          </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
