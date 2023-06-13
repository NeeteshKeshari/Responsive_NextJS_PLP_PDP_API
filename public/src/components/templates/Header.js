import { useEffect, useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from 'next/router'
import { parseCookies } from "nookies";
import Cookies from 'js-cookie'

const Header = () => {
    const { loginWebToken } = parseCookies();
    const [user, setUser] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (loginWebToken) {
            setUser(true)
        } else {
            setUser(false);
        }
    }, [loginWebToken])

	return (
		<header>
            <div className="py-3 bg-light text-center w-full border-b-4 border-primary fixed top-0 z-[3]">
                <div className="flex flex-row justify-between items-center w-full px-4 tablet:px-5 m-auto tablet:max-w-[1300px]">
                    <div className="">
                        <Link href='/'>
                            <Image
                                src='/logo-dummy.webp'
                                alt=''
                                width={122}
                                height={43}
                                className="m-auto w-[99px] transition-all tablet:w-[122px]"
                            />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center gap-3 tablet:gap-10">
                        <Link href='/shop' className="text-body tablet:text-sm whitespace-nowrap hover:text-primary">Shop</Link>
                        {!user ?
                            <div className='flex flex-row justify-center items-center gap-3 tablet:gap-5'>
                                <Link href='/Signin' className="primaryBtn whitespace-nowrap hover:shadow-md">Log In / Sign Up</Link>
                            </div>
                        :
                        <span className="text-body tablet:text-sm whitespace-nowrap hover:text-primary cursor-pointer"
                            onClick={() => {
                                Cookies.remove('loginWebToken');
                                router.push('/')
                        }}>Logout</span>
                        }
                    </div>
                </div>
            </div>
        </header>
	)
}

export default Header