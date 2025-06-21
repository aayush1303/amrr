import React, { useState,useContext } from 'react';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';


const LoginPopup = ({ setShowLogin}) => {
  const {login} = useContext(AuthContext);
  const [currState, setCurrState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      currState === 'Login'
        ? 'https://amrr-backend.vercel.app/api/user/login'
        : 'https://amrr-backend.vercel.app/api/user/register';

    try {
      const res = await axios.post(endpoint, formData);
      const data = res.data;

      if (data.success) {
        if (currState === 'Login') {
          login(data.token);
          toast.success('Logged in successfully!');
          setShowLogin(false);
        } else {
          toast.success('Registered successfully! Now please log in.');
          setCurrState('Login'); // Switch to login after registration
          setFormData({ name: '', email: '', password: '' }); // Reset fields
        }
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed z-[100] w-full h-full inset-0 bg-gray-800/20 grid">
      <form
        onSubmit={handleSubmit}
        className="place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 px-[25px] py-[30px] rounded-lg"
      >
        <div className="flex justify-between items-center text-black">
          <h2 className="text-xl font-bold">{currState}</h2>
          <RxCross2 className="text-lg cursor-pointer" onClick={() => setShowLogin(false)} />
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Sign Up" && (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="outline-none border-2 border-[#c9c9c9] p-2.5 rounded-lg"
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="outline-none border-2 border-[#c9c9c9] p-2.5 rounded-lg"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="outline-none border-2 border-[#c9c9c9] p-2.5 rounded-lg"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 text-white bg-teal-600 text-[15px] cursor-pointer rounded-lg"
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-start gap-2 mt-[-15px]">
          <input className="mt-[5px]" type="checkbox" required />
          <p>
            By continuing, I agree to the terms and conditions & privacy policy.
          </p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span
              className="text-teal-600 font-bold cursor-pointer"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span
              className="text-teal-600 font-bold cursor-pointer"
              onClick={() => setCurrState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
