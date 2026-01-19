import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Home, Login, ShoppingCart } from '@mui/icons-material'

export function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: <Home /> },
    { path: '/login', label: 'Login', icon: <Login /> },
    { path: '/shop', label: 'Shop', icon: <ShoppingCart /> },
  ]

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 70 }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              fontSize: '1.5rem',
              textDecoration: 'none',
              color: 'inherit',
              background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            GA4 Clone Demo
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: location.pathname === item.path ? '100%' : 0,
                    height: 2,
                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    transition: 'width 0.3s ease',
                  },
                  '&:hover::after': {
                    width: '100%',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
