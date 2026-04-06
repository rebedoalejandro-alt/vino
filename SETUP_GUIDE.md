# Casa del Vino - Database Setup Guide

## Quick Start

This repository contains a complete Prisma schema and seed data for a wine e-commerce platform.

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### Installation Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create PostgreSQL database**
   ```bash
   createdb casadelvino
   ```

3. **Generate Prisma client**
   ```bash
   npm run prisma:generate
   ```

4. **Run migrations**
   ```bash
   npm run prisma:migrate
   ```

5. **Seed the database**
   ```bash
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## Database Schema

The database includes 23 models covering:
- User authentication (User, Account, Session)
- Products with wine-specific fields
- Inventory and ordering
- Wine regions and producers (bodegas)
- Grape varieties
- Ratings and reviews
- Blog content
- Promotional packs and discount codes

## Seed Data Included

### Products (33 total)
- 14 Red wines (tintos) - €12.75 to €295
- 7 White wines (blancos) - €16.75 to €32.50
- 2 Rosé wines (rosados) - €14.99 to €24.99
- 4 Sparkling wines (espumosos) - €16.50 to €58
- 1 Distilled spirit (destilado) - €48.50
- 3 Fortified wines (generosos) - €22 to €42
- 2 Sweet wines (dulces) - €18.50 to €28.75

### Spanish Wine Producers (10 bodegas)
- Vega Sicilia, Pingus, Marqués de Riscal, Torres
- Álvaro Palacios, Muga, Telmo Rodríguez, Raúl Pérez
- López de Heredia, Château Margaux

### Regions (8)
- Spain: Ribera del Duero, Rioja, Priorat, Bierzo, Rías Baixas, Penedès
- France: Champagne, Burdeos

### Additional Content
- 20 grape varieties
- 15 blog posts about wine
- 3 product bundles/packs
- 4 discount codes
- 15 critic ratings

## Available npm Scripts

```bash
npm run dev                  # Start development server
npm run build               # Build for production
npm run start               # Start production server
npm run lint                # Run ESLint
npm run prisma:generate     # Generate Prisma client
npm run prisma:migrate      # Run database migrations
npm run db:seed             # Seed database with sample data
npm run db:reset            # Reset database and reseed
```

## Environment Variables

The `.env` file includes:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret (change in production)
- `NEXTAUTH_URL` - Application URL
- `STRIPE_SECRET_KEY` - Stripe test key (placeholder)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key (placeholder)

Update these values for your deployment!

## Database Schema Highlights

### Product Model
Includes comprehensive wine details:
- Basic info (name, description, price)
- Wine characteristics (type, alcohol %, body, tannins)
- Tasting notes in Spanish (sight, nose, mouth, pairing)
- Vineyard details (soil, climate, altitude)
- Inventory management
- Associated bodega and region

### Authentication
Built-in support for:
- Email/password authentication
- OAuth via NextAuth.js
- Session management
- Email verification tokens

### E-commerce
- Shopping cart functionality
- Order management with status tracking
- User addresses and wishlists
- Discount codes with expiration
- Product reviews and ratings

## Custom Commands

Reset entire database (destructive):
```bash
npm run db:reset
```

This will:
1. Drop all existing data
2. Run all migrations from scratch
3. Re-seed with sample data

## Troubleshooting

If you encounter database connection issues:
1. Verify PostgreSQL is running
2. Check DATABASE_URL in .env
3. Ensure database `casadelvino` exists

If migrations fail:
```bash
npm run prisma:generate
npm run prisma:migrate -- --force
```

## Next Steps

After setup:
1. Review the schema in `prisma/schema.prisma`
2. Check seed data in `prisma/seed.ts`
3. Create API routes for products, orders, etc.
4. Build UI components using the Prisma data
5. Implement authentication flows
6. Set up Stripe payment integration

## License

This database schema and seed data are provided as-is for the Casa del Vino e-commerce platform.
