import { useRoutes, BrowserRouter } from 'react-router-dom'

import { ContextProvider } from '../../Context/Context'
import { Home } from '../Home'
import { ProductDesign } from '../ProductDesign'
import { Distribution } from '../Distribution'
import { Marketing } from '../Marketing'
import { Costs } from '../Costs'
import { Outro } from '../Outro'

import './App.css'


const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/product-design', element: <ProductDesign /> },
    { path: '/distribution', element: <Distribution /> },
    { path: '/marketing', element: <Marketing /> },
    { path: '/costs', element: <Costs /> },
    { path: '/outro', element: <Outro /> },
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
