# Restaurant Booking System

## Overview

This is a full-stack restaurant booking application built with modern web technologies. The system allows users to make restaurant reservations with guest count details, contact information, and preferred time slots. It features a clean, responsive design with a React frontend and Node.js/Express backend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **Validation**: Zod schemas shared between client and server

### Data Storage
- **Primary Database**: PostgreSQL hosted on Neon
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations for database versioning
- **Fallback Storage**: In-memory storage for development/testing

## Key Components

### Database Schema
The application uses two main tables:

1. **Users Table**
   - id (serial, primary key)
   - username (text, unique)
   - password (text)

2. **Bookings Table**
   - id (serial, primary key)
   - city, state (location information)
   - male, female, children (guest counts)
   - restaurant (venue selection)
   - timeSlot (booking time)
   - name, mobile, email (contact details)
   - bookingDate (reservation date)
   - createdAt (timestamp)

### API Endpoints
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Retrieve all bookings
- `GET /api/bookings/:id` - Get specific booking

### UI Components
- **Header**: Navigation with responsive mobile menu
- **Booking Form**: Multi-step form with validation
- **Toast Notifications**: User feedback system
- **Responsive Design**: Mobile-first approach

## Data Flow

1. **User Input**: User fills out booking form with validation
2. **Client Validation**: Zod schema validates data on frontend
3. **API Request**: TanStack Query manages API calls
4. **Server Validation**: Backend validates with same Zod schema
5. **Database Storage**: Drizzle ORM saves to PostgreSQL
6. **Response**: Success/error feedback via toast notifications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL driver
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **react-hook-form**: Form state management
- **zod**: Runtime type validation
- **wouter**: Lightweight routing

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast JavaScript bundler

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles server to `dist/index.js`
- **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: Uses Vite dev server with HMR
- **Production**: Serves static files from Express
- **Database**: Requires `DATABASE_URL` environment variable

### Hosting
- **Platform**: Replit with autoscale deployment
- **Port**: Application runs on port 5000
- **Static Assets**: Served by Express in production

## Changelog

- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.