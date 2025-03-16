import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Router from './screens/routers/router'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
        <div className="phone-container">
          <div className="phone">
              <div className="screen">
                  <Router />
                  <ToastContainer />
              </div>
          </div>
      </div>
      </>
  )
}

export default App
