import React from 'react'
import { Link } from 'react-router-dom';
const Navbarpanal = () => {
  return (
    <div className="w-full bg-gray-100
shadow-sm py-6 flex justify-center gap-50 text-2xl text-gray-700 font-medium">
  <Link className='hover:te'>Men</Link>
  <Link>Women</Link>
  <Link>Kids</Link>
  <Link>Winter</Link>
  <Link className="text-red-500">Sale</Link>
</div>
  )
}

export default Navbarpanal



