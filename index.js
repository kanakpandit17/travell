import Head from 'next/head'
import Image from 'next/image'
import { Button } from '../components/Button'
import { NavBar } from '../components/NavBar'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { first_question } from './first_question'



export const question = (props) => {
  return (
    <div>
      {props.questions.data.map((item) => {
        return (
          <div className='container text-center'>
          <section class="text-gray-600 body-font">
      <div class="container px-4 py-20 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-7xl text-2xl font-medium title-font mb-4 text-white">Travel Quiz</h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-3xl text-slate-50">Let's find a perfect place for you.</p>
        </div>

      </div>
      <div className='flex md:ml-25'>
      <div class="ml-0.5 mt-0.5 mb-5 max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img class="w-full" src="https://www.travelmanagers.com.au/wp-content/uploads/2012/08/AdobeStock_254529936_Railroad-to-Denali-National-Park-Alaska_750x500.jpg" alt="Sunset in the mountains"></img>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">Places meant for you</div>
          <p class="text-gray-700 text-base">
            Play this Quiz and reveal a perfect place for yourself.
          </p>
          <Link href={`/question/${item.id}`}><button class="text-white bg-rose-400 border-0 py-2 px-8 focus:outline-none hover:bg-fuchsia-500 rounded text-lg">Let's Start</button></Link>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        </div>
      </div>
      </div>


    </section>
    <footer class="text-gray-600 body-font">
  <div class="bg-gray-100">
    <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p class="text-gray-500 text-sm text-center sm:text-left">© 2022 Let's Travel —
        <a  rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">Powered by Strapi</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a class="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>


</div>
        )
      }

    )}
  </div>

  )
}



{/* 
export default function Home() {
  return (
    <div className='container text-center'>
      <section class="text-gray-600 body-font">
  <div class="container px-4 py-20 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-7xl text-2xl font-medium title-font mb-4 text-white">Travel Quiz</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-3xl text-slate-50">Let's find a perfect place for you.</p>
    </div>
  </div>
  <div className='flex md:ml-25'>
  <div class="ml-0.5 mt-0.5 mb-5 max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <img class="w-full" src="https://www.travelmanagers.com.au/wp-content/uploads/2012/08/AdobeStock_254529936_Railroad-to-Denali-National-Park-Alaska_750x500.jpg" alt="Sunset in the mountains"></img>
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Places meant for you</div>
      <p class="text-gray-700 text-base">
        Play this Quiz and reveal a perfect place for yourself.
      </p>
      <Link href="./first_question"><button class="text-white bg-rose-400 border-0 py-2 px-8 focus:outline-none hover:bg-fuchsia-500 rounded text-lg">Let's Start</button></Link>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
    </div>
  </div>
  </div>
</section>
<footer class="text-gray-600 body-font">
  <div class="bg-gray-100">
    <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p class="text-gray-500 text-sm text-center sm:text-left">© 2022 Let's Travel —
        <a  rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">Powered by Strapi</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a class="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>
    </div>
    
  )
} */}

export async function getServerSideProps(context) {
  let a = await fetch("http://localhost:1337/api/questions?filters[slug]=1")
  let question = await a.json()
  console.log(question)
  return {
    props: {questions:question}, // will be passed to the page component as props
  }
}
export default question; 