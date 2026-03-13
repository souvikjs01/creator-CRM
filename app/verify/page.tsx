import { buttonVariants } from '@/components/ui/button'
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card'
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Verify() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Card className=" w-95 px-5 rounded-md">
        <CardHeader className="text-center">
          <div className="mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
            <Image src="/grangou-logo.png" alt='logo' width={80} height={80} className=' rounded-md'/>
          </div>

          <CardTitle className="text-2xl text-soft-black font-bold">Check your Email</CardTitle>
          <CardDescription>
            We have sent a verifcation link to your email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 rounded-md bg-yellow-50 p-4">
            <div className="flex items-center">
              <AlertCircle className="size-5 text-soft-yellow" />

              <p className="text-sm font-medium text-soft-yellow ml-3">
                Be sure to check your spam folder!
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              className: "w-full text-soft-black",
              variant: "outline",
            })}
          >
            <ArrowLeft className="size-4 mr-2" /> Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
