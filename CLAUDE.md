# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
ng serve          # Dev server at http://localhost:4200 (auto-reloads)
ng build          # Production build to dist/
ng test           # Run unit tests via Karma/Jasmine
ng test --include="**/some.component.spec.ts"  # Run a single test file
```

## Architecture

**Stack**: Angular 18 (standalone components + signals), Angular Material 18, chart.js/ng2-charts, SCSS.
**Backend**: Spring Boot at `http://localhost:8080` (configured in `src/environments/environment.ts`).

### Clean Architecture per Feature

Each feature under `src/app/features/` follows four layers:

```
domain/
  models/     - TypeScript interfaces and enums
  ports/      - Abstract repository classes (used as DI tokens)
application/  - Use case classes (injectable, injected via route providers)
infrastructure/
  adapters/   - HttpRepository implementations extending abstract ports
presentation/
  pages/      - Routed page components
  components/ - Reusable feature-specific components
```

**Dependency injection is scoped to routes**, not root. Each feature's `*.routes.ts` declares its own `providers` array with `{ provide: XRepository, useClass: XHttpRepository }` and use case classes. This means use cases and repositories are only instantiated when the route is active.

### Core

- `src/app/core/interceptors/` — Functional interceptors: `loadingInterceptor` (tracks HTTP in-flight count) and `errorInterceptor` (global error handling + snackbar notification).
- `src/app/core/services/loading.service.ts` — Signal-based; use `isLoading` computed signal.
- `src/app/core/services/notification.service.ts` — Wraps `MatSnackBar`.
- `src/app/core/layout/shell/` — Root layout with sidenav + toolbar wrapping the main `<router-outlet>`.

### Shared

`src/app/shared/` contains pipes (`CurrencyPipeCOP`, `EstadoCreditoPipe`) and reusable components (`LoadingSpinnerComponent`, `EmptyStateComponent`, `PageHeaderComponent`, `ConfirmDialogComponent`).

### Routing

All feature routes are lazy-loaded from `app.routes.ts`. Inside a feature, individual pages are also lazy-loaded via `loadComponent`. The shell component (`ShellComponent`) wraps all feature routes as children.

### Domain Models

- `Cliente` / `CreateClienteCommand` / `ClienteResponse` — `src/app/features/clientes/domain/models/`
- `Credito` / `CreateCreditoCommand` / `CreditoResponse` / `CuotaAmortizacion` — `src/app/features/creditos/domain/models/`
- `EstadoCredito` enum values: `ACTIVO`, `CANCELADO`, `EN_MORA`
- `DashboardSummary` — aggregated client-side from `/clientes` + `/creditos` endpoints (no dedicated backend endpoint)

### Adding a New Feature

1. Create `src/app/features/<name>/domain/ports/<name>.repository.ts` (abstract class).
2. Create `src/app/features/<name>/infrastructure/adapters/<name>-http.repository.ts` extending it.
3. Create use cases in `application/`.
4. Create `<name>.routes.ts` with `providers` scoping DI to the route.
5. Register the lazy route in `app.routes.ts`.
