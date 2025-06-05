---
title: How To Setup And Use Next.js With Supabase In VSCode
description: This is JavaScript tutorial and this is for learning JavaScript
slug: cpp-programming-tutorial
date: 04/06/2025
author: Sahil
image: https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
---

# How To Setup And Use Next.js With Supabase In VSCode: A Comprehensive Guide

Welcome to this comprehensive tutorial on setting up and using Next.js with Supabase in Visual Studio Code! Whether you're new to full-stack development or looking to integrate a modern backend with your Next.js app, this guide will walk you through every step, from installation to building advanced features.

## Introduction to Next.js and Supabase

Next.js is a powerful React framework for building fast, scalable web applications with features like server-side rendering, static site generation, and API routes. Supabase is an open-source backend-as-a-service platform that provides authentication, a PostgreSQL database, storage, and real-time subscriptions.

Combining Next.js and Supabase allows you to build robust, full-stack applications with ease.

### Why Use Next.js with Supabase?

- **Full-Stack Simplicity**: Easily connect your frontend and backend.
- **TypeScript Support**: Both tools offer strong TypeScript integration.
- **Real-Time Features**: Supabase enables real-time data updates.
- **Open Source**: No vendor lock-in.
- **Scalability**: Both platforms are designed for production-scale apps.

## Setting Up Your Development Environment

Before you start, make sure you have the following installed:

- **Node.js** (v18 or later): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Visual Studio Code**: [Download VS Code](https://code.visualstudio.com/)
- **Git**: [Download Git](https://git-scm.com/)

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Supabase** (optional, for managing Supabase projects)
- **Tailwind CSS IntelliSense** (if using Tailwind)

Install extensions from the Extensions sidebar (`Ctrl+Shift+X`).

---

## Creating a New Next.js Project

Open your terminal in VS Code (`Ctrl+``) and run:

```bash
npx create-next-app@latest my-nextjs-app
```

Follow the prompts to set up your project (choose TypeScript if you want type safety). Then, navigate into your project folder:

```bash
cd my-nextjs-app
```

Install dependencies:

```bash
npm install
```

Initialize a Git repository:

```bash
git init
git add .
git commit -m "Initial Next.js setup"
```

---

## Setting Up Supabase

### 1. Create a Supabase Account and Project

1. Go to [Supabase](https://supabase.com/) and sign up for a free account.
2. Click **New Project**.
3. Enter a project name, password, and select a region.
4. Wait for your project to be created.

### 2. Get Your Supabase API Keys

- In your Supabase dashboard, go to **Project Settings > API**.
- Note your **Project URL** and **anon public key**—you’ll need these to connect your Next.js app.

### 3. Install Supabase JS Client

In your Next.js project directory, run:

```bash
npm install @supabase/supabase-js
```

---

## Connecting Next.js to Supabase

### 1. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Note:** Replace the values with your actual Supabase project URL and anon key.

### 2. Initialize Supabase Client

Create a new file `lib/supabaseClient.js` (or `.ts` if using TypeScript):

```js
// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## Building Your First Feature: User Authentication

Let's add sign-up and login functionality using Supabase Auth.

### 1. Create an Auth Form Component

Create `components/AuthForm.js`:

```jsx
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : 'Check your email for a confirmation link!');
  };

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : 'Logged in!');
  };

  return (
    <div>
      <h2>Supabase Auth Example</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <p>{message}</p>
    </div>
  );
}
```

### 2. Use the Auth Form in a Page

Edit `pages/index.js`:

```jsx
import AuthForm from '../components/AuthForm';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js + Supabase</h1>
      <AuthForm />
    </div>
  );
}
```

### 3. Run Your App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Try signing up and logging in!

---

## Working with Supabase Database

Let's fetch and display data from your Supabase database.

### 1. Create a Table in Supabase

- In the Supabase dashboard, go to **Table Editor**.
- Click **New Table** (e.g., `todos`).
- Add columns: `id` (int8, primary key), `task` (text), `completed` (boolean).

### 2. Insert Sample Data

Add a few rows manually or use SQL:

```sql
insert into todos (task, completed) values ('Learn Next.js', false), ('Connect to Supabase', true);
```

### 3. Fetch Data in Next.js

Create `components/TodoList.js`:

```jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from('todos').select('*');
      if (!error) setTodos(data);
    };
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task} {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Add `<TodoList />` to your `pages/index.js` to display the list.

---

## Real-Time Updates with Supabase

Supabase supports real-time subscriptions. Let's listen for changes to the `todos` table.

Update `components/TodoList.js`:

```jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from('todos').select('*');
      if (!error) setTodos(data);
    };
    fetchTodos();

    const channel = supabase
      .channel('public:todos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, payload => {
        setTodos(prev =>
          prev.map(todo => (todo.id === payload.new.id ? payload.new : todo))
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <h2>Todo List (Real-Time)</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.task} {todo.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Using Next.js API Routes with Supabase

You can use Next.js API routes to interact with Supabase securely (e.g., for server-side logic).

Create `pages/api/add-todo.js`:

```js
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { task } = req.body;
    const { data, error } = await supabase.from('todos').insert([{ task, completed: false }]);
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

---

## Deploying Your Next.js + Supabase App

### 1. Prepare for Deployment

- Commit your code:
  ```bash
  git add .
  git commit -m "Add Supabase integration"
  ```
- Push to GitHub or your preferred Git provider.

### 2. Deploy to Vercel or Netlify

- **Vercel**: [vercel.com/import](https://vercel.com/import)
- **Netlify**: [netlify.com/new](https://app.netlify.com/start)

Set your environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the deployment dashboard.

---

## Troubleshooting

- **CORS Errors**: Make sure your Supabase project allows requests from your deployed domain.
- **Environment Variables Not Loading**: Double-check `.env.local` file and variable names.
- **Auth Issues**: Ensure your Supabase Auth settings (email confirmations, providers) are configured correctly.
- **API Route Errors**: Use server-side environment variables for sensitive keys.

---

## Conclusion

Congratulations! You’ve set up a modern Next.js project with Supabase integration in Visual Studio Code. You learned how to:

- Set up your development environment
- Connect Next.js to Supabase
- Implement authentication and database features
- Enable real-time updates
- Use API routes for backend logic
- Deploy your app

Keep exploring Next.js and Supabase to build even more powerful applications. Happy coding!