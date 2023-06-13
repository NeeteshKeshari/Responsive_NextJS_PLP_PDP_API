import React, { } from "react";
import Head from 'next/head';
import Image from 'next/image'
import Link from "next/link";

const Home = () => {
	return (
		<section>
			<Head>
                <title>Lorem Lpsum | Buy Toys For Kids</title>
				<meta name="description" content="Shop your way with Ireland's biggest range of Toys, Nursery & Gaming! FREE DELIVERY over €25 ✔️ and FREE Click & Collect ✔️" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
			</Head>
			<div className="">
				<h1 className="w-full text-center font-semibold text-base tablet:text-2xl">Welcome to Lorem Lpsum</h1>
				<div className="flex flex-col tablet:flex-row gap-5 items-center justify-between tablet:justify-evenly mt-10">
					<Link href='/shop'>
						<Image
							src='/home-img-1.webp'
							alt=''
							width={400}
							height={305}
							className="rounded-lg hover:shadow-lg"
						/>
					</Link>
					<Link href='/shop'>
						<Image
							src='/home-img-2.webp'
							alt=''
							width={400}
							height={305}
							className="rounded-lg hover:shadow-lg"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
}

export default Home;