import App from './App.tsx'
import './sass/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/index.ts'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
