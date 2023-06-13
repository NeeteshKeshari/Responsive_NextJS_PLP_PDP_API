import React from "react";
import { MdSearch, MdFacebook, MdKeyboardArrowUp, MdKeyboardArrowDown, MdSearchOff, MdCheck, MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const icons = {
	MdSearch, FcGoogle, MdFacebook, MdKeyboardArrowUp, MdKeyboardArrowDown, MdSearchOff, MdCheck, MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked
};

const Icon = ({ name, className }) => {
	const IconComponent = icons[name];
	if (!IconComponent) return null;
	return <IconComponent className={className} />;
};


export default Icon;