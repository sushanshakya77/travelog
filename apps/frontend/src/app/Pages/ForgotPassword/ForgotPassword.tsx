import { CssBaseline, Grid } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface IForgotPasswordProps {
  email: string;
}

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [loading, setloading] = React.useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IForgotPasswordProps> = async (data) => {
    setloading(true);
    await axios
      .post('api/auth/forgotPassword', data)
      .then((res) => res.data)
      .finally(() => setloading(false));
  };

  return (
    <div className="flex content-center justify-center ">
      <img
        src="https://source.unsplash.com/user/lucabravo"
        alt="bg"
        className="h-screen w-screen object-cover bg-cover brightness-50 absolute"
      />
      <div className="flex w-1/4 bg-slate-200 z-50 relative py-8 px-10 top-52 rounded-md content-center justify-center">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-3xl font-bold text-center text-gray-900 my-3">
            Forgot Password
          </h1>
          <p className="text-xl text-center text-gray-600">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
          <div className="flex flex-col justify-center items-center my-3">
            <input
              type="email"
              placeholder="Email"
              className={`w-80 p-2 border-2 border-gray-300 rounded-md mt-3 focus:outline-none focus:border-blue-500 ${
                errors['email'] && 'border-red-500 focus:border-red-600'
              }`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors && errors['email'] && (
              <span className="w-full flex mt-1 text-sm text-red-600 items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-alert-triangle"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ff2825"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 9v2m0 4v.01" />
                  <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
                </svg>
                {errors && errors['email']?.message}
              </span>
            )}

            <button
              type="submit"
              className={`w-full bg-indigo-500 my-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${
                loading && 'opacity-50 cursor-not-allowed'
              }`}
              onClick={handleSubmit(onSubmit)}
            >
              {loading
                ? // <svg
                  //   className="animate-spin h-5 w-5 mr-3 ..."
                  //   viewBox="0 0 24 24"
                  // ></svg>
                  'Loading...'
                : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
