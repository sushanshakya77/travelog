import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

interface IResetPasswordProps {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { token } = useParams();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setloading] = React.useState(false);
  const [showPassword, setshowPassword] = React.useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = React.useState(false);

  const onSubmit: SubmitHandler<IResetPasswordProps> = async (data) => {
    setloading(true);
    const { confirmPassword, ...rest } = data;
    await axios
      .post(`api/auth/resetPassword/${token}`, rest)
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
            Add New Password
          </h1>
          <p className="text-xl text-center text-gray-600">
            Enter your new password.
          </p>
          <div className="flex flex-col justify-center items-center my-3">
            <label>
              <button
                className="cursor-pointer absolute -mt-28 ml-60"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i>
                    {' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-eye-off"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="#b4b8be"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1="3" y1="3" x2="21" y2="21" />
                      <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                      <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                    </svg>
                  </i>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-eye "
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#b4b8be"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                  </svg>
                )}
              </button>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`w-80 p-2 border-2 border-gray-300 rounded-md mt-3 focus:outline-none focus:border-blue-500 ${
                  errors['password'] && 'border-red-500 focus:border-red-600 '
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </label>

            {errors && errors['password'] && (
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
                {errors && errors['password']?.message}
              </span>
            )}

            <button
              className="cursor-pointer absolute -mt-0 ml-60 "
              onClick={() => setshowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye-off"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="#b4b8be"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="3" y1="3" x2="21" y2="21" />
                  <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                  <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-eye "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#b4b8be"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                </svg>
              )}
            </button>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className={`w-80 p-2 border-2 border-gray-300 rounded-md mt-3 focus:outline-none focus:border-blue-500 ${
                errors['confirmPassword'] &&
                'border-red-500 focus:border-red-600'
              }`}
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) =>
                  value === watch('password') || 'Password does not match',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors && errors['confirmPassword'] && (
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
                {errors && errors['confirmPassword']?.message}
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
                : 'Change'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
