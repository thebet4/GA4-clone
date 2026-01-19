import { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Badge,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Star,
} from '@mui/icons-material'
import { analytics } from '@ga4-clone/sdk'

interface Product {
  id: number
  name: string
  price: number
  category: string
  rating: number
  image: string
  badge?: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Analytics Dashboard',
    price: 49.99,
    category: 'Software',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    badge: 'Best Seller',
  },
  {
    id: 2,
    name: 'Data Visualization Pro',
    price: 79.99,
    category: 'Software',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Event Tracking Suite',
    price: 39.99,
    category: 'Tools',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Real-time Analytics',
    price: 99.99,
    category: 'Software',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    badge: 'Premium',
  },
  {
    id: 5,
    name: 'User Behavior Insights',
    price: 59.99,
    category: 'Analytics',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    name: 'Conversion Optimizer',
    price: 89.99,
    category: 'Tools',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=300&fit=crop',
  },
]

export function EcommercePage() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [cartCount, setCartCount] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    analytics.track('page_view', {
      page: '/shop',
      page_title: 'E-commerce Shop',
      section: 'shop',
      product_count: products.length,
    })
  }, [])

  const handleAddToCart = (product: Product) => {
    analytics.track('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      category: product.category,
      page: '/shop',
    })

    setCartCount((prev) => prev + 1)
    setNotificationMessage(`${product.name} added to cart!`)
    setShowNotification(true)
  }

  const handleToggleFavorite = (product: Product, isFavorited: boolean) => {
    const newFavorites = new Set(favorites)
    
    if (isFavorited) {
      newFavorites.delete(product.id)
      analytics.track('remove_from_wishlist', {
        product_id: product.id,
        product_name: product.name,
        page: '/shop',
      })
    } else {
      newFavorites.add(product.id)
      analytics.track('add_to_wishlist', {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        category: product.category,
        page: '/shop',
      })
    }
    
    setFavorites(newFavorites)
  }

  const handleProductView = (product: Product) => {
    analytics.track('product_view', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      category: product.category,
      page: '/shop',
    })
  }

  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" gutterBottom>
                Analytics Products
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Discover powerful tools to track and analyze your data
              </Typography>
            </Box>
            <IconButton
              size="large"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {products.map((product) => {
            const isFavorited = favorites.has(product.id)

            return (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  onClick={() => handleProductView(product)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                    {product.badge && (
                      <Chip
                        label={product.badge}
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          fontWeight: 600,
                        }}
                      />
                    )}
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'background.paper' },
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleFavorite(product, isFavorited)
                      }}
                    >
                      {isFavorited ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="overline" color="text.secondary">
                      {product.category}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Star sx={{ color: '#FFC107', fontSize: 20 }} />
                      <Typography variant="body2" color="text.secondary">
                        {product.rating}
                      </Typography>
                    </Box>
                    <Typography variant="h5" color="primary.main" fontWeight={700}>
                      ${product.price}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ShoppingCart />}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>

      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setShowNotification(false)}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}
