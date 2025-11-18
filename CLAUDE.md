# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ServiCombo** is a marketplace platform connecting three user types: Requesters (Solicitantes), Service Providers (Proveedores de Servicio), and Supply Providers (Proveedores de Insumos). This repository contains:

1. **Web Application** - React + Vite app (root `/src`)
2. **Mobile Application** - React Native + Expo app (`/src/mobile`)

## Development Commands

### Web Application (Root)
```bash
npm install          # Install dependencies
npm run dev          # Start development server on port 3000
npm run build        # Build for production (outputs to /build)
```

### Mobile Application (Currently in development)
The mobile app lives in `/src/mobile` and uses React Native with Expo framework. Note: The project structure suggests mobile development is ongoing but the standard Expo setup may not be fully configured at the root level.

## Architecture Overview

### State Management Pattern
Both web and mobile apps use **Context API + useReducer** pattern for global state management:

- **AuthContext** - Manages user authentication, login/logout, session persistence
  - Uses reducer with actions: `LOGIN`, `LOGOUT`, `SET_LOADING`
  - Persists user data (AsyncStorage for mobile, localStorage for web)

- **DataContext** - Manages all marketplace data (services, quotes, insumos, packs)
  - Uses reducer with CRUD actions for each entity type
  - Auto-saves to storage on every state change
  - Initial state populated from mock data

### Key Data Flows
1. User action triggers → Context function called → Dispatch reducer action → State updated immutably
2. useEffect detects state change → Saves to AsyncStorage/localStorage
3. Components re-render with new state

### Mobile App Structure (`/src/mobile`)
```
/src/mobile/
├── App.tsx                 # Entry point with providers
├── navigation/
│   └── AppNavigator.tsx    # Stack + Bottom Tab navigation
├── context/
│   ├── AuthContext.tsx     # Authentication state
│   └── DataContext.tsx     # App data state
├── screens/                # 9 main screens
├── types/index.ts          # TypeScript interfaces
├── data/mockData.ts        # Hardcoded test data
└── constants/Colors.ts     # Design system colors
```

### Navigation Structure (Mobile)
- **Stack Navigator** wraps the entire app
- **Bottom Tab Navigator** for main screens (tabs change based on user role)
- Conditional rendering based on authentication state
- Dynamic tabs per user role:
  - Solicitante: Dashboard, Services
  - Proveedor Servicio: Dashboard, Services, My Quotes
  - Proveedor Insumos: Dashboard, Services, Insumos

### UI Component Library (`/src/components/ui`)
The project includes a comprehensive shadcn/ui-inspired component library with Radix UI primitives:
- All components use TypeScript
- Styling via utility classes with `cn()` helper from `/src/components/ui/utils.ts`
- Components are importable via path alias `@/components/ui/*`

## Data Model

### Core Types (defined in `/src/mobile/types/index.ts`)

**User**
- 3 roles: `solicitante` | `proveedor_servicio` | `proveedor_insumos`
- Hardcoded authentication (email/password)

**Service**
- Status flow: `publicado` → `en_evaluacion` → `asignado` → `completado` | `cancelado`
- Categories: jardineria, piscinas, limpieza, otros
- Contains array of required insumos (supplies)
- Can have multiple quotes, one selected via `assignedQuoteId`

**Quote**
- Links to a service and provider
- Includes price, deadline (days), details

**Insumo** (Supply)
- Catalog items managed by supply providers
- Tracks unit price, stock, category

**InsumoPack**
- Bundles of insumos for a specific service
- Contains items array with quantities and prices

## Design System

### Colors (Strictly enforced)
- Primary: `#2563EB` (Blue) - Main actions, CTAs
- Secondary: `#10B981` (Green) - Success, confirmations
- Accent: `#F4A261` (Orange) - Highlights, warnings

These colors are defined in `/src/mobile/constants/Colors.ts` for mobile.

## Authentication

### Test Users (Hardcoded in `/src/mobile/data/mockData.ts`)
```
juan@solicitante.com / 123  (Requester)
maria@proveedor.com / 123   (Service Provider)
carlos@insumos.com / 123    (Supply Provider)
ana@proveedor.com / 123     (Service Provider)
```

## Important Patterns

### Persistence Strategy
- **Mobile**: AsyncStorage auto-saves on every state mutation
- **Web**: localStorage auto-saves on every state mutation
- Data loads on app mount from storage, falls back to mock data if empty

### Permission Control
- All CRUD operations check user role
- Navigation tabs dynamically rendered based on `user.role`
- Service actions restricted by ownership (solicitanteId) or provider relationship

### Context Hook Usage
```typescript
const { user, login, logout } = useAuth();
const { services, addService, updateService, quotes, addQuote } = useData();
```

## Path Aliases

The project uses `@/` alias pointing to `/src` directory (configured in vite.config.ts):
```typescript
import { Button } from "@/components/ui/button"
```

## Code Style Conventions

- TypeScript strict mode enabled
- Functional components with hooks (no class components)
- Named exports for screens/contexts, default exports for main entry points
- Immutable state updates in reducers
- Async/await for storage operations

## Testing Strategy

Manual testing approach with documented test cases (see `/src/ESTRUCTURA.md`):
- Test each user role separately
- Verify full service lifecycle (publish → quote → select → complete)
- Test CRUD operations for all entities
- Verify persistence across app restarts

## Common Tasks

### Adding a New Screen (Mobile)
1. Create screen component in `/src/mobile/screens/`
2. Add route to Stack Navigator in `/src/mobile/navigation/AppNavigator.tsx`
3. Add to Tab Navigator if it's a main screen
4. Ensure role-based access control if needed

### Adding New Data Entity
1. Define TypeScript interface in `/src/mobile/types/index.ts`
2. Add state property to DataContext
3. Add reducer actions (SET, ADD, UPDATE, DELETE)
4. Create CRUD functions in DataContext
5. Update AsyncStorage save/load logic
6. Add mock data to `/src/mobile/data/mockData.ts`

### Modifying Service Workflow
Services follow a strict state machine. When modifying:
- Update ServiceStatus type if adding new states
- Update status transition logic in DataContext functions
- Ensure UI reflects all possible states
- Update relevant screens (DashboardScreen, ServiceDetailScreen)
