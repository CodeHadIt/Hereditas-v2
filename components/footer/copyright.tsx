import Link from 'next/link';
import React from 'react'

const Copyright = () => {
  return (
    <div className='border-t pt-9'>
      <p className='text-sm text-paragraph'>Copyright <span><Link href="https://codehadit.dev" className='hover:text-primary'>CodeHadit</Link></span> &copy; All Rights Reserved</p>
    </div>
  );
}

export default Copyright