import React, { useState, useRef } from "react"
import Head from 'next/head'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from "next/link";
import SignUpImage from "../components/templates/SignUpImage";
import SocialMediaButtons from "../components/templates/SocialMediaButtons";
import Label from "../components/atoms/Label";
import Loader from "../components/organisms/Loader";
const Signup = () => {
    const [loader, setLoader] = useState(false);
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required')
    });

    const handleSubmit = (values, { setSubmitting }) => {
        setLoader(true);
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
        setLoader(false);
    };
    return (
        <section>
            <Head>
                <title>Signup</title>
                <meta name="description" content="Signup" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <div className="">
                <div className='relative'>
                    <div className="flex flex-col iPad:flex-row tablet:max-w-[800px] m-auto iPad:mt-[100px] items-stretch">
                        <div className="w-full iPad:w-[50%] border border-primary p-5 rounded-l-lg rounded-bl-none rounded-tr-lg iPad:rounded-tr-none iPad:rounded-bl-lg pb-10 iPad:pb-5">
                            <div className="w-full text-center text-lg font-semibold mb-2">Create An Account</div>
                            <div className="w-full text-center text-xs mb-10">Complete the form below.</div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="flex flex-row gap-3">
                                            <div className="mb-4 w-full">
                                                <Label content='First Name' />
                                                <Field
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Enter your first name"
                                                    className="appearance-none border border-[#ddd] rounded w-full py-2 px-3 text-[#666] text-xs leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <ErrorMessage name="firstName" component="div" className="text-error text-xs mt-1" />
                                            </div>

                                            <div className="mb-4 w-full">
                                                <Label content='Last Name' />
                                                <Field
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Enter your last name"
                                                    className="appearance-none border border-[#ddd] rounded w-full py-2 px-3 text-[#666] text-xs leading-tight focus:outline-none focus:shadow-outline"
                                                />
                                                <ErrorMessage name="lastName" component="div" className="text-error text-xs mt-1" />
                                            </div>
                                        </div>

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
                                            <Label content='Confirm Password' />
                                            <Field
                                                type="confirmPassword"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder="Enter your confirm password"
                                                className="appearance-none border border-[#ddd] rounded w-full py-2 px-3 text-[#666] text-xs leading-tight focus:outline-none focus:shadow-outline"
                                            />
                                            <ErrorMessage name="confirmPassword" component="div" className="text-error text-xs mt-1" />
                                        </div>
                                        <div className="mb-4 text-xs">
                                            We will use the details entered on this page for the purposes of creating your account. We will process your personal data in accordance with our Privacy Policy. Subscribers must be 18 or over.
                                        </div>
                                        <div className="relative">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-primary w-full text-center p-2 rounded-md text-light focus:outline-none hover:shadow-md focus:shadow-outline">
                                                {isSubmitting ? 'Submitting...' : 'Register'}
                                            </button>
                                            {isSubmitting &&
                                                <Loader />
                                            }
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        <div className="w-full iPad:w-[50%] rounded-b-lg border-t-0 iPad:border-t iPad:rounded-bl-none border border-primary bg-[#f8f7f7d1] iPad:border-l-0 p-5 flex flex-col justify-between iPad:rounded-r-lg relative">
                            <div className="absolute left-[calc(50%-18px)] -top-[18px] iPad:-left-[18px] uppercase text-xs iPad:top-2 w-9 h-9 text-center border border-primary bg-light leading-[34px] font-semibold rounded-full">
                                or
                            </div>
                            <SocialMediaButtons />
                            <div className="text-xs w-full text-center mt-5">Already have account? <Link href='/Signin' className="text-primary text-xs font-semibold hover:underline">Sign In</Link></div>
                            <SignUpImage />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;