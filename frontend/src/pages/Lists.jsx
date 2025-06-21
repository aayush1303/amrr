import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEye, FiX } from "react-icons/fi";
import { Dialog } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { toast } from 'react-toastify';

const Lists = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://amrr-backend.vercel.app/api/list/my', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.data.success) {
          setItems(res.data.items);
        }
      } catch (err) {
        console.error('Failed to fetch items', err);
      }
    };

    fetchItems();
  }, []);


  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEnquiry = async () => {
    if (!userEmail) return toast.warn('Please enter your email');
    setIsSubmitting(true);

    try {

      const res = await axios.post('http://localhost:4000/api/enquiry', {
        itemId: selectedItem._id,
        itemName: selectedItem.name,
        userEmail,
        message
      });

      if (res.data.success) {
        toast.success('Enquiry email sent!');
        setIsOpen(false);
      } else {
        toast.error('Failed to send enquiry');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error sending enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };


  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#07074D] mb-6">View Items</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              <img
                src={item.coverImage}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <button
                  onClick={() => openModal(item)}
                  className="text-teal-600 hover:text-teal-800"
                  aria-label="View item details"
                >
                  <FiEye size={20} className='cursor-pointer' />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded p-6 space-y-4 relative">
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute cursor-pointer top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
                  aria-label="Close modal"
                >
                  <FiX size={24} />
                </button>

                <Dialog.Title className="text-2xl font-bold">{selectedItem.name}</Dialog.Title>
                <p className="text-sm text-gray-600">{selectedItem.description}</p>
                <Swiper spaceBetween={10} slidesPerView={1} className="rounded-md">
                  <SwiperSlide>
                    <img
                      src={selectedItem.coverImage}
                      alt="Cover"
                      className="w-full h-64 object-cover rounded"
                    />
                  </SwiperSlide>
                  {selectedItem.additionalImages?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={`Additional ${i}`}
                        className="w-full h-64 object-cover rounded"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full border rounded p-2"
                />
                <textarea
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border rounded p-2 mt-2"
                />
                <button
                  onClick={handleEnquiry}
                  disabled={isSubmitting}
                  className={`mt-4 px-4 py-2 rounded text-white font-medium flex items-center justify-center transition
    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 cursor-pointer'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Enquire'
                  )}
                </button>

              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </div>
    </>
  );
};

export default Lists;
