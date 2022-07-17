import React from 'react'
import { useRouter } from 'next/router';

function Secret() {
  const router = useRouter()
  const {id} = router.query
  return (
    <div>Secret ID: {id}</div>
  )
}

export default Secret