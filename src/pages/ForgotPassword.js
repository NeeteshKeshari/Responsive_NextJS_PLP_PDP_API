import React, { } from "react"
import Head from 'next/head'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Label from "../components/atoms/Label";
import SignUpImage from "../components/templates/SignUpImage";
import Loader from "../components/organisms/Loader";

export default function Signin() {
    const initialValues = {
        email: ''
    };
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required')
    });
    
    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
    };
      
	return (
		<section>
            <Head>
                <title>Forgot Password</title>
                <meta name="description" content="Forgot Password" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>
            <div className="">
                <div className='relative'>
					<div className="flex flex-col iPad:flex-row tablet:max-w-[800px] m-auto iPad:mt-[100px] items-stretch">
                        <div className="w-full iPad:w-[50%] border border-primary p-5 rounded-l-lg rounded-bl-none rounded-tr-lg iPad:rounded-tr-none iPad:rounded-bl-lg pb-10 iPad:pb-5">
                            <div className="w-full text-center text-lg font-semibold mb-2">Forgot Password ?</div>
                            <div className="w-full text-center text-xs mb-10">Please enter your account email address. Instructions on how to reset your password will be sent to this address.</div>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                                {({ isSubmitting }) => (
                                    <Form>
                                    <div className="mb-4">
                                        <Label content='Email Address' />
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            className="appearance-none border border-[#ddd] rounded w-full py-2 px-3 text-[#666] text-xs leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-error text-xs mt-1" />
                                    </div>
                                    <div className="relative">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-[#0984e3] w-full text-center p-2 rounded-md text-light focus:outline-none focus:shadow-outline">
                                            {isSubmitting ? 'Submitting...' : 'Reset'}
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
                            <SignUpImage />
                        </div>
                    </div>
                    
                </div>
			</div>
		</section>
	)
}

