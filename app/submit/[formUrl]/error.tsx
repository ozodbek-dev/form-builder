"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

function ErrorPage({ error }: { error: Error }) {
	useEffect(() => console.error(error), [error]);

  return <div className='flex w-full h-full  flex-col items-center justify-center gap-4'>
    <h1 className='text-4xl font-bold'>Something went wrong!</h1>
    {
      error.message && <p className='text-lg'>{error.message}</p>
    }
    <Button asChild>
    <Link href={"/"}>Go back to home</Link>
    </Button>
  </div>;
}

export default ErrorPage;
