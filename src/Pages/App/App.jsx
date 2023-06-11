import { useRoutes, BrowserRouter } from 'react-router-dom'

import { ContextProvider } from '../../Context/Context'
import { Home } from '../Home'
import { ProductDesign } from '../ProductDesign'
import { Distribution } from '../Distribution'

import './App.css'


const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/product-design', element: <ProductDesign /> },
    { path: '/distribution', element: <Distribution /> },
  ])

  return routes
}

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
