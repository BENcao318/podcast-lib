import React from 'react'
import { useNavigate } from 'react-router'

function Subscription({ subscription }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/podcasts/${subscription.track_id}`)
  }
  console.log(subscription.art_work_url_600);

  return (
    <div className='max-w-xs overflow-hidden rounded-xl shadow-2xl mx-3 mb-4 bg-neutral-100 cursor-pointer hover:border-2 border-sky-600' onClick={handleClick}>
      <img className='w-full' src={subscription.art_work_url_600} alt={`subscription Cover ${subscription.artist_name}`} />
      <div className='px-6 py-2 text-left'>
        <div className='font-bold text-base mb-2'>{subscription.name}</div>
        <p className='text-gray-600 text-xs' >{subscription.artist_name}</p>
        {/* use apple subscription preview  https://subscriptions.apple.com/us/subscription/this-american-life/id201671138?uo=4*/}
        {/* <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div> */}
      </div>
    </div>
  )
}

export default Subscription