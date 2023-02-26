import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import InvoiceContextProvider from './Context/InvoiceContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InvoiceContextProvider>
      <App />
    </InvoiceContextProvider>
  </React.StrictMode>,
)
