import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Subscriptions from '../components/Subscriptions'
import { getSubscriptions } from '../redux/subscription'

const serverURL = 'http://localhost:3000/api/v1/subscriptions'

function SubscriptionSection() {
  const dispatch = useDispatch()
  const subscriptions = useSelector((state) => state.subscription.subscriptions)

  useEffect(() => {
    axios.get(serverURL, { withCredentials: true })
      .then((response) => {
        if (response.data) dispatch(getSubscriptions(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  console.log(subscriptions);

  return (
    <section>
      <div>
        SubscriptionSection
      </div>
      <Subscriptions subscriptions={subscriptions} />
    </section>
  )
}

export default SubscriptionSection