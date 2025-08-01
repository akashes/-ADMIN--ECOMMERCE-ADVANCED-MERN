import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <App />
    </Provider>

  </StrictMode>,
)
