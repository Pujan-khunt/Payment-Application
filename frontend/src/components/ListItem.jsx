import React from 'react'

function ListItem({ onClick, content}) {
  return (
    <li onClick={onClick} className='text-white text-xl bg-stone-700/30 px-4 py-2 cursor-pointer rounded-lg'>{content}</li>
  )
}

export default ListItem
