import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store,persistor } from './store/store.js'
import axios from 'axios'
import { SocketProvider } from './context/SocketProvider.jsx'
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

    {/* <StrictMode> */}
   <SocketProvider>

    <App />
   </SocketProvider>
        </PersistGate>
    {/* </StrictMode> */}
    </Provider>

)
