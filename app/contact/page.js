'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
   const form = e.currentTarget; // ✅ Save it here
  const formData = new FormData(form);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    })

    if (res.ok) {
      setStatus('✅ Message sent successfully!')
      form.reset();
    } else {
      setStatus('❌ Failed to send message. Try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 max-w-lg p-6 rounded-2xl shadow-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 space-y-4"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-purple-600">Contact Us</h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4">
          Send us your message and we’ll get back to you soon.
        </p>

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-2 px-4 rounded-md"
        >
          Send Message
        </button>

        {status && <p className="text-center mt-2 text-sm">{status}</p>}
      </form>
    </div>
  )
}
