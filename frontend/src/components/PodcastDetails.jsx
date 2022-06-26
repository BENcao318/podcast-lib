import React from 'react'
import plus from '../assets/plus.svg'
import link from '../assets/link.svg'
import checkedLogo from '../assets/checkedLogo.svg'
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { timeSince } from '../helpers/helpers'
import { useDispatch, useSelector } from 'react-redux';
import { addSubscription, removeSubscription, getSubscriptions } from '../redux/subscription'
import axios from 'axios';

const serverURL = 'http://localhost:3000/api/v1'

function PodcastDetails({ podcastDetails }) {
  const [releaseDate, setReleaseDate] = useState('')
  const [isReadMore, setIsReadMore] = useState(false)
  const dispatch = useDispatch()
  const subscriptions = useSelector((state) => state.subscription.subscriptions)

  useEffect(() => {
    const date = Date.parse(podcastDetails.releaseDate)
    setReleaseDate(timeSince(date))
  }, [podcastDetails.releaseDate])

  const handleClick = useCallback(() => {
    setIsReadMore(true);
  }, [])

  const subscribe = useCallback((e) => {
    if (subscriptions.length === 0 || !subscriptions.includes(podcastDetails.collectionName)) {
      const podcast_to_subscribe = {
        name: podcastDetails.collectionName,
        description: podcastDetails.description,
        artist_name: podcastDetails.artistName,
        art_work_url_600: podcastDetails.artworkUrl600,
        genre_ids: podcastDetails.genreIds,
        genres: podcastDetails.genres,
        track_id: podcastDetails.trackId
      }
      dispatch(addSubscription(podcast_to_subscribe))
      axios.post(`${serverURL}/subscribe`, { podcast_to_subscribe }, { withCredentials: true })
        .then((response) => {
          console.log(response.data);
        })
    }
  })

  const unSubscribe = useCallback((e) => {
    const podcast_to_unsubscribe = podcastDetails.collectionName
    dispatch(removeSubscription(podcastDetails.collectionName))
    axios.post(`${serverURL}/unsubscribe`, { podcast_to_unsubscribe }, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
      })
  })

  useEffect(() => {
    axios.get(`${serverURL}/subscriptions`, { withCredentials: true })
      .then((response) => {
        if (response.data) dispatch(getSubscriptions(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    Object.keys(podcastDetails).length !== 0 &&
    <div className='grid grid-cols-1 gap-y-2 max-w-xs h-full'>
      <img src={podcastDetails.artworkUrl600} alt="podcast cover" className='max-w-xs rounded-lg' />
      <p className='text-left pl-3'>{releaseDate}</p>
      <div className='flex justify-center gap-4'>
        {subscriptions.some((subscription) => subscription.name === podcastDetails.collectionName) ?
          <div className='border border-sky-600 rounded-xl bg-sky-600 cursor-pointer text-white hover:bg-sky-200' onClick={unSubscribe}>
            <span className='flex items-center px-2 py-0.5 mx-2 font-semibold'><img src={checkedLogo} alt="subscribed button" className='w-6 mr-1' />Subscribed</span>
          </div>
          :
          <div className='border border-sky-600 rounded-xl cursor-pointer hover:bg-sky-200' onClick={subscribe}>
            <span className='flex items-center px-2 py-0.5 mx-2 font-semibold'><img src={plus} alt="subscribe button" className='w-6 mr-1' />Subscribe</span>
          </div>
        }
        <div className='border border-sky-600 rounded-xl cursor-pointer hover:bg-sky-200'>
          <a className='flex items-center px-2 py-0.5 mx-2 font-semibold' href={podcastDetails.feedUrl} target="_blank"><img src={link} alt="internet button" className='w-6 mr-1' />Visit website</a>
        </div>
      </div>
      <hr className="border-1 border-gray-600" />
      <p className='text-left px-3'>
        {isReadMore ? podcastDetails.description : podcastDetails.description.slice(0, 123) + '...'}
      </p>
      <span className='underline cursor-pointer text-sky-600 font-semibold text-right' onClick={handleClick}>
        {isReadMore ? '' : <span>read more</span>}
      </span>
    </div>
  )
}

export default PodcastDetails