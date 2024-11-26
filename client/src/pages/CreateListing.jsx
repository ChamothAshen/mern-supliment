import { useState } from 'react';

export default function CreateListing() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    regularPrice: '0',
    discountPrice: '',
    stock: '0',
    dosageForm: '',
    available: false,
    offer: false,
    imageUrls: [],
    userRef: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      imageUrls: urls,
    }));
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
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                
                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Pricing & Stock</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="regularPrice"
                    placeholder="Regular Price"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock Quantity"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                
                <input
                  type="number"
                  name="discountPrice"
                  placeholder="Discount Price (optional)"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Available</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="offer"
                    checked={formData.offer}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Special Offer</span>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Images</h2>
                <p className="text-gray-600">Upload up to 6 images. First image will be the cover.</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <label className="cursor-pointer">
                    <div className="space-y-2">
                      <div className="text-gray-600">Click to upload images</div>
                      <div className="text-sm text-gray-500">(Max 6 images)</div>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {formData.imageUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.imageUrls.map((url, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden border">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Additional Details</h2>
                <input
                  type="text"
                  name="dosageForm"
                  placeholder="Dosage Form"
                  value={formData.dosageForm}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                
                <input
                  type="text"
                  name="userRef"
                  placeholder="User Reference"
                  value={formData.userRef}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <button
                 onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
             >
            Create Listing
          </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

