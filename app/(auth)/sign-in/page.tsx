'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Utensils } from 'lucide-react'
import Link from 'next/link'
import { signInAction, signUpAction } from '@/lib/actions/auth'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { signInSchema } from '@/lib/zodSchemas'
import { Label } from '@/components/ui/label'
import SubmitButton from '@/components/loader/SubmitButton'
import Image from 'next/image'


export default function page() {
  const [lastResult, action] = useActionState(signInAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({formData}) {
        return parseWithZod(formData, {
            schema: signInSchema
        })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  });

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg rounded-sm">
        <div className="flex justify-center">
          <div className="rounded-2xl flex items-center justify-center">
            <Image src="/grangou-logo.png" alt='logo' width={80} height={80} className=' rounded-md'/>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-soft-black">
          Welcome to Creator CRM
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-600">
          Sign in to Creator CRM
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
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="restaurant@example.com"
              name={fields.email.name}
              className="w-full h-12 px-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-sm text-primary">{fields.email.errors}</p>
          </div>

          <div className="space-y-2">
            <Label className="block text-sm font-medium text-soft-black">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter your password"
              name={fields.password.name}
              className="w-full h-12 px-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <p className="text-sm text-primary">{fields.password.errors}</p>
          </div>

          {/* Sign In Button */}
          <SubmitButton text='Sign in'/>
        </form>

        <p className="text-center text-gray-600">
          New account?{' '}
          <Link href="/sign-up" className="text-primary hover:text-red-500 font-semibold">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  )
}
