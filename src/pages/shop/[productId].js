import React, { useState, useEffect } from "react";
import Head from 'next/head';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Icon from "../../components/atoms/Icon";

// Load product data at ServerSide
export const getServerSideProps = async (context) => {
    const id = context.params.productId;
    const apiUrl = `https://api.escuelajs.co/api/v1/products/${id}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    return {
        props: { data }
    };
};

const ProductDetailsPage = ({ data }) => {
    const [productDetails, setProductDetails] = useState([]);
    const [homeDelivery, setHomeDelivery] = useState(true);
    const [collect, setCollect] = useState(false);

    // Call fetchProductDetails when data get set
    useEffect(() => {
        fetchProductDetails();
    }, [productDetails]);

    // Set Product data 
    const fetchProductDetails = () => {
        setProductDetails(data);
    };

    // Load default image if any image did not load due to missing data
    const handleImageError = (e) => {
        e.target.src = "/default.webp";
    };

    // selctDelivery Logic
    const selctDelivery = () => {
        setHomeDelivery(true);
        setCollect(false);
    }

    // selctCollect Logic
    const selctCollect = () => {
        setCollect(true);
        setHomeDelivery(false);
    }
    return (
        <section>
            <Head>
                <title>{productDetails?.title}</title>
                <meta name="description" content={productDetails?.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Head>

            <div className='grid grid-cols-1 tablet:grid-cols-2 gap-10 mb-10'>
                <div className="p-5 pb-0 bg-lightgrey rounded-lg shadow-md">
                    {productDetails && productDetails.images &&
                        <Carousel thumbWidth={120}>
                            {productDetails.images.map(index => (
                                <div>
                                    <img
                                        src={index}
                                        onError={handleImageError}
                                        className=""
                                    />
                                </div>
                            ))}
                        </Carousel>
                    }
                </div>
                <div className="bg-lightgrey rounded-lg shadow-md">
                    <div className="m-5 border-b border-light">
                        <div className="text-sm bg-darktranparent text-light p-1 px-3 rounded-full inline-block float-right">{productDetails && productDetails.category && productDetails.category.name}</div>
                        <div className="text-lg tablet:text-3xl font-semibold text-dark leading-5">{productDetails?.title}</div>
                        <div className="text-secondary text-lg tablet:text-xl my-4 font-semibold">€{productDetails?.price}</div>
                    </div>
                    <div className="p-5 pt-0">
                        <div className="text-lg font-semibold text-dark">Product Description</div>
                        <div className="text-base text-body leading-5">{productDetails?.description}</div>
                    </div>
                    <div className="bg-[#5541a0] p-5 text-sm text-light">
                        <div>Get a PlayStation 5 Console with an Extra Controller, Select Game or €20 PlayStation Store Gift Card.</div>
                        <button className="underline">See Bundle Deals!</button>
                    </div>
                    <div className="grid grid-cols-2 p-5 gap-0 tablet:gap-5 mt-10">
                        <div className={homeDelivery ? 'bg-light shadow-md p-3 tablet:pr-3 rounded-md cursor-pointer' : 'p-3 tablet:pr-3 cursor-default rounded-md'} onClick={() => selctDelivery()}>
                            <div className="flex flex-row items-center gap-1">
                                <Icon name={homeDelivery ? 'MdOutlineRadioButtonChecked' : 'MdOutlineRadioButtonUnchecked'} className='text-primary text-2xl' />
                                <span className="text-sm whitespace-nowrap cursor-pointer tablet:text-lg font-semibold text-dark">Home Delivery</span>
                            </div>
                            <div className="mt-2 flex flex-row items-center gap-1">
                                <Icon name='MdCheck' className='text-green text-base' />
                                <span className="text-sm">In Stock</span>
                            </div>
                        </div>
                        <div className={collect ? 'bg-light shadow-md p-3 tablet:pr-3 rounded-md cursor-pointer' : 'p-3 tablet:pr-3 cursor-default rounded-md'} onClick={() => selctCollect()}>
                            <div className="flex flex-row items-center gap-1">
                                <Icon name={collect ? 'MdOutlineRadioButtonChecked' : 'MdOutlineRadioButtonUnchecked'} className='text-primary text-2xl' />
                                <span className="text-sm whitespace-nowrap cursor-pointer tablet:text-lg font-semibold text-dark">Click & Collect</span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <Icon name='MdCheck' className='text-green text-base' />
                                <span className="text-sm">In Stock</span>
                            </div>
                            <button className="text-primary text-sm underline font-semibold">Select Store</button>
                        </div>
                    </div>
                    <div className="p-5 mt-5">
                        <button className="bg-green shadow-md hover:shadow-lg text-light w-full p-3 text-center rounded-full text-base">Add To Basket</button>
                    </div>
                    <div className="p-5 mt-5">
                        <div className="flex flex-row items-center gap-1 w-full border-t border-light py-2">
                            <Icon name='MdCheck' className='text-green text-base' />
                            <span className="text-sm text-body">Home Delivery available on this item</span>
                        </div>
                        <div className="flex flex-row items-center gap-1 w-full border-t border-light py-2">
                            <Icon name='MdCheck' className='text-green text-base' />
                            <span className="text-sm text-body">Free Click & Collect within 2 hours</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ProductDetailsPage;