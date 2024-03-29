import serverAPI from '../hooks/useAxios'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { timeSince } from '../helpers/helpers'
import { useDispatch, useSelector } from 'react-redux'
import {
  addSubscription,
  removeSubscription,
  getSubscriptions,
} from '../redux/subscription'

import plus from '../assets/plus.svg'
import link from '../assets/link.svg'
import checkedLogo from '../assets/checkedLogo.svg'
import GenreBox from './GenreBox'

import { PodcastDetailsInterface } from '../utils/interfaces'
import { ReduxStateInterface } from '../utils/interfaces'

interface Props {
  podcastDetails: PodcastDetailsInterface
}

const PodcastDetails: React.FC<Props> = ({ podcastDetails }) => {
  const [releaseDate, setReleaseDate] = useState('')
  const [isReadMore, setIsReadMore] = useState(false)
  const [warning, setWarning] = useState(false) //detail
  const timeoutRef: { current: NodeJS.Timeout | null | number } = useRef(null) // For creating a subscription warning when the user is not logged in
  const dispatch = useDispatch()
  const subscriptions = useSelector(
    (state: ReduxStateInterface) => state.subscription.subscriptions
  )
  const userStatus = useSelector((state: ReduxStateInterface) => state.user)

  useEffect(() => {
    const date = Date.parse(podcastDetails.releaseDate)
    setReleaseDate(timeSince(date)) //detail
  }, [podcastDetails.releaseDate])

  const handleClick = () => {
    setIsReadMore(true)
  }

  const subscribe = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (userStatus.logged_in) {
      const podcast_to_subscribe = {
        name: podcastDetails.collectionName,
        description: podcastDetails.description,
        artist_name: podcastDetails.artistName,
        art_work_url_600: podcastDetails.artworkUrl600,
        genre_ids: podcastDetails.genreIds,
        genres: podcastDetails.genres,
        track_id: podcastDetails.trackId,
      }

      serverAPI.post(`/subscribe`, { podcast_to_subscribe }).then(() => {
        dispatch(addSubscription(podcast_to_subscribe))
      })
    } else {
      setWarning(true)
      timeoutRef.current = setTimeout(() => {
        setWarning(false)
      }, 2000)
    }
  }, [podcastDetails, dispatch, userStatus.logged_in])

  const unSubscribe = useCallback(() => {
    const podcast_to_unsubscribe = podcastDetails.collectionName

    serverAPI.post(`/unsubscribe`, { podcast_to_unsubscribe }).then(() => {
      dispatch(removeSubscription(podcastDetails.collectionName))
    })
  }, [podcastDetails, dispatch])

  useEffect(() => {
    if (userStatus.logged_in) {
      serverAPI
        .get(`/subscriptions`)
        .then((response) => {
          if (response.data) dispatch(getSubscriptions(response.data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [dispatch, userStatus.logged_in])

  return (
    <>
      {Object.keys(podcastDetails).length !== 0 && (
        <div className="grid h-full max-w-xs grid-cols-1 gap-y-2">
          <img
            src={podcastDetails.artworkUrl600}
            alt="podcast cover"
            className="max-w-xs rounded-lg"
          />
          <p className="pl-3 text-left">{releaseDate}</p>
          <div className="flex justify-center gap-4">
            {subscriptions.some(
              (subscription: any) =>
                subscription.name === podcastDetails.collectionName
            ) ? (
              <div
                className="text-white border cursor-pointer border-sky-600 rounded-xl bg-sky-600 hover:bg-sky-200"
                onClick={unSubscribe}
              >
                <span className="flex items-center px-2 py-0.5 mx-2 font-semibold">
                  <img
                    src={checkedLogo}
                    alt="subscribed button"
                    className="w-6 mr-1"
                  />
                  Subscribed
                </span>
              </div>
            ) : (
              <div
                className="border cursor-pointer border-sky-600 rounded-xl hover:bg-sky-200"
                onClick={subscribe}
              >
                <span className="flex items-center px-2 py-0.5 mx-2 font-semibold">
                  <img src={plus} alt="subscribe button" className="w-6 mr-1" />
                  Subscribe
                </span>
              </div>
            )}
            <div className="border cursor-pointer border-sky-600 rounded-xl hover:bg-sky-200">
              <a
                className="flex items-center px-2 py-0.5 mx-2 font-semibold"
                href={podcastDetails.collectionViewUrl}
              >
                <img src={link} alt="internet button" className="w-6 mr-1" />
                visit website
              </a>
            </div>
          </div>
          {warning && (
            <div className="py-2 text-lg bg-sky-600 font-base rounded-xl text-neutral-200">
              Please log in before subscribe
            </div>
          )}
          <hr className="border-gray-600 border-1" />
          <div className="flex justify-start my-2">
            <GenreBox podcastGenres={podcastDetails.genres} />
          </div>
          <p className="px-3 text-left">
            {isReadMore
              ? podcastDetails.description
              : podcastDetails.description.slice(0, 123) + '...'}
          </p>
          <span
            className="font-semibold text-right underline cursor-pointer text-sky-600"
            onClick={handleClick}
          >
            {isReadMore ? '' : <span>read more</span>}
          </span>
        </div>
      )}
    </>
  )
}

export default PodcastDetails
