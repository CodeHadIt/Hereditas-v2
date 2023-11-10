import React from 'react'
import Brand from './brand'
import Links from './Links'
import Copyright from './copyright'

const Footer = () => {
  return (
    <footer className="bg-background border-t pt-14 pb-9 px-6">
      <div className="flex flex-col gap-2 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-14 md:gap-10 justify-between items-center md:items-start pb-28">
          <Brand />
          <Links />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}

export default Footer