import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from "../src/components/ui/theme-provider"

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <App />
        </ThemeProvider>
      </body>
    
  </StrictMode>,
)
