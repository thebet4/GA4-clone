import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { theme } from './theme'
import { Navigation } from './components/Navigation'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { EcommercePage } from './pages/EcommercePage'
import { analytics } from '@ga4-clone/sdk'

function App() {
  useEffect(() => {
    // Initialize the SDK with your backend endpoint and project ID
    analytics.init({
      endpoint: 'http://localhost:3000/collect', // Correct endpoint
      projectId: '123e4567-e89b-12d3-a456-426614174000', // Replace with your project UUID
    })

    // Track app initialization
    analytics.track('app_initialized', {
      platform: 'web',
      app_version: '1.0.0',
    })

    console.log('📊 Analytics SDK initialized!')
    console.log('Client ID:', analytics.getClientId())
    console.log('Session ID:', analytics.getSessionId())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/shop" element={<EcommercePage />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
