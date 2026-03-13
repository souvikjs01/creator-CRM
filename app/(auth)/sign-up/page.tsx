'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { signUpAction } from '@/lib/actions/auth'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { signUpSchema } from '@/lib/zodSchemas'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/loader/SubmitButton'
import Image from 'next/image'

export default function page() {
  const [lastResult, action] = useActionState(signUpAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({formData}) {
        return parseWithZod(formData, {
            schema: signUpSchema
        })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  });

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-sm">
        <div className="flex justify-center">
          <div className="bg-red-500 rounded-2xl flex items-center justify-center">
            <Image src="/grangou-logo.png" alt='logo' width={80} height={80} className=' rounded-md'/>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[32px] font-bold text-center text-soft-black">
          Create account to Creator CRM
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-600">
          Sign up to Creator CRM
        </p>

        {/* Form */}
        <form 
            id={form.id} 
            action={action}
            onSubmit={form.onSubmit} 
            noValidate
            className="space-y-4"
        >
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-soft-black">
              First Name
            </Label>
            <Input
              type="text"
              name={fields.firstName.name}
              placeholder="Alex"
              className="w-full h-12 px-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-sm text-primary">{fields.firstName.errors}</p>
          </div>

          <div className="space-y-2">
            <Label className="block text-sm font-medium text-soft-black">
              Last Name
            </Label>
            <Input
              type="text"
              name={fields.lastName.name}
              placeholder="Hales"
              className="w-full h-12 px-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-sm text-primary">{fields.lastName.errors}</p>
          </div>

          <div className="space-y-2">
            <Label className="block text-sm font-medium text-soft-black">
              Email Address
            </Label>
            <Input
              type="email"
              name={fields.email.name}
              placeholder="alex@example.com"
              className="w-full h-12 px-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-sm text-red-500">{fields.email.errors}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-soft-black">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              name={fields.password.name}
              className="w-full h-12 px-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-sm text-red-500">{fields.password.errors}</p>
          </div>

          <SubmitButton text='Sign up'/>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600">
          Already have one?{' '}
          <Link href="/sign-in" className="text-primary hover:text-red-500 font-semibold">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  )
}
