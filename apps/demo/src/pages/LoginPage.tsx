import { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Alert,
} from '@mui/material'
import { Google, GitHub, Login as LoginIcon } from '@mui/icons-material'
import { analytics } from '@ga4-clone/sdk'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    analytics.track('page_view', {
      page: '/login',
      page_title: 'Login Page',
      section: 'authentication',
    })
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    analytics.track('login_attempt', {
      method: 'email',
      page: '/login',
    })

    // Simulate login
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleSocialLogin = (provider: string) => {
    analytics.track('login_attempt', {
      method: provider,
      page: '/login',
    })

    // Simulate social login
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleForgotPassword = () => {
    analytics.track('forgot_password_click', {
      page: '/login',
    })
  }

  const handleSignUpClick = () => {
    analytics.track('signup_click', {
      source: 'login_page',
      page: '/login',
    })
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to access your analytics dashboard
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 4 }}>
          {showSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Login event tracked successfully! (This is a demo)
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />

              <Box sx={{ textAlign: 'right' }}>
                <Link
                  href="#"
                  underline="hover"
                  onClick={(e) => {
                    e.preventDefault()
                    handleForgotPassword()
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={<LoginIcon />}
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Stack spacing={2}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<Google />}
              onClick={() => handleSocialLogin('google')}
            >
              Continue with Google
            </Button>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<GitHub />}
              onClick={() => handleSocialLogin('github')}
            >
              Continue with GitHub
            </Button>
          </Stack>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                href="#"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault()
                  handleSignUpClick()
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
