import { } from "react";
import Icon from "../atoms/Icon";

const SocialMediaButtons = () => {
	return (
		<div className=" flex flex-col gap-5 mt-5 tablet:mt-0">
            <button className="h-[37px] bg-light border border-primary hover:shadow-md rounded-md m-auto flex flex-row items-center justify-center">
                <Icon name='MdFacebook' className="rounded-sm text-primary bg-light text-[28px] w-[40px] m-auto" />
                <span className="text-xs text-light rounded-r-md w-[180px] bg-primary h-[37px] leading-9 px-5">Continue with facebook</span>
            </button>
            <button className="h-[37px] bg-light border border-primary hover:shadow-md rounded-md m-auto flex flex-row items-center justify-center">
                <Icon name='FcGoogle' className="rounded-sm bg-light text-[24px] w-[40px] m-auto" />
                <span className="text-xs text-light rounded-r-md w-[180px] bg-primary h-[37px] leading-9 px-5">Continue with Google</span>
            </button>
        </div>
	)
}

export default SocialMediaButtons