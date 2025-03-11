# Better Spanish - Language Learning Application

A full-stack e-commerce platform for luxury jewelry, built with Next.js. Features a sleek design, robust shopping experience, and comprehensive admin capabilities.

## 🚀 Live Demo

[View Live Site](https://dymone-ryans-projects-197c1757.vercel.app/)

## 🌟 Key Features Implemented

- **Product Management**: Full product catalog with filtering, sorting and search
- **User Authentication**: Secure login with Clerk integration
- **Shopping Cart**: Client-side cart management with Zustand
- **Wishlist**: Personal wishlist functionality for registered users
- **Checkout System**: Secure payments through Stripe integration
- **Order Management**: Track customer orders
- **Account Dashboard**: User profile and order history
- **Admin Panel**: Full Sanity CMS integration for content management
- **Newsletter**: Email subscription system with Resend

## 🛠️ Technologies Used

- **Next.js 15**: Main framework with server components
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Clerk**: Authentication
- **Sanity**: Headless CMS
- **Stripe**: Payment processing
- **Zustand**: State management
- **Resend**: Email service
- **Zod**: Schema validation

## 🎯 Future Improvements

- [ ] Product sizing options
- [ ] Multiple materials and stones per product
- [ ] Infinite scroll with prefetching
- [ ] Real-time stock management
- [ ] Order management controls
- [ ] View transitions API integration
- [ ] GSAP animations
- [ ] Improved SEO optimization
- [ ] Complete sitemap

## 📁 Project Structure

```bash
.
├── src/
│ ├── actions/ # Server actions
│ ├── app/ # Application routes
│ │ ├── (site)/ # Main site pages
│ │ ├── api/ # API endpoints
│ │ └── studio/ # Sanity studio
│ ├── components/ # UI components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ ├── sanity/ # Sanity configuration
│ ├── zod/ # Schema validation
│ └── zustand/ # State management
├── public/ # Static assets
└── sanity.config.ts # Sanity configuration
```

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/RyanBProg/dymone
```

Install dependencies:

```bash
npm install
```

Set up environment variables:

```bash
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_VERSION=
SANITY_STUDIO_TOKEN=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email
RESEND_API_KEY=
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## 📄 License

This project is open source and available under the MIT License.

## 📫 Contact

Feel free to reach out if you have any questions or would like to connect:

- [GitHub](https://github.com/ryanbprog)
- [LinkedIn](https://www.linkedin.com/in/ryan-bowler-601919170)
