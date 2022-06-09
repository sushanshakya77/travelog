import { CssBaseline, Grid } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IForgotPasswordProps {
  email: string;
}

const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<IForgotPasswordProps> = async (data) => {
    console.log(data);
    await axios.post('api/auth/forgotPassword', data).then((res) => res.data);
  };

  return (
    <div className="flex content-center justify-center ">
      <img
        src="https://source.unsplash.com/user/lucabravo"
        alt="bg"
        className="h-screen w-screen object-cover bg-cover brightness-50 absolute"
      />
      <div className="flex w-2/4 bg-slate-200 z-50 relative py-8 px-10 top-52 rounded-md content-center justify-center">
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
              className="w-80 p-2 border-2 border-gray-300 rounded-md my-3 focus:outline-none"
              {...register('email')}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={handleSubmit(onSubmit)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
