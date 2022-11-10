
import React from 'react'
import { useRouter , useState } from 'next/router'
import  Router  from "next/router";
import Link from 'next/link'
import {useEffect,useRef} from "react"
import { addoption, deleteoption } from '../../src/redux/action-creators'
import { useDispatch, useSelector } from 'react-redux'
import {store} from '../../src/redux/store'
import {finish} from '../finish'
import {reducer} from '../../src/redux/reducers/listReducer'



const getQuestion = (questions, index) => {
  return questions[index];
};


export async function getStaticProps({params}) {
  const quiz = await getBySlug(params.slug); // First checkpoint of id => slug
  return {
      props: {
          quiz,
      }
  }
}

export async function getStaticPaths() {
  const quizzes = await getAll();
  const paths = quizzes.data.map(quiz => ({params: {slug: `${quiz.attributes.slug}`}})); // Second checkpoint of id => slug bajo mein ek aur ko kiya id => slug
  return {
      paths,
      fallback: false
  }
}
const final_select = [];
const setsaturn = false;
const daria = false;


const Slug = ({quiz}) => {  // Converted Id => Slug
    const router = useRouter()
    const main = useSelector((state) => state.main)
    const dispatch = useDispatch()
    const [index, setIndex] = React.useState(0);
    const question = getQuestion(quiz.data, index);
    const [selection, setSelection] = React.useState([])
    const [now_select , setNow_select ] = React.useState({})

    const hasPrev = () => {
      return index > 0;
    };
  
    const prevQuestion = () => {
      if (index !== 0) {
          setIndex(index - 1);
          setsaturn = true;
          // router.push(`/question/${slug_prev}`);
          window.scrollTo({top: 0});
      }
    };
    const hasNext = () => {
      return index < quiz.data.length - 1;
    };
    const nextQuestion = () => {
      if (!hasNext()) {
          finishQuiz();
      }
      else {
        setNow_select({})
        window.scrollTo({top: 0});
        if (setsaturn === true){
          var kanan = index
          dispatch(deleteoption(now_select,kanan))
          dispatch(addoption(now_select,kanan))
          setIndex(index+1)
          setsaturn = false;
          daria = false;

        }
        else if(daria == true){
          setIndex(index + 1);
          dispatch(addoption(now_select,index))
          daria = false
        }
        else{
          setIndex(index + 1);
        }
        const val = index
        // router.push(`/question/${slug_next}`) 
          // setIndex(index + 1);
          // dispatch(addoption(now_select))
          // final_select.splice(index,0,selection)
          // window.localStorage.setItem('Image_selection',JSON.stringify(final_select))
          // router.push(`/question/12`, undefined, { shallow: true })
      }
    };

    // function nextbutton(index){
    //   if (index <quiz.data.length -1){
    //     <div className='mt-56 flex flex-row'>
    //       <div>
    //         <button onClick={() => {nextQuestion() , router.push(`/question/${Number(id) + 1}`)}} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">Next</button>
    //       </div>
    //     </div>
    //   }
    //   else{
    //     <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">Submit</button>

    //   }
    // };

    useEffect ( () => {
      setSelection(now_select);
      daria = true;
    },[now_select]);

  // console.log(now_select,"Hi i am buddy")

  // useEffect( () => {
  //   nextbutton(index);
  // });

    const finishQuiz = () => {
      var position = index
      dispatch(addoption(now_select,position))
      console.log(main,"Final Answer")
      // router.push('../finish');

      alert(`Great its done.`);
    };

  return (
    <div>
                <section className="text-gray-600 body-font">    
  
  <div className="container px-5 py-24 mx-auto">
  <div className="flex justify-center md:h-48 h-30 sm:h-48 sm:mb-2 -mx-2 ">
  <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 rounded-lg bg-texture_pattern shadow-lg justify-center">
    <div className="p-2 sm:w-1/2 w-full mb-4 justify-center">
      <h5 className=" text-white text-center my-8 md:text-5xl  font-semibold mb-5 font-poppins text-4xl">{question.attributes.text},{question.attributes.slug}</h5>
    </div>
  </div>
</div>
<div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">

  
  {question.attributes.Text.map((id) => (
        <div className={`p-2 sm:w-1/2 w-full ${now_select.id ? now_select.id === id.id ? 'opacity-100' : 'opacity-25': 'opacity-100'}`}>
          <div className="flex  -m-4">
            <div className="p-4 w-full">

              <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <button onClick={() => setNow_select(id)} className=" hover:bg-slate-200 w-full focus:outline-none focus:ring">


                  <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={`http://localhost:1337${id.Answer_image.data.attributes.url}`}alt="blog"></img>


                
                <div className="p-1">
                  <div className="bg-gray-100 rounded flex p-4  h-full items-center w-full">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <span className="title-font font-medium text-2xl">{id.Option_answer}</span>
                  </div>
                </div>
                </button>
              </div>
            </div>
          </div>
        </div>
    


  ))}
  <div className='mt-56 flex flex-row'>
          <div>
          <button id="prev" disabled={index < 1}   onClick={() =>{prevQuestion()} } className=" flex  mx-auto mt-16 text-white py-2 px-8 focus:outline-nonerounded-full text-lg ">{index  ===  0? "" : "Previous"}</button>
          </div>


          <div className='space-x-4'>
          <button onClick={() => 
            {if(now_select.id)
            {nextQuestion()}
          else{
            alert('Please Select an Option')
          }
          } 
            
          }className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">{index + 1 === quiz.data.length ? "Submit" : "Next"}</button>
          </div>
  </div>

  </div>
</div>
</section>

<footer className="text-gray-600 body-font">
  <div className="bg-gray-100">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className="text-gray-500 text-sm text-center sm:text-left">© 2022 Let's Travel —
        <a  rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">Powered by Strapi</a>
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a className="text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a classNameName="ml-3 text-gray-500">
          <svg fill="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a className="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" stroke-Linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
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



const QUIZ_URLS = {
  get: 'http://localhost:1337/api/questions?populate=Text.Answer_image.data.attributes',

};


export const getAll = async () => {
  const res = await fetch(QUIZ_URLS.get);
  return await res.json();
};

export const getBySlug = async (slug) => {                          // Fifth checkpoint id => slug
  const res = await fetch(`${QUIZ_URLS.get}/${slug}`); // Sixth checkpoint id => slug
  return await res.json();
};

export default Slug ;  // Seventh checkpoint Id => Slug













// import React from 'react'
// import { useRouter , useState } from 'next/router'
// import  Router  from "next/router";
// import Link from 'next/link'
// import {useEffect,useRef} from "react"
// import { addoption, deleteoption, UserSelecOption} from '../../src/redux/action-creators'
// import { useDispatch, useSelector } from 'react-redux'
// import {store} from '../../src/redux/store'
// import {finish} from '../finish'
// import { isRejected } from '@reduxjs/toolkit';

// // import {reducer} from '../../src/redux/reducers/listReducer'




// const getQuestion = (questions, index) => {
//   return questions[index];
// };

// // if(typeof(document)!==undefined){
// // document.addEventListener('DOMContentLoaded', function () {
// //   var input = document.getElementById('now_select.id');
// //   if (localStorage['now_select.id']) { // if job is set
// //       input.value = localStorage['now_select.id']; // set the value
// //   }
// //   input.onchange = function () {
// //        localStorage['now_select.id'] = this.value; // change localStorage on change
// //    }
// // })}


// export async function getStaticProps({params}) {
//   const quiz = await getBySlug(params.slug); // First checkpoint of id => slug
//   return {
//       props: {
//           quiz,
//       }
//   }
// }

// export async function getStaticPaths() {
//   const quizzes = await getAll();
//   const paths = quizzes.data.map(quiz => ({params: {slug: `${quiz.attributes.slug}`}})); // Second checkpoint of id => slug bajo mein ek aur ko kiya id => slug
//   return {
//       paths,
//       fallback: false
//   }
// }
// const final_select = [];
// const setsaturn = false;
// const delete_flag = false;


// const Slug = ({quiz}) => {  // Converted Id => Slug
//     const router = useRouter()
//     const main = useSelector((state) => state.main)
//     const dispatch = useDispatch()
//     const [index, setIndex] = React.useState(0);
//     const question = getQuestion(quiz.data, index);
//     const [selection, setSelection] = React.useState([])
//     const [now_select , setNow_select ] = React.useState({})

//     const hasPrev = () => {
//       return index > 0;
//     };
  
//     const prevQuestion = () => {
      
//       if (index !== 0) {
//           setIndex(index - 1);
//           setsaturn = true;
//           // router.push(`/question/${slug_prev}`);
//           window.scrollTo({top: 0});
//       }
//     };
//     const hasNext = () => {
//       return index < quiz.data.length - 1;
//     };
//     const nextQuestion = () => {
//       if (!hasNext()) {
//           finishQuiz();
//       }
//       else {
//         setNow_select({})
//         // var index1 = setNow_select.selectedIndex
//         // setNow_select.selectedIndex=index1
//         window.scrollTo({top: 0});
//         if (setsaturn === true){
//           var indexposition = index
//           dispatch(deleteoption(now_select,indexposition))
//           dispatch(addoption(now_select,indexposition))
//           setIndex(index+1)
//           setsaturn = false;
//           delete_flag = false;

//         }
//         else if(delete_flag == true){
//           setIndex(index + 1);
//           dispatch(addoption(now_select,index))
//           delete_flag = false
//         }
//         else{
//           setIndex(index + 1);
//         }
//         const val = index
//         // router.push(`/question/${slug_next}`) 
//           // setIndex(index + 1);
//           // dispatch(addoption(now_select))
//           // final_select.splice(index,0,selection)
//           // window.localStorage.setItem('Image_selection',JSON.stringify(final_select))
//           // router.push(`/question/12`, undefined, { shallow: true })
//       }
//     };

//     // function nextbutton(index){
//     //   if (index <quiz.data.length -1){
//     //     <div className='mt-56 flex flex-row'>
//     //       <div>
//     //         <button onClick={() => {nextQuestion() , router.push(`/question/${Number(id) + 1}`)}} className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">Next</button>
//     //       </div>
//     //     </div>
//     //   }
//     //   else{
//     //     <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">Submit</button>

//     //   }
//     // };

//     useEffect ( () => {
//       setSelection(now_select);
//       delete_flag = true;
//     },[now_select]);

//   // console.log(now_select,"Hi i am buddy")

//   // useEffect( () => {
//   //   nextbutton(index);
//   // });

//     const finishQuiz = () => {
//       var position = index
//       dispatch(addoption(now_select,position))
//       console.log(main,"Final Answer")
//       // router.push('../finish');`

//       alert(`Great its done.`);
//     };

  

//   return (
//     <div>
//                 <section className="text-gray-600 body-font">    
  
//   <div className="container px-5 py-24 mx-auto">
//   <div className="flex justify-center md:h-48 h-30 sm:h-48 sm:mb-2 -mx-2 ">
//   <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 rounded-lg bg-texture_pattern shadow-lg justify-center">
//     <div className="p-2 sm:w-1/2 w-full mb-4 justify-center">
//       <h5 className=" text-white text-center my-8 md:text-5xl  font-semibold mb-5 font-poppins text-4xl">{question.attributes.text},{question.attributes.slug}</h5>
//     </div>
//   </div>
// </div>
// <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">

  
//   {question.attributes.Text.map((id) => (
//         <div className={`p-2 sm:w-1/2 w-full ${now_select.id ? now_select.id === id.id ? 'opacity-100' : 'opacity-25': 'opacity-100'}`}>
//           <div className="flex  -m-4">
//             <div className="p-4 w-full">

//               <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
//               <button onClick={() =>  dispatch(UserSelecOption(question.attributes, id)) } className=" hover:bg-slate-200 w-full focus:outline-none focus:ring">
              

//                   <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={`http://localhost:1337${id.Answer_image.data.attributes.url}`}alt="blog"></img>


                
//                 <div className="p-1">
//                   <div className="bg-gray-100 rounded flex p-4  h-full items-center w-full">
//                     <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
//                       <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
//                       <path d="M22 4L12 14.01l-3-3"></path>
//                     </svg>
//                     <span className="title-font font-medium text-2xl">{id.Option_answer}</span>
//                   </div>
//                 </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
    


//   ))}
  
//   <div className='mt-56 flex flex-row'>
//           <div>
//           <button id="prev" disabled={index < 1}   onClick={() =>{dispatch(Dec());prevQuestion()} } className=" flex  mx-auto mt-16 text-white py-2 px-8 focus:outline-nonerounded-full text-lg ">{index  ===  0? "" : "Previous"}</button>
//           </div>


//           <div className='space-x-4'>
//           <button onClick={() => 
//             {if(now_select.id)
//             {dispatch(Inc()); nextQuestion()}
//           else{
//             alert('Please Select an Option')
//           }
//           } 
            
//           }className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">{index + 1 === quiz.data.length ? "Submit" : "Next"}</button>
//           </div>
//   </div>

//   </div>
// </div>
// </section>

// <footer className="text-gray-600 body-font">
//   <div className="bg-gray-100">
//     <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
//       <p className="text-gray-500 text-sm text-center sm:text-left">© 2022 Let's Travel —
//         <a  rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">Powered by Strapi</a>
//       </p>
//       <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
//         <a className="text-gray-500">
//           <svg fill="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
//             <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
//           </svg>
//         </a>
//         <a classNameName="ml-3 text-gray-500">
//           <svg fill="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
//             <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
//           </svg>
//         </a>
//         <a className="ml-3 text-gray-500">
//           <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
//             <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
//             <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
//           </svg>
//         </a>
//         <a className="ml-3 text-gray-500">
//           <svg fill="currentColor" stroke="currentColor" stroke-Linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
//             <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
//             <circle cx="4" cy="4" r="2" stroke="none"></circle>
//           </svg>
//         </a>
//       </span>
//     </div>
//   </div>
// </footer>

      
//     </div>
//   )
// }



// const QUIZ_URLS = {
//   get: 'http://localhost:1337/api/questions?populate=Text.Answer_image.data.attributes',

// };


// export const getAll = async () => {
//   const res = await fetch(QUIZ_URLS.get);
//   return await res.json();
// };

// export const getBySlug = async (slug) => {                          // Fifth checkpoint id => slug
//   const res = await fetch(`${QUIZ_URLS.get}/${slug}`); // Sixth checkpoint id => slug
//   return await res.json();
// };

// export default Slug ;  // Seventh checkpoint Id => Slug
