# App Architecture

The Expo Router `app/` directory is kept intentionally small and only owns route files.

All feature and shared code lives in `src/`:

- `components/ui`: reusable presentational building blocks
- `features`: domain modules such as transactions, budgets, analytics, security, and recurring transactions
- `hooks`: shared hooks used across features
- `providers`: app-wide providers
- `services`: shared service contracts like storage and export helpers
- `stores`: shared app and finance state contracts
- `theme`: design tokens like spacing and radius
- `types`: cross-feature TypeScript models
- `utils`: pure helpers such as currency formatting

Recommended rule:

- keep screens inside feature folders
- keep business logic in services and stores
- keep hooks focused on orchestration
- keep `ui` components dumb and reusable
