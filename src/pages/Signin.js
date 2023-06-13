import React, { useState } from "react"
import { setCookie, getCookie } from 'cookies-next';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";
import SignUpImage from "../components/templates/SignUpImage";
import SocialMediaButtons from "../components/templates/SocialMediaButtons";
import Label from "../components/atoms/Label";
import Loader from "../components/organisms/Loader";

const Signin = () => {
    const [loader, setLoader] = useState(false);
    const [userLogin, setUserLogin] = useState(false);
    const [userLoginError, setUserLoginError] = useState(false);
    const router = useRouter();
    const initialValues = {
        toggle: false,
        email: '',
        password: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    });

    // Get User Details after Successful Login
    async function getUserData(loginWebToken) {
        try {
            let result = await fetch(
                `https://api.escuelajs.co/api/v1/auth/profile`, {
                method: 'GET',
                headers: {
                    "Authorization": 'Bearer ' + loginWebToken
                }
            });
            const userData = await result.json();
            if (userData.status === 201 || userData.status === 200) {
                setUsername(userDetails);
            }
        } catch (error) {
            // console.log(error.message);
        }
    }

    // Login Submit Function
    const handleSubmit = async (values) => {
        setTimeout(async () => {
            setLoader(true);
            const userLogin = {
                "email": values.email,
                "password": values.password,
            }
            const result = await fetch(`https://api.escuelajs.co/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLogin)
            })
            const loginWebToken = await result.json();
            const loginWebTokenRes = loginWebToken.access_token
            console.log(loginWebTokenRes)
            if (result.status === 401) {
                console.log('Error')
                setLoader(false)
                setUserLoginError(true)
            } else {
                setUserLoginError(false);
                setCookie('loginWebToken', loginWebTokenRes);
                setUserLogin(true);
                router.push('/shop')
                getUserData(loginWebTokenRes)
            }
            setLoader(false);
        }, 400);
    };

    return (
        <section>
            <Head>
                <title>Signin</title>
                <meta name="description" content="Signin" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <div className="">
                <div className='relative'>
                    <div className="flex flex-col iPad:flex-row tablet:max-w-[800px] m-auto iPad:mt-[100px] items-stretch">
                        <div className="w-full iPad:w-[50%] border border-primary p-5 rounded-l-lg rounded-bl-none rounded-tr-lg iPad:rounded-tr-none iPad:rounded-bl-lg pb-10 iPad:pb-5">
                            <div className="w-full text-center text-lg font-semibold mb-2">Log Into Your Account</div>
                            <div className="w-full text-center text-xs mb-10">Note, if you enter your password incorrectly five times, your account will be disabled. Please reset your password or contact us if you cannot log into your account.</div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <Label content='Email' />
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your email address"
                                                className="appearance-none border border-[#ddd] rounded w-full py-2 px-3 text-[#666] text-xs leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            <ErrorMessage name="email" component="div" className="text-error text-xs mt-1" />
                                        </div>
                                        <div className="mb-4">
                                            <Label content='Password' />
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                className="appearance-none border border-[#ddd] rounded w-full py-2 px-3 text-[#666] text-xs leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            <ErrorMessage name="password" component="div" className="text-error text-xs mt-1" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="flex justify-start gap-1 items-start text-gray-700 text-xs text-[#666]">
                                                <Field type="checkbox" name="toggle" className='mt-[2px]' />
                                                Stay signed in for quicker access next time you visit our website.
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-[#0984e3] w-full text-center p-2 rounded-md text-light focus:outline-none focus:shadow-outline">
                                                {isSubmitting ? 'Submitting...' : 'Log In'}
                                                {loader &&
                                                    <Loader />
                                                }
                                            </button>
                                        </div>
                                        <Link href='/ForgotPassword' className="text-primary text-xs float-right mt-3 font-semibold hover:underline">Forgot password?</Link>
                                    </Form>
                                )}
                            </Formik>
                            {userLogin &&
                                <div className="bg-green text-light p-3 rounded-md text-xs leading-5 mt-10">Login Successfull!!</div>
                            }
                            {userLoginError &&
                                <div className="bg-error text-light p-3 rounded-md text-xs leading-5 mt-10">We could not find an account with above email and password. Please try again.</div>
                            }
                        </div>

                        <div className="w-full iPad:w-[50%] rounded-b-lg border-t-0 iPad:border-t iPad:rounded-bl-none border border-primary bg-[#f8f7f7d1] iPad:border-l-0 p-5 flex flex-col justify-between iPad:rounded-r-lg relative">
                            <div className="absolute left-[calc(50%-18px)] -top-[18px] iPad:-left-[18px] uppercase text-xs iPad:top-2 w-9 h-9 text-center border border-primary bg-light leading-[34px] font-semibold rounded-full">
                                or
                            </div>
                            <SocialMediaButtons />
                            <div className="text-xs w-full text-center my-5">You don't have an account yet? <Link href='/Signup' className="text-primary text-xs font-semibold hover:underline">Sign Up</Link></div>
                            <SignUpImage />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Signin;