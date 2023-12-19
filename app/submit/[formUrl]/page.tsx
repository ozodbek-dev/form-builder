import { GetFormContentByUrl } from "@/actions/form";
import FormSubmitComponent from "@/components/form-submit-component";
import React from 'react'

export default async  function SubmitPage({ params }: {
  params: {
    formUrl: string,
  }
}) {
  const form = await GetFormContentByUrl(params.formUrl)
  if (!form) throw new Error("Form not found")
  const fomrContent = JSON.parse(form.content);
  return <FormSubmitComponent formUrl={params.formUrl} content={fomrContent} />;
}
