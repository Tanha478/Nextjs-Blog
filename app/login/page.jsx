'use client'

import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 px-4">
    <form method="post"
    className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 space-y-4"
    >
      <div className="text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#c352c3' }}>Blog App</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Sign in with your email and password
          </p>
        </div>

      <div>
      <label htmlFor="email" className="block mb-1 font-medium text-sm">Email:</label>
      <input id="email" name="email" type="email" required className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your email"/>
      </div>
 
      <div>
      <label htmlFor="password" className="block mb-1 font-medium text-sm">Password:</label>
      <input id="password" name="password" type="password" required className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your password"/>
      </div>

<div className="flex flex-col gap-2 pt-2">
      <button type="submit" formAction={login} className="w-full bg-[#c352c3] hover:bg-purple-600 transition-colors text-white font-semibold py-2 px-4 rounded-md">Log in</button>
      <button type="submit" formAction={signup} className="w-full bg-[#c352c3] hover:bg-purple-600 transition-colors text-white font-semibold py-2 px-4 rounded-md">Sign up</button>
    </div>
    
    </form>
    </div>
  )
}