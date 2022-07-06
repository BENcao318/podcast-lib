import { useEffect, useState } from 'react'
import serverAPI from '../hooks/useAxios'
import loadingB from '../assets/loadingB.svg'

import Podcasts from '../components/Podcasts'

const HomeSection = () => {
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    serverAPI.get(`/podcasts`)
      .then((response) => {
        setPodcasts([...response.data.results])
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <section className='justify-self-center gap-12 w-8/12'>
      <h1 className='font-bold text-3xl mb-12 mt-6'>Top Podcasts</h1>
      {podcasts.length === 0 ?
        <div className='font-bold text-lg mt-28'>
          <img src={loadingB} alt="loading animation" className='mx-auto mt-64' />
          Please allow 15 ~ 20 secconds for Heroku server to start up. If no contents showing after 20 seconds, refresh the page to load them up.
        </div>
        :
        <Podcasts podcasts={podcasts} />
      }
      <div className='h-36'></div>
    </section>
  )
}

export default HomeSection