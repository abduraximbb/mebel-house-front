import App from './App.tsx'
import './sass/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/index.ts'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
       <App /> 
      </ThemeProvider> 
    </Provider>
  </BrowserRouter>
)
