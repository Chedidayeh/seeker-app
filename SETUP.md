# Setup Instructions

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (if using)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database URL (if using Prisma)
DATABASE_URL="file:./dev.db"

# Node Environment
NODE_ENV=development
```

## Generate NextAuth Secret

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

## Database Setup

If you want to use the database features, run:

```bash
npx prisma generate
npx prisma db push
```

## Start the Development Server

```bash
npm run dev
```

## Issues Fixed

1. ✅ Created next-intl configuration file (`src/i18n/request.ts`)
2. ✅ Added content to message files (en.json, fr.json, ar.json)
3. ✅ Fixed auth configuration with proper secret handling
4. ✅ Updated middleware to properly combine auth and intl
5. ✅ Created Prisma schema for database setup
