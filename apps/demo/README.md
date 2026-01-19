# GA4 Clone - Demo App

React demo application showcasing the GA4 Clone Analytics SDK integration.

## Features

- 🏠 **Landing Page** - Hero section with feature showcase and CTA tracking
- 🔐 **Login Page** - Authentication UI with social login tracking
- 🛒 **E-commerce Page** - Product catalog with cart and wishlist tracking

## SDK Events Tracked

### Landing Page

- `page_view` - Page visit tracking
- `cta_click` - Call-to-action button clicks
- `feature_click` - Feature card interactions

### Login Page

- `page_view` - Page visit tracking
- `login_attempt` - Login form submissions and social auth
- `forgot_password_click` - Password recovery link clicks
- `signup_click` - Sign up link clicks

### E-commerce Page

- `page_view` - Page visit with product count
- `product_view` - Product card clicks
- `add_to_cart` - Product added to cart
- `add_to_wishlist` - Product added to favorites
- `remove_from_wishlist` - Product removed from favorites

## Running the Demo

### Prerequisites

1. Make sure the backend is running on `http://localhost:3000`
2. Ensure the SDK is built (`npm run build` in `apps/sdk`)

### Start the demo

```bash
# From the demo directory
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## SDK Configuration

The SDK is initialized in `src/App.tsx`:

```typescript
analytics.init({
  endpoint: "http://localhost:3000/api/collect",
  projectId: "123e4567-e89b-12d3-a456-426614174000",
});
```

**Update the `projectId` to match your backend project!**

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Vite** - Build tool
- **@ga4-clone/sdk** - Analytics tracking

## Pages

### 1. Landing Page (`/`)

Modern landing page with gradient hero, feature cards, and conversion tracking.

### 2. Login Page (`/login`)

Clean authentication interface with email/password and social login options.

### 3. E-commerce Page (`/shop`)

Product catalog with images, ratings, cart, and wishlist functionality.

## Viewing Analytics

While interacting with the demo, check:

1. **Browser Console** - See SDK initialization and Client/Session IDs
2. **Network Tab** - View analytics requests being sent
3. **Backend Logs** - See events received by your API

## Customization

### Update Endpoint

Edit `src/App.tsx` to point to your analytics backend:

```typescript
analytics.init({
  endpoint: "https://your-analytics-api.com/collect",
  projectId: "your-project-uuid",
});
```

### Add More Events

Track custom events anywhere in your components:

```typescript
analytics.track("custom_event", {
  property1: "value1",
  property2: "value2",
});
```

## License

MIT
