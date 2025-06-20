import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// Exportacion del las funciones necesarias
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Creacion de un objeto que se encargara de:
// La obtencion de los datos asi como su actualizacion
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Se envuelve a la explicacion  */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
