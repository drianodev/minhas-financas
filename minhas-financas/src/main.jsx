import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App'
import './index.css'
import 'primeicons/primeicons.css';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
