---
title: Setting Up SvelteKit with Supabase in VS Code
description: A comprehensive guide to setting up a SvelteKit project with Supabase integration using Visual Studio Code.
slug: c-programming-tutorial
date: 02/06/2025
author: Sahil
image: /typescript.webp
---

Welcome to this comprehensive guide on setting up SvelteKit with Supabase in Visual Studio Code! Whether you're new to SvelteKit, Supabase, or both, this tutorial will walk you through every step, from installing the necessary tools to building your first full-stack application.

## Introduction to SvelteKit and Supabase

SvelteKit is a modern framework for building fast, dynamic web applications using Svelte. Supabase is an open-source backend-as-a-service platform that provides authentication, a PostgreSQL database, storage, and more. Combining SvelteKit and Supabase allows you to quickly build powerful, full-stack applications with minimal configuration.

### Why Use SvelteKit with Supabase?

- **Rapid Development**: SvelteKit’s simplicity and Supabase’s ready-to-use backend let you focus on building features.
- **TypeScript Support**: Both tools offer first-class TypeScript support for safer, scalable code.
- **Open Source**: No vendor lock-in—both SvelteKit and Supabase are open source.
- **Real-time Features**: Supabase provides real-time database updates out of the box.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or later): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Visual Studio Code**: [Download VS Code](https://code.visualstudio.com/)
- **Git**: [Download Git](https://git-scm.com/)

## Setting Up Your Development Environment

### 1. Install VS Code Extensions

To enhance your SvelteKit development experience, install these VS Code extensions:

- **Svelte for VS Code**: Syntax highlighting, IntelliSense, and error checking for `.svelte` files.
- **Prettier**: Code formatting.
- **ESLint**: Linting for JavaScript/TypeScript.
- **Supabase**: (Optional) Manage your Supabase projects from VS Code.

You can install extensions by searching for them in the Extensions sidebar (`Ctrl+Shift+X`).

### 2. Create a New SvelteKit Project

Open your terminal in VS Code (`Ctrl+``) and run:

```bash
npm create svelte@latest my-sveltekit-app
```

Follow the prompts to select your preferences (e.g., TypeScript, ESLint, Prettier). Then, navigate into your project folder:

```bash
cd my-sveltekit-app
```

Install dependencies:

```bash
npm install
```

### 3. Initialize a Git Repository

It's good practice to use version control:

```bash
git init
git add .
git commit -m "Initial SvelteKit setup"
```

## Setting Up Supabase

### 1. Create a Supabase Account and Project

1. Go to [Supabase](https://supabase.com/) and sign up for a free account.
2. Click **New Project**.
3. Enter a project name, password, and select a region.
4. Wait for your project to be created.

### 2. Get Your Supabase API Keys

- In your Supabase dashboard, go to **Project Settings > API**.
- Note your **Project URL** and **anon public key**—you’ll need these to connect your SvelteKit app.

### 3. Install Supabase JS Client

In your SvelteKit project directory, run:

```bash
npm install @supabase/supabase-js
```

## Connecting SvelteKit to Supabase

### 1. Configure Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> **Note:** Replace the values with your actual Supabase project URL and anon key.

### 2. Initialize Supabase Client

Create a new file `src/lib/supabaseClient.js` (or `.ts` if using TypeScript):

```js
// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Building Your First Feature: User Authentication

Let's add simple sign-up and login functionality using Supabase Auth.

### 1. Create an Auth Form Component

Create `src/routes/+page.svelte` (or update the existing file):

```svelte
<script>
  import { supabase } from '$lib/supabaseClient';
  let email = '';
  let password = '';
  let message = '';

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    message = error ? error.message : 'Check your email for a confirmation link!';
  }

  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    message = error ? error.message : 'Logged in!';
  }
</script>

<h1>Supabase Auth Example</h1>
<input type="email" bind:value={email} placeholder="Email" />
<input type="password" bind:value={password} placeholder="Password" />
<button on:click={signUp}>Sign Up</button>
<button on:click={signIn}>Sign In</button>
<p>{message}</p>
```

### 2. Run Your App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. Try signing up and logging in!

## Working with Supabase Database

Let's fetch and display data from your Supabase database.

### 1. Create a Table in Supabase

- In the Supabase dashboard, go to **Table Editor**.
- Click **New Table** (e.g., `todos`).
- Add columns: `id` (int8, primary key), `task` (text), `completed` (boolean).

### 2. Insert Sample Data

Add a few rows manually or use SQL:

```sql
insert into todos (task, completed) values ('Learn SvelteKit', false), ('Connect to Supabase', true);
```

### 3. Fetch Data in SvelteKit

Update `src/routes/+page.svelte`:

```svelte
<script>
  import { supabase } from '$lib/supabaseClient';
  let todos = [];

  // Fetch todos on component mount
  onMount(async () => {
    const { data, error } = await supabase.from('todos').select('*');
    if (!error) todos = data;
  });
</script>

<h2>Todo List</h2>
<ul>
  {#each todos as todo}
    <li>
      {todo.task} {todo.completed ? '✅' : '❌'}
    </li>
  {/each}
</ul>
```

> **Tip:** Import `onMount` from `svelte` if you haven't already.

```js
import { onMount } from 'svelte';
```

## Real-time Updates with Supabase

Supabase supports real-time subscriptions. Let's listen for changes to the `todos` table.

```svelte
<script>
  import { supabase } from '$lib/supabaseClient';
  import { onMount } from 'svelte';
  let todos = [];

  onMount(async () => {
    const { data, error } = await supabase.from('todos').select('*');
    if (!error) todos = data;

    // Subscribe to changes
    const channel = supabase
      .channel('public:todos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, payload => {
        // Refetch or update todos array as needed
        todos = todos.map(todo => todo.id === payload.new.id ? payload.new : todo);
      })
      .subscribe();
  });
</script>
```

## Deploying Your SvelteKit + Supabase App

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

Set your environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the deployment dashboard.

## Troubleshooting

- **CORS Errors**: Make sure your Supabase project allows requests from your deployed domain.
- **Environment Variables Not Loading**: Double-check `.env` file names and variable prefixes (`VITE_`).
- **Auth Issues**: Ensure your Supabase Auth settings (email confirmations, providers) are configured correctly.

## Conclusion

Congratulations! You’ve set up a modern SvelteKit project with Supabase integration in Visual Studio Code. You learned how to:

- Set up your development environment
- Connect SvelteKit to Supabase
- Implement authentication and database features
- Enable real-time updates
- Deploy your app

Keep exploring SvelteKit and Supabase to build even more powerful applications. Happy coding!