import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from "next/link";
import Icon from "../../components/atoms/Icon";
import NoResultComponent from "../../components/organisms/NoResultComponent";

// Load data at ServerSide so that filter can be done at client side 
export const getServerSideProps = async () => {
	const apiUrl = 'https://api.escuelajs.co/api/v1/products';
	const res = await fetch(apiUrl);
	const data = await res.json();
	return {
		props: { data }
	};
}

const Shop = ({ data }) => {
	const [products, setProducts] = useState([]);
	const [fullFilteredProducts, setFullFilteredProducts] = useState([]);
	const [visibleProducts, setVisibleProducts] = useState([]);
	const [loadMoreVisible, setLoadMoreVisible] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [selectedPriceRange, setSelectedPriceRange] = useState("");
	const [filterOption, setFilterOption] = useState(false);

	// Call fetchProducts() when API data loaded
	useEffect(() => {
		fetchProducts();
	}, [products]);

	// Call filterProducts() when any filter get changed
	useEffect(() => {
		filterProducts();
	}, [selectedCategory, selectedPriceRange]);

	// Set product data
	const fetchProducts = () => {
		setProducts(data);
		filterProducts();
	};

	// Product filter logic and load 12 product at a time
	const filterProducts = () => {
		let filteredProducts = products;
		if (selectedCategory) {
			filteredProducts = filteredProducts.filter(product => product.category.name === selectedCategory);
		}
		if (selectedPriceRange) {
			const [minPrice, maxPrice] = selectedPriceRange.split("-");
			filteredProducts = filteredProducts.filter(product => product.price >= Number(minPrice) && product.price <= Number(maxPrice));
		}
		setFullFilteredProducts(filteredProducts);
		setVisibleProducts(filteredProducts.slice(0, 12));
		setLoadMoreVisible(filteredProducts.length > 12);
	};

	// Load More Logic + Animation Logic
	const handleLoadMore = () => {
		const currentLength = visibleProducts.length;
		const nextSet = fullFilteredProducts.slice(currentLength, currentLength + 12);
		const uniqueIds = new Set(visibleProducts.map(d => d.id));
		const uniqueProducts = [...visibleProducts, ...nextSet.filter(d => !uniqueIds.has(d.id))];
		setVisibleProducts(uniqueProducts);
		setLoadMoreVisible(nextSet.length >= 12);
		// Animation Code Start
		const cards = document.querySelectorAll('.productCard')
		const handleIntersection = (entries) => {
			for (const entry of entries) {
				entry.target.style.setProperty('--shown', entry.isIntersecting ? 1 : 0)
			}
		}
		const observer = new IntersectionObserver(handleIntersection)
		cards.forEach(card => observer.observe(card))
		// Animation Code End
	};

	// Categoty Change Function
	const handleCategoryFilter = (category) => {
		setSelectedCategory(category);
		setFilterOption(!filterOption);
	};

	// Price Range Change Function
	const handlePriceRangeFilter = (range) => {
		setSelectedPriceRange(range);
		setFilterOption(!filterOption);
	};

	// Load default image if any image did not load due to missing data
	const handleImageError = (e) => {
		e.target.src = "/default.webp";
	};

	// Toggle Filter Popup
	const openFilterPopup = () => {
		setFilterOption(!filterOption);
	}

	return (
		<section>
			<Head>
				<title>Shop</title>
				<meta name="description" content="List of Products" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
			</Head>
			<div className="">
				<div className="fixed left-5 tablet:left-0 top-[80px] tablet:top-0 tablet:relative z-[1]">
					<button className="primaryBtn flex flex-row items-center shadow-md hover:shadow-lg" onClick={() => openFilterPopup()}>
						<span>Filter Options</span>
						{filterOption ? <Icon name='MdKeyboardArrowUp' className='text-lg' /> : <Icon name='MdKeyboardArrowDown' className='text-lg' />}
					</button>
				</div>
				{filterOption &&
					<div className="fixed bg-lightgrey rounded-tl-none rounded-lg -mt-[15px] tablet:mt-0 w-[calc(100%-40px)] tablet:max-w-[304px] tablet:absolute z-[1]">
						<div>
							<div className="p-2 px-3 border-b border-primary font-semibold text-sm text-dark rounded-tr-lg">Filter By Category:</div>
							<div className="flex flex-col justify-start items-start">
								<button className={selectedCategory === '' ? `text-primary w-full border-b border-light text-left pl-3 py-2` : `text-dark w-full border-b border-light text-left pl-3 py-2`} onClick={() => handleCategoryFilter("")}>All</button>
								{Array.from(new Set(products.map(product => product.category.name))).map(category => (
									<button className={selectedCategory === category ? `text-primary w-full border-b border-light text-left pl-3 py-2` : `text-dark w-full border-b border-light text-left pl-3 py-2`} key={category} onClick={() => handleCategoryFilter(category)}>{category}</button>
								))}
							</div>
						</div>
						<div className="mt-3">
							<div className="p-2 px-3 border-b border-primary font-semibold text-sm text-dark rounded-tr-lg">Filter By Price Range:</div>
							<div className="flex flex-col justify-start items-start gap-2">
								<button className={selectedPriceRange === '' ? `text-primary w-full border-b border-light text-left pl-3 py-2` : `text-dark w-full border-b border-light text-left pl-3 py-2`} onClick={() => handlePriceRangeFilter('')} value="">All</button>
								<button className={selectedPriceRange === '0-100' ? `text-primary w-full border-b border-light text-left pl-3 py-2` : `text-dark w-full border-b border-light text-left pl-3 py-2`} onClick={() => handlePriceRangeFilter('0-100')} value="0-100">€0 - €100</button>
								<button className={selectedPriceRange === '100-200' ? `text-primary w-full border-b border-light text-left pl-3 py-2` : `text-dark w-full border-b border-light text-left pl-3 py-2`} onClick={() => handlePriceRangeFilter('100-200')} value="100-200">€100 - €200</button>
								<button className={selectedPriceRange === '200-300' ? `text-primary w-full border-b border-light text-left pl-3 py-2` : `text-dark w-full border-b border-light text-left pl-3 py-2`} onClick={() => handlePriceRangeFilter('200-300')} value="200-300">€200 - €300</button>
								<button className={selectedPriceRange === '300-500' ? `text-primary w-full border-b border-light text-left pl-3 py-2` : `text-dark w-full border-b border-light text-left pl-3 py-2`} onClick={() => handlePriceRangeFilter('300-500')} value="300-500">€300 - €500</button>
								<button className={selectedPriceRange === '500-1000 ' ? `text-primary w-full border-b border-light text-left pl-3 py-2` : `text-dark w-full border-b border-light text-left pl-3 py-2`} onClick={() => handlePriceRangeFilter('500-1000')} value="500+">€500 - €1000</button>
							</div>
						</div>
					</div>
				}
				<div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 mt-6 mb-10 transition-all">
					{visibleProducts.map(product => (
						<Link href={`/shop/${product?.id}`} key={product?.id} className="productCard border border-[#f4f4f4] transition-all rounded-lg shadow-md hover:shadow-lg">
							<div className="h-[150px] tablet:h-[220px] w-full relative">
								<img
									src={product?.images[0]}
									alt={product?.title}
									width={315}
									height={300}
									onError={handleImageError}
									className="w-full min-h-[150px] border-b border-lightgrey h-[150px] tablet:h-[220px] object-cover rounded-t-lg"
								/>
								<div className="absolute bottom-2 right-2 bg-darktranparent text-light text-xs p-1 px-2 rounded-full">{product?.category?.name}</div>
							</div>
							<div className="p-4 bg-[#f8f8f8]">
								<div className="font-sm text-primary leading-5">{product?.title}</div>
								<div className="text-secondary text-sm font-semibold mt-1">€{product?.price}</div>
							</div>
						</Link>
					))}
				</div>
				{visibleProducts.length === 0 &&
					<NoResultComponent title='No Result Found' subtitle='Please try different filter combination' />
				}
				<div className="w-full flex flex-row justify-center items-center my-10">
					{loadMoreVisible && <button onClick={handleLoadMore} className="primaryBtn hover:shadow-md">Load More</button>}
				</div>
			</div>
		</section>
	);
}

export default Shop;
