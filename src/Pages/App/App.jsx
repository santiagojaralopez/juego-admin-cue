import { useRoutes, BrowserRouter } from 'react-router-dom'

import { Home } from '../Home'
import { ProductDesign } from '../ProductDesign'

import './App.css'


const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/product-design', element: <ProductDesign /> },
  ])

  return routes
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
