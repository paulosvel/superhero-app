# Superhero Registry Application

A full-stack application for registering and managing superheroes with humility scores.

## Project Structure
- Frontend: Next.js with Chakra UI
- Backend: Express.js REST API

## Requirements
- Node.js v18+
- npm v8.19+

## Getting Started
1. Start the backend:
cd backend
npm install
npm run dev

2. Start the frontend:
cd frontend
npm install
npm run dev


## Team Collaboration Notes

### Current Architecture Decisions
- Used Chakra UI for consistent design system
- Implemented dark/light mode for accessibility
- Added search functionality for better UX
- Included error handling and toast notifications

### Areas for Team Discussion
1. Data Persistence
   - Currently using in-memory storage
   - Team input needed on choosing database solution

2. Testing Strategy
   - Basic Jest tests implemented
   - Need team feedback on E2E testing approach

3. Feature Priorities
   - Superhero categories
   - User authentication
   - Analytics dashboard

## If I Had More Time

1. Technical Improvements
   - Add database persistence (MongoDB/PostgreSQL)
   - Implement comprehensive test coverage
   - Implement proper error boundaries
   - Add loading states and skeleton loaders

2. Feature Enhancements
   - User authentication and authorization
   - Hero categories and filtering
   - Hero statistics dashboard
   - Image upload for heroes
   - Pagination for large datasets

3. Developer Experience
   - Set up CI/CD pipeline
   - Add Storybook for component documentation
   - Improve API documentation
   - Add performance monitoring
