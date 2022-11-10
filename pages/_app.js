import React from 'react'
import ReactDOM from 'react-dom'
import { NavBar } from '../components/NavBar'
import '../styles/globals.css'
// import { PersistGate } from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
// import {persistor} from '../src/redux/store'
import store from '../src/redux/store'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <div className="bg-blue-500">
      <><NavBar />
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
      </>
      </div>
    </>

  ) 
}

export default MyApp