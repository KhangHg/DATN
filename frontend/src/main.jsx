import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContex.jsx'
import GlobalStyles from "../src/components/GlobalStyles"
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthContextProvider>
      <GlobalStyles>
          <Router>
              <App />
          </Router>
      </GlobalStyles>
  </AuthContextProvider>
</React.StrictMode>,
)
