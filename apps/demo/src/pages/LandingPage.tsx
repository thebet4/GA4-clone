import { useEffect } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material'
import {
  Rocket,
  Speed,
  Security,
  TrendingUp,
  Code,
  Analytics,
} from '@mui/icons-material'
import { analytics } from '@ga4-clone/sdk'

const features = [
  {
    icon: <Speed fontSize="large" />,
    title: 'Lightning Fast',
    description: 'Built with performance in mind. Track events without impacting user experience.',
  },
  {
    icon: <Security fontSize="large" />,
    title: 'Privacy First',
    description: 'GDPR compliant with full control over your data. No third-party trackers.',
  },
  {
    icon: <Analytics fontSize="large" />,
    title: 'Real-time Insights',
    description: 'Get instant analytics with powerful visualization and reporting tools.',
  },
  {
    icon: <Code fontSize="large" />,
    title: 'Developer Friendly',
    description: 'Simple API, TypeScript support, and comprehensive documentation.',
  },
]

export function LandingPage() {
  useEffect(() => {
    analytics.track('page_view', {
      page: '/',
      page_title: 'Landing Page',
      section: 'home',
    })
  }, [])

  const handleCTAClick = (action: string) => {
    analytics.track('cta_click', {
      action,
      page: '/',
      location: 'hero_section',
    })
  }

  const handleFeatureClick = (featureTitle: string) => {
    analytics.track('feature_click', {
      feature: featureTitle,
      page: '/',
    })
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Chip
              label="🚀 Now in Beta"
              color="primary"
              sx={{ mb: 3, fontWeight: 600 }}
            />
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Analytics Made Simple
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}
            >
              Open-source alternative to Google Analytics. Own your data, understand your users,
              and make better decisions.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                startIcon={<Rocket />}
                onClick={() => handleCTAClick('get_started')}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<TrendingUp />}
                onClick={() => handleCTAClick('view_demo')}
              >
                View Demo
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 2 }}
        >
          Why Choose GA4 Clone?
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6}}
        >
          Everything you need for modern web analytics
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card
                sx={{ height: '100%', cursor: 'pointer' }}
                onClick={() => handleFeatureClick(feature.title)}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, color: 'white' }}>
              Ready to get started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.9)' }}>
              Join thousands of developers already using GA4 Clone
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
              onClick={() => handleCTAClick('bottom_cta')}
            >
              Start Free Trial
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
