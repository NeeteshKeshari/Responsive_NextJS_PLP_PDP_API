import React from 'react';
import Text from '../../../atoms/Text';

const Message = ({ title, subtitle }) => {
	return (
		<div className="flex flex-col text-center mt-10 text-sm">
			<Text content={title} weight="bold" color="primary" size='lg' />
			<Text content={subtitle} />
		</div>
	);
};

export default Message;