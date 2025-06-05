import Image from 'next/image';

export default function About() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-32 bg-gray-100 dark:bg-gray-700 ">
        <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0 ">
              <div className="relative w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src="/pp.jpg"
                  alt="Profile"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col justify-center ">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About Me</h1>
              <p className="text-gray-600 dark:text-gray-50 text-lg mb-4">
                Sahil is a skilled Full-Stack Developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js). He builds scalable and user-friendly web applications, ensuring smooth front-end experiences with React and strong back-end functionality using Node.js. His expertise includes Supabase Magic Link authentication, SvelteKit routing, and Markdown integration for dynamic content.
              </p>
              <p className="text-gray-600 dark:text-gray-50 text-lg">
                 With a methodical problem-solving approach, he prioritizes clean design, accessibility, and performance, constantly refining his craft to stay ahead in modern web development.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50 dark:bg-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Projects</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-50">
              Here are my some of my projects that showcase my skills and creativity.
            </p>
          </div>
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3">
               <a href="https://wanderlust-zk95.onrender.com/listings"><img src="/th.jpg" alt="Wanderlust Project" className="w-full rounded-lg shadow-lg" /></a>
              </div>
              <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white dark:text-white">Wanderlust</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-50">
                  Wanderlust is a travel planning application that helps users discover and plan their next adventure. It features a user-friendly interface, allowing users to search for destinations, create itineraries, and share their travel experiences with others. The project showcases my skills in React, Node.js, and MongoDB.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center">
              <div className="md:w-1/3">
                <a href="https://zerodha-clone-frontend-ndqw.onrender.com/"><img src="/images.png" alt="Zerodha project" className="w-full rounded-lg shadow-lg" /></a>
              </div>
              <div className="md:w-2/3 md:pr-8 mt-8 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Zerodha</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-50">
                  Zerodha is a stock trading platform that provides users with real-time market data, portfolio management, and trading capabilities. This project demonstrates my ability to work with financial data and build responsive web applications using React and Node.js.
                </p>
              </div>
            </div>

            
          </div>
        </div>
      </section>

    </div>
  );
}
