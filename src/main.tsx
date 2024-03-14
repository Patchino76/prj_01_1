import { QueryClient, QueryClientProvider  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:3,
      // cacheTime: 1000 * 60 * 10,
      staleTime: 1000 * 10, // 10 seconds
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false
    }
  }
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
