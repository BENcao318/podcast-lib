import useSWR from 'swr'

import serverAPI from '../hooks/useAxios'
import Podcasts from '../components/Podcasts'

import loadingB from '../assets/loadingB.svg'


const fetcher = (url) => {
  return serverAPI(url).then((response) => response.data.results)
}

const HomeSection = () => {
  const { data } = useSWR('/podcasts', fetcher)

  return (
    <section className='justify-self-center gap-12 w-8/12'>
      <h1 className='font-bold text-3xl mb-12 mt-6'>Top Podcasts</h1>
      {data && data.length === 0 ?
        <div className='font-bold text-lg mt-28'>
          <img src={loadingB} alt="loading animation" className='mx-auto mt-64' />
          Please allow 15 ~ 20 secconds for Heroku server to start up. If no contents showing after 20 seconds, refresh the page to load them up.
        </div>
        :
        <Podcasts podcasts={data} />
      }
      <div className='h-36'></div>
    </section>
  )
}

export default HomeSection