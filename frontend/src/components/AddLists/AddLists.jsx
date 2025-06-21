import React, { useState, useEffect, useContext } from 'react';
import { FiUploadCloud } from "react-icons/fi";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AddLists = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        coverImage: null,
        additionalImages: []
    });

    const { isLoggedIn } = useContext(AuthContext);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'coverImage') {
            setFormData({ ...formData, coverImage: files[0] });
        } else if (name === 'additionalImages') {
            setFormData({ ...formData, additionalImages: Array.from(files) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('token');
            const data = new FormData();

            data.append('name', formData.name);
            data.append('type', formData.type);
            data.append('description', formData.description);
            data.append('coverImage', formData.coverImage);
            formData.additionalImages.forEach((file, idx) => {
                data.append('additionalImages', file);
            });


            const res = await axios.post('http://localhost:4000/api/list/add', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data.success) {
                toast.success('Item added successfully!');
                // Optionally reset form
                setFormData({
                    name: '',
                    type: '',
                    description: '',
                    coverImage: null,
                    additionalImages: []
                });
            } else {
                toast.error(res.data.message || 'Failed to add item');
            }
        } catch (err) {
            console.error(err);
            toast.error('Error adding item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-8">
            <div className="w-full max-w-[550px] bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-semibold text-[#07074D] mb-6">Add New Item</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block text-base font-medium text-[#07074D] mb-1">
                            Item Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter item name"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-teal-500"
                            onChange={handleChange}
                            required
                            value={formData.name}
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-base font-medium text-[#07074D] mb-1">
                            Item Type
                        </label>
                        <select
                            name="type"
                            id="type"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-teal-500"
                            onChange={handleChange}
                            required
                            value={formData.type}
                        >
                            <option value="">Select type</option>
                            <option value="shirt">Shirt</option>
                            <option value="pant">Pant</option>
                            <option value="shoes">Shoes</option>
                            <option value="sports-gear">Sports Gear</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-base font-medium text-[#07074D] mb-1">
                            Item Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows="4"
                            placeholder="Enter item description"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-teal-500"
                            onChange={handleChange}
                            required
                            value={formData.description}
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="coverImage" className="block text-base font-medium text-[#07074D] mb-1">
                            Item Cover Image
                        </label>
                        <div
                            className="w-full border-2 border-dashed border-gray-300 rounded-md py-6 px-4 text-center cursor-pointer hover:border-teal-500"
                            onClick={() => document.getElementById('coverImage').click()}
                        >
                            <FiUploadCloud className="mx-auto text-3xl text-teal-600 mb-2" />
                            <p className="text-sm text-gray-500">Drag & drop or <span className="text-teal-600 underline">browse</span></p>
                            <input
                                type="file"
                                name="coverImage"
                                id="coverImage"
                                accept="image/*"
                                className="hidden"
                                onChange={handleChange}
                                required
                            />
                            {formData.coverImage && (
                                <p className="mt-2 text-sm text-gray-600">
                                    Selected file: <span className="font-medium">{formData.coverImage.name}</span>
                                </p>
                            )}

                        </div>
                    </div>

                    <div>
                        <label htmlFor="additionalImages" className="block text-base font-medium text-[#07074D] mb-1">
                            Additional Images
                        </label>
                        <div
                            className="w-full border-2 border-dashed border-gray-300 rounded-md py-6 px-4 text-center cursor-pointer hover:border-teal-500"
                            onClick={() => document.getElementById('additionalImages').click()}
                        >
                            <FiUploadCloud className="mx-auto text-3xl text-teal-600 mb-2" />
                            <p className="text-sm text-gray-500">Drag & drop or <span className="text-teal-600 underline">browse</span></p>
                            <input
                                type="file"
                                name="additionalImages"
                                id="additionalImages"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleChange}
                            />
                            {formData.additionalImages.length > 0 && (
                                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                                    {formData.additionalImages.map((file, index) => (
                                        <li key={index} className="font-medium">{file.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!isLoggedIn || isSubmitting}
                        className={`w-full py-3 px-6 rounded-md font-semibold transition flex items-center justify-center
    ${isLoggedIn && !isSubmitting
                                ? 'bg-teal-600 text-white hover:bg-teal-700 cursor-pointer'
                                : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                    >
                        {isSubmitting ? (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                        ) : null}
                        {isSubmitting ? 'Adding...' : 'Add Item'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLists;
