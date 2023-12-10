import { GetFormById } from '@/actions/form'
import React from 'react'

export default async function BuilderPage({ params }: {
  params: {
    id: string
  }
}) {
  const form = await GetFormById(Number(params.id))
  return (
    <div>
      
    </div>
  )
}
