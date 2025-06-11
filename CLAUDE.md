# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` (opens browser automatically) or `ng serve`
- **Build**: `npm run build` or `ng build`
- **Test**: `npm test` or `ng test` (uses Vitest test runner)
- **Lint**: `npm run lint` or `ng lint`
- **Format check**: `npm run format:test`
- **Format files**: `npm run format:write`
- **Bundle analysis**: `npm run analyze`
- **Dependency analysis**: `npm run analyze:deps`

Package manager: **pnpm** (configured in angular.json)

## Architecture Overview

This is an Angular 20+ application using standalone components with a feature-based architecture:

### Core Structure
- **App Config**: Centralized configuration in `app.config.ts` using provider functions
- **Core Module**: `core/core.ts` provides fundamental Angular setup including zoneless change detection, routing, and animations
- **Feature-based routing**: Each feature has lazy-loaded routes with `loadComponent()` pattern
- **Layout System**: Main layout in `layout/main-layout.ts` with responsive Material Design navigation

### Key Architectural Patterns
- **Standalone Components**: All components use `standalone: true` (configured in angular.json schematics)
- **Provider Pattern**: Core functionality exposed through `provideCore()`, `provideLocale()`, `provideAngularMaterial()` functions
- **Lazy Loading**: Features loaded on-demand via route-based code splitting
- **OnPush Change Detection**: Default strategy for better performance
- **Zoneless**: Uses `provideZonelessChangeDetection()` for modern change detection

### Component Conventions (angular.json schematics)
- Components are standalone, flat structure, inline templates/styles
- SCSS styling with Tailwind CSS integration
- Skip tests by default for schematics
- Prefix: `my-org`
- OnPush change detection strategy

### Tech Stack
- Angular 20+ with Angular Material
- Tailwind CSS for utility-first styling
- RxJS for reactive programming
- Vitest for testing
- ESLint with Angular ESLint rules
- Zod for validation
- Date-fns for date manipulation

### Project Structure
- `feature/`: Contains all application features (dashboard, analytics, projects, team, settings, home)
- `layout/`: Main application layout components
- `core/`: Core application configuration and providers
- `ui/`: Reusable UI components (empty in current structure)
- `styles/`: SCSS styling architecture with themes