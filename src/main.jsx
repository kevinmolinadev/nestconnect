import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './presentation/App.jsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
