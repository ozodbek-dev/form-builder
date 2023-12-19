import { GetFormContentByUrl } from "@/actions/form";
import React from 'react'

export default async  function SubmitPage({ params }: {
  params: {
    formUrl: string,
  }
}) {
  const form = await GetFormContentByUrl(params.formUrl)
  if(!form) throw new Error("Form not found")
  return (
    <div>
      submit page: {params.formUrl}
    </div>
  )
}
