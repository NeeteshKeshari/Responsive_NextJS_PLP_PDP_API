import '../styles/globals.css'
import Header from '../components/templates/Header'
import Footer from '../components/templates/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <section className='bg-light text-body'>
			<Header />
		<main className='w-full min-h-[600px] tablet:min-h-[700px] desktop:min-h-[900px] p-5 m-auto block tablet:max-w-[1300px] mt-[80px]'>
			<Component {...pageProps} />
		</main>
			<Footer />
    </section>
  )
}

export default MyApp
