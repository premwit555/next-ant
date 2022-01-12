import axios from 'axios'
import React from 'react'
import useSWR from 'swr'
import MemberLayout from '../../components/layouts/MemberLayout'
import { config } from '../../config'

function Bank() {
  // set api
  const fetcher = (...args) => axios.get(...args).then((res) => res.data.result)

  const { data: otpsAdmin } = useSWR(`${config.backend}/type/admin`, fetcher)
  const { data: otpsBank } = useSWR(`${config.backend}/type/bank`, fetcher)
  const { data: otpstran } = useSWR(`${config.backend}/type/tran`, fetcher)

  console.log(otpsAdmin)
  console.log(otpsBank)
  console.log(otpstran)

  return <MemberLayout></MemberLayout>
}

export default Bank
