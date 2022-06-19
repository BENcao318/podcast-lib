import React from 'react'
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { timeSince } from '../helpers/helpers'

function PodcastDetails({ podcastDetails }) {
  const [releaseDate, setReleaseDate] = useState('');
  const [isReadMore, setIsReadMore] = useState(false);

  useEffect(() => {
    const date = Date.parse(podcastDetails.releaseDate)
    setReleaseDate(timeSince(date));
  }, [podcastDetails.releaseDate])

  const handleClick = useCallback(() => {
    setIsReadMore(true);
  }, [])

  return (
    Object.keys(podcastDetails).length !== 0 &&
    <div className='grid grid-cols-1 gap-y-2 max-w-xs h-64'>
      <img src={podcastDetails.artworkUrl600} alt="podcast cover" className='max-w-xs rounded-lg' />
      <p className='text-left pl-3'>{releaseDate}</p>
      <hr className="border-1 border-gray-600" />
      <p className='text-left px-3'>
        {isReadMore ? podcastDetails.description : podcastDetails.description.slice(0, 123) + '...'}
      </p>
      <span className='underline cursor-pointer text-blue font-bold text-right' onClick={handleClick}>
        {isReadMore ? '' : <span>read more</span>}
      </span>
    </div>
  )
}

export default PodcastDetails