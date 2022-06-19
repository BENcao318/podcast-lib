import React from 'react'
import { useCallback, useState } from 'react'

function Episode({ episode }) {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = useCallback(() => {
    setIsReadMore(!isReadMore);
  }, [episode, isReadMore])

  return (
    <div className='mb-6 max-w-2xl text-left'>
      <p>{episode.releaseDate}</p>
      <p className='text-black font-bold text-lg'>{episode.trackName}</p>
      {isReadMore ? <span>{episode.description}</span> : <span>{`${episode.description.slice(0, 123)} ...`}</span>}
      <span className='font-medium underline text-black cursor-pointer' onClick={toggleReadMore}>
        {isReadMore ? <span className='text-right block'>Read Less</span> : <span className='ml-4'>Read More</span>}
      </span>
    </div>
  )
}

export default Episode