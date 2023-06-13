import React from 'react'
import Icons from '../molecules/NoResult/Icons';
import Message from '../molecules/NoResult/Message';

const NoResultComponet = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col my-5 gap-5 w-full items-center justify-evenly">
        <Icons />
        <Message title={title} subtitle={subtitle} />
    </div>
  )
}
export default NoResultComponet;
