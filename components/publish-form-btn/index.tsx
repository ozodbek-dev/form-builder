import React from 'react'
import { Button } from '../ui/button'
import { MdOutlinePublish } from "react-icons/md";
function PublishFormBtn() {
  return (
		<Button className='gap-2 bg-gradient-to-r from bg-indigo-400 to-cyan-400'>
			<MdOutlinePublish />
			Publish
		</Button>
	);
}

export default PublishFormBtn
