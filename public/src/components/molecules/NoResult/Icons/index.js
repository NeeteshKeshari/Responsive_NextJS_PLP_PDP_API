import React from 'react';
import Icon from '../../../atoms/Icon';

const Icons = ({ }) => {
	return (
		<div className="flex flex-col relative">
            <Icon name='MdSearchOff' className="text-7xl absolute -left-5 top-0 text-primary" />
            <Icon name='MdFlight' className="text-lg rotate-45 text-primary ml-[1px] mt-[18px]" />
        </div>
	);
};

export default Icons;