'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Signup Error:', error.message)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { data: signupData, error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup Error:', error.message)
    redirect('/error')
  }

   if (!signupData.session) {
    // Session is null, email confirmation required
    redirect('/check-email')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}