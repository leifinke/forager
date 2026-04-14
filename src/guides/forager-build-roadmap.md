# 🌱 Forager — Build Roadmap

A step-by-step plan for building **Forager**, a shareable vegan recipe web app built with React and Supabase. The name works on two levels: foraging in nature for plants and ingredients, and foraging through the app to discover recipes. Each phase builds on the last, and every phase has a clear deliverable so you always have something working.

---

## Tech Stack (Recommended)

| Layer | Tool | Why |
|---|---|---|
| Framework | **React 19** (via Vite) | Fast dev server, modern tooling, React Compiler handles memoization automatically |
| Language | **TypeScript** | Type safety catches bugs before runtime, improves autocomplete, and is the professional standard (78% adoption in React projects as of 2025). You'll write `.tsx` files instead of `.jsx` — the syntax is nearly identical with the addition of type annotations. |
| Styling | **Tailwind CSS** | You know CSS already — Tailwind won't replace that knowledge, it'll just speed you up. You can always drop into custom CSS when Tailwind feels limiting. |
| Routing | **React Router v7** (`react-router` package) | Industry standard SPA routing. Note: v7 consolidated everything into a single `react-router` package — the old `react-router-dom` package is no longer needed. |
| Data Fetching | **TanStack Query** (formerly React Query) | The professional standard for fetching, caching, and syncing server data. Replaces the error-prone `useEffect` + `useState` pattern with automatic caching, background refetching, retry logic, and deduplication. |
| Backend / DB | **Supabase** | Postgres database with a free tier, instant REST API, no server code needed |
| Hosting | **Vercel** | Free Hobby tier, one-click deploy from GitHub, perfect for sharing with family |

### Why TypeScript?
You might think TypeScript adds complexity, but for a learning project it actually *helps* — your editor will catch mistakes instantly, autocomplete your props, and make refactoring safe. When you define a `Recipe` type once, every component that uses it gets free documentation. Starting without TypeScript and adding it later is painful; starting with it from day one is easy.

### Why TanStack Query instead of `useEffect` for data fetching?
Using `useEffect` + `useState` to fetch data is now considered an anti-pattern in the React ecosystem. It requires you to manually handle loading states, error states, race conditions, caching, request deduplication, and cleanup — and most developers get at least one of those wrong. TanStack Query handles all of this automatically with a single `useQuery` hook. You'll still learn `useEffect` for its proper use cases (event listeners, DOM manipulation, external library integration), but data fetching isn't one of them in modern React.

### Why Supabase over Firebase?
Supabase uses **PostgreSQL** (a real relational database) which teaches you transferable skills. Firebase uses a NoSQL document model that can lead to habits that don't carry over well. Supabase also gives you a proper SQL editor so you'll learn database fundamentals along the way.

### Is Vercel Free?
Yes. Vercel's **Hobby plan is free forever** and is designed for exactly this kind of project — personal, non-commercial apps. You get unlimited deployments, 100GB of bandwidth per month, automatic HTTPS, preview deployments on every Git push, and a global CDN. The only restriction is that the Hobby plan is for non-commercial use (you can't charge users or run ads), which doesn't apply here. You won't need the $20/month Pro plan unless you're building a commercial product or need team collaboration features. For a recipe app shared with friends and family, you'll never come close to the free tier limits.

---

## App Structure — Pages, Navigation & Layout

Before building anything, here's the full picture of what you're building. This is your app's blueprint.

### Pages (Routes)

| Route | Page Component | What It Shows |
|---|---|---|
| `/` | `<HomePage />` | Hero/welcome area, recipe grid with category filters and search bar |
| `/recipe/:id` | `<RecipeDetailPage />` | Full recipe: image, description, ingredients with measurements, step-by-step instructions, "Add to grocery list" button |
| `/categories` | `<CategoriesPage />` | Browse all categories (Breakfast, Mains, Sides, Desserts, Snacks, Smoothies, etc.) with a card for each |
| `/categories/:slug` | `<CategoryPage />` | All recipes within a single category |
| `/grocery-list` | `<GroceryListPage />` | Combined shopping list from selected recipes, with checkboxes and a clear/print option |

### Navigation

A persistent `<Navbar />` component sits at the top of every page and includes: the app name/logo (links to `/`), links to Home, Categories, and Grocery List, and a grocery list item count badge. On mobile, this collapses into a hamburger menu — a great exercise in building responsive React components with state.

### Shared Layout

You'll wrap your routes in a `<Layout />` component that renders the `<Navbar />` at the top and a `<Footer />` at the bottom (with a simple credit line). React Router's `<Outlet />` renders the active page between them. This teaches you the **layout route pattern** — one of the most practical patterns in React Router.

```
<Layout>                    ← always visible
  <Navbar />                ← persistent navigation
  <Outlet />                ← swaps based on current route
  <Footer />                ← always visible
</Layout>
```

### Component Tree Overview

Here's how all the pieces nest together, so you can see which components live inside which:

```
<App>
└── <BrowserRouter>
    └── <QueryClientProvider>          ← TanStack Query wraps everything
        └── <GroceryListProvider>      ← Context for grocery list state
            └── <Layout>
                ├── <Navbar />
                │   ├── <Logo />
                │   ├── <NavLinks />       ← Home, Categories, Grocery List
                │   └── <GroceryBadge />   ← item count from context
                │
                ├── <Outlet />             ← one of these renders based on route:
                │   │
                │   ├── <HomePage />
                │   │   ├── <SearchBar />
                │   │   ├── <CategoryFilter />
                │   │   └── <RecipeGrid />
                │   │       └── <RecipeCard /> (×n)
                │   │
                │   ├── <RecipeDetailPage />
                │   │   ├── <RecipeHeader />       ← name, image, times, servings
                │   │   ├── <IngredientList />      ← quantities + units
                │   │   ├── <InstructionSteps />    ← numbered steps
                │   │   └── <AddToGroceryButton />
                │   │
                │   ├── <CategoriesPage />
                │   │   └── <CategoryCard /> (×n)
                │   │
                │   ├── <CategoryPage />
                │   │   └── <RecipeGrid />
                │   │       └── <RecipeCard /> (×n)
                │   │
                │   └── <GroceryListPage />
                │       ├── <GroceryItem /> (×n)   ← checkbox + ingredient
                │       ├── <ClearListButton />
                │       └── <PrintButton />
                │
                └── <Footer />
```

---

## React Concepts — Why We Use What We Use

As you build, you'll encounter these core React concepts. Here's a plain-language explanation of each one and *why* it exists, so you're not just following patterns blindly.

### Components
A component is a reusable piece of UI — a function that returns JSX (HTML-like syntax). Instead of one giant HTML page, you break your app into small, focused pieces: `<RecipeCard />` knows how to render a recipe preview and nothing else. This makes your code easier to read, test, and reuse. If your recipe card shows up on the home page *and* the category page, you write it once.

### Props
Props are how a parent component passes data down to a child. When `<HomePage />` renders `<RecipeCard recipe={myRecipe} />`, the `recipe` object is a prop. Props are read-only — the child can display the data but can't modify it. This one-way data flow is a core React principle that keeps your app predictable. With TypeScript, you'll define the shape of your props using an `interface`, so your editor will warn you if you pass the wrong data.

### TypeScript Types & Interfaces
TypeScript lets you define the shape of your data so the compiler catches mistakes before your app even runs. You'll define a `Recipe` interface once and use it everywhere — in your components, hooks, and utility functions. If you misspell a property or pass a number where a string is expected, your editor will underline it in red immediately. This feels like extra work at first but saves significant debugging time.

### State (`useState`)
State is data that can change over time and triggers a re-render when it does. When a user types in the `<SearchBar />`, you store their input in state — every keystroke updates the state, React re-renders, and the filtered recipe list updates. State lives *inside* a component and is managed with the `useState` hook. Use `useState` for **client state** — UI concerns like "which category is selected," "is the mobile menu open," or "what's the search term."

### Server State vs. Client State (Important Distinction)
This is a critical concept in modern React. **Client state** is data your UI owns — which tab is active, whether a modal is open, form inputs. Use `useState` / `useReducer` / Context for this. **Server state** is data that lives on a remote server — your recipes, categories, ingredients. Server state has its own lifecycle: it can be stale, needs caching, can fail to fetch, and multiple components might need the same data. TanStack Query exists specifically to manage server state. Mixing the two (e.g., stuffing fetched recipes into a `useState` via `useEffect`) is the old pattern and leads to bugs.

### TanStack Query (`useQuery`)
TanStack Query is a library that manages all server state for you. Instead of writing `useState` + `useEffect` + error handling + loading state for every API call, you write one `useQuery` hook that returns `{ data, isLoading, isError }`. It automatically caches results so navigating back to a page doesn't re-fetch data, deduplicates identical requests from multiple components, retries failed requests, and refreshes stale data in the background. Your `useRecipes()` custom hook will be a thin wrapper around `useQuery`.

### Effects (`useEffect`) — Use Sparingly
`useEffect` lets you run code after a component renders — things like setting up event listeners, integrating third-party libraries, or syncing with external systems. **In modern React, `useEffect` is NOT for data fetching.** TanStack Query handles that. You'll still use `useEffect` in this project (e.g., syncing grocery list state to `localStorage`), but treat it as a specialized tool, not a catch-all.

### Custom Hooks
A custom hook is just a function that uses other hooks and encapsulates reusable logic. Your `useRecipes()` hook wraps a TanStack Query `useQuery` call into a clean interface. Any component can call `const { recipes, isLoading, isError } = useRecipes()` without knowing *how* the data is fetched. This is powerful because when you swap from local JSON to Supabase in Phase 3, you only change the hook's query function — not every component that uses it.

### Context (`useContext`)
Context solves the "prop drilling" problem. Without it, if `<GroceryListPage />` and `<RecipeDetailPage />` both need access to the grocery list, you'd have to pass it through every component in between. Context creates a "tunnel" — you wrap your app in a `<GroceryListProvider />` and any component anywhere in the tree can access the grocery list directly. Use Context for **client state that many components need** (like the grocery list). Don't use it for server state — that's TanStack Query's job.

### Reducer (`useReducer`)
When state logic gets complex (add item, remove item, clear list, toggle checkbox, merge duplicates), `useState` with multiple setter functions becomes messy. `useReducer` lets you define all your state transitions in one place as a "reducer" function with named actions like `ADD_ITEM`, `REMOVE_ITEM`, `TOGGLE_CHECKED`. It's the same pattern Redux uses, but built into React.

### React 19 & the React Compiler
React 19 ships with the React Compiler, which automatically handles performance optimizations like memoization. In older React, you'd manually wrap things in `useMemo`, `useCallback`, and `React.memo` to prevent unnecessary re-renders. The compiler now does this for you. This means you can focus on writing clear, correct code without premature optimization — the compiler has your back.

---

## Phase 1: Project Foundation & First Component

**Goal:** Get a running React + TypeScript app with routing and one static recipe displayed.

### Tasks
1. **Scaffold the project** — `npm create vite@latest forager -- --template react-ts`, then install Tailwind ([Tailwind + Vite guide](https://tailwindcss.com/docs/installation/using-vite)). The `react-ts` template sets up TypeScript for you automatically.
2. **Initialize Git & GitHub:**
   - Run `git init` in your project folder
   - Create a new repo on [github.com](https://github.com) (e.g., `forager`)
   - Connect and push: `git remote add origin <your-repo-url>` → `git add .` → `git commit -m "initial scaffold"` → `git push -u origin main`
   - **Commit after every meaningful change** from here on — finished a component? Commit. Fixed a bug? Commit. This builds good habits and gives you a safety net to roll back.
   - Tip: Vite generates a `.gitignore` for you, but double-check it includes `node_modules/` and `.env` (you'll need `.env` later for Supabase keys)
3. **Set up folder structure:**
   ```
   src/
   ├── components/      # Reusable UI pieces (RecipeCard, Navbar, IngredientList, etc.)
   │   ├── layout/      # Layout, Navbar, Footer
   │   ├── recipe/      # RecipeCard, RecipeHeader, IngredientList, InstructionSteps
   │   ├── grocery/     # GroceryItem, GroceryList
   │   └── ui/          # Shared pieces: SearchBar, CategoryFilter, buttons
   ├── pages/           # Route-level components (HomePage, RecipeDetailPage, etc.)
   ├── data/            # Local JSON recipe data (used in Phases 1–2, replaced by Supabase in Phase 3)
   ├── hooks/           # Custom hooks (useRecipes, useGroceryList)
   ├── context/         # React Context providers
   ├── types/           # TypeScript type definitions (Recipe, Ingredient, etc.)
   ├── lib/             # Third-party client config (Supabase, TanStack Query)
   ├── utils/           # Helper functions (unit conversion, formatting)
   └── App.tsx
   ```
4. **Define your core types** in `src/types/recipe.ts`:
   ```typescript
   export interface Recipe {
     id: string;
     name: string;
     description: string;
     category: string;
     prep_time: number;
     cook_time: number;
     servings: number;
     image_url: string | null;
     ingredients: Ingredient[];
     instructions: Instruction[];
   }

   export interface Ingredient {
     id: string;
     name: string;
     quantity: number;
     unit: string;
     sort_order: number;
   }

   export interface Instruction {
     id: string;
     step_number: number;
     content: string;
   }
   ```
5. **Install React Router** (`npm install react-router`) and set up your route structure with a `<Layout />` wrapper (see the App Structure section above for the full route table):
   - Create `<Layout />` with `<Navbar />`, `<Outlet />`, and `<Footer />`
   - Create route stubs for `/`, `/recipe/:id`, `/categories`, `/categories/:slug`, and `/grocery-list`
   - Build the `<Navbar />` with `<Link>` elements to each page — keep it simple for now (hamburger menu comes in Phase 5)
   - Note: import everything from `"react-router"` — there is no separate `react-router-dom` package in v7
6. **Create a local data file** (`src/data/recipes.ts`) with 2–3 hardcoded vegan recipes typed as `Recipe[]` — structure the data to mirror the database schema you'll use later (see Phase 3), so the swap is seamless
7. **Build your first components: `<RecipeCard />` and `<RecipeGrid />`** — `RecipeCard` takes a `recipe: Recipe` prop and renders a preview card; `RecipeGrid` takes a `recipes: Recipe[]` prop and maps over them. TypeScript will enforce that you pass the correct data.

### React Concepts You'll Practice
- Component composition and props (with TypeScript interfaces)
- File/folder organization patterns
- JSX and conditional rendering
- TypeScript: defining interfaces, typing props, typing arrays
- React Router v7: `<Route>`, `<Link>`, `useParams()`, `<Outlet />`, layout routes

### Resources
- [React docs — Your First Component](https://react.dev/learn/your-first-component)
- [React docs — TypeScript](https://react.dev/learn/typescript)
- [React Router v7 docs](https://reactrouter.com/start/library/installation)
- [Vite Getting Started](https://vite.dev/guide/)
- [GitHub — Getting Started](https://docs.github.com/en/get-started/quickstart)

### Milestone Checkpoint ✓
You have a working app with a navbar that links between all pages. The home page shows recipe cards in a grid, and clicking a card navigates to a detail page. The layout (navbar + footer) persists across all routes. Everything uses local data with proper TypeScript types. Your project is on GitHub with at least a few commits.

---

## Phase 2: Component Architecture, State & Data Fetching

**Goal:** Build out all page components, manage UI state, and set up TanStack Query for data fetching.

### Tasks
1. **Install TanStack Query** — `npm install @tanstack/react-query @tanstack/react-query-devtools`. Set up the `QueryClient` and wrap your app in `<QueryClientProvider>` in `App.tsx` (see the Component Tree in the App Structure section).
2. **Build the `<RecipeDetailPage />`** — this is where you practice breaking a complex page into focused child components:
   - `<RecipeHeader />` — name, image (placeholder for now), prep/cook time, servings
   - `<IngredientList />` — renders an array of `Ingredient` objects, each showing quantity, unit, and name (e.g., "2 cups almond milk"). This component receives ingredients as a **prop** — it doesn't fetch anything itself.
   - `<InstructionSteps />` — numbered step-by-step instructions. Receives steps as a prop and maps over them.
3. **Build the `<CategoriesPage />` and `<CategoryPage />`:**
   - `<CategoriesPage />` shows a `<CategoryCard />` for each category (Breakfast, Mains, etc.) — clicking one navigates to `/categories/:slug`
   - `<CategoryPage />` reuses your existing `<RecipeGrid />` but filtered to one category — this is the power of component reuse
4. **Move your data to `public/data/recipes.json`** and create a `useRecipes()` custom hook using TanStack Query:
   ```typescript
   // src/hooks/useRecipes.ts
   import { useQuery } from "@tanstack/react-query";
   import type { Recipe } from "../types/recipe";

   async function fetchRecipes(): Promise<Recipe[]> {
     const response = await fetch("/data/recipes.json");
     if (!response.ok) throw new Error("Failed to fetch recipes");
     return response.json();
   }

   export function useRecipes() {
     return useQuery({
       queryKey: ["recipes"],
       queryFn: fetchRecipes,
     });
   }

   export function useRecipe(id: string) {
     const { data: recipes, ...rest } = useRecipes();
     return {
       ...rest,
       data: recipes?.find((r) => r.id === id),
     };
   }
   ```
   Components call `const { data: recipes, isLoading, isError } = useRecipes()` — no `useState`, no `useEffect`, no manual cleanup. TanStack Query handles caching, so navigating away and back doesn't re-fetch.
5. **Add `<SearchBar />` and `<CategoryFilter />` to `<HomePage />`:**
   - `<SearchBar />` — a **controlled component** (its value is driven by React state, not the DOM). Every keystroke updates state via `onChange`, which triggers a re-render with filtered results.
   - `<CategoryFilter />` — a row of buttons/pills (All, Breakfast, Mains, etc.). Clicking one sets the active category in the parent's state. This is **lifting state up** — the filter component doesn't own the state, it just tells the parent what changed.
6. **Add filtering logic** — use `useState` in `<HomePage />` to track the active category and search term, then filter the recipe array with `.filter()` before passing it to `<RecipeGrid />`. This is **derived state** — you don't store the filtered list separately, you compute it on every render from the full list + the active filters.
7. **Enable React Query Devtools** — import `<ReactQueryDevtools />` and add it to your app. This opens a panel in dev mode that shows you every query, its cache status, and when it refetches. Invaluable for learning how TanStack Query works under the hood.

### React Concepts You'll Practice
- `useState` for client state (search term, active category)
- TanStack Query `useQuery` for server state (recipes from API)
- Custom hooks (wrapping `useQuery` into `useRecipes()`)
- Controlled components (SearchBar input value driven by state)
- Lifting state up (CategoryFilter communicates to HomePage via callback props)
- Derived state (computing filtered recipes from state, not storing a separate filtered array)
- Loading and error states in UI (provided automatically by TanStack Query)
- Array methods in rendering (`.filter()`, `.map()`)
- Component reuse (`<RecipeGrid />` used on both HomePage and CategoryPage)

### Resources
- [TanStack Query docs — Quick Start](https://tanstack.com/query/latest/docs/framework/react/quick-start)
- [TanStack Query docs — Devtools](https://tanstack.com/query/latest/docs/framework/react/devtools)
- [React docs — Managing State](https://react.dev/learn/managing-state)
- [React docs — Thinking in React](https://react.dev/learn/thinking-in-react) *(read this one carefully — it's the single best guide to component architecture)*

### Milestone Checkpoint ✓
You can filter recipes by category and search by name. Data is fetched via TanStack Query with automatic caching — navigating to a recipe detail page and hitting back loads instantly from cache. The React Query Devtools panel shows you query status in real time.

---

## Phase 3: Supabase Integration

**Goal:** Swap local JSON for a real database. Since TanStack Query handles caching and state management, this phase is just about changing the `queryFn` inside your hooks — not rewriting your components.

### Supabase Free Tier
Supabase's free tier includes 2 projects, 500MB database storage, 1GB file storage, and 50,000 monthly active users. A recipe app for family won't come close to these limits.

### Tasks
1. **Create a Supabase project** (free tier) at [supabase.com](https://supabase.com)
2. **Design your database schema:**
   ```
   recipes
   ├── id (uuid, primary key)
   ├── name (text)
   ├── description (text)
   ├── category (text)  — e.g., "breakfast", "mains", "desserts"
   ├── prep_time (integer, minutes)
   ├── cook_time (integer, minutes)
   ├── servings (integer)
   ├── image_url (text, nullable)
   └── created_at (timestamp)

   ingredients
   ├── id (uuid, primary key)
   ├── recipe_id (uuid, foreign key → recipes.id)
   ├── name (text)
   ├── quantity (numeric)
   ├── unit (text)  — e.g., "cup", "tbsp", "g"
   └── sort_order (integer)

   instructions
   ├── id (uuid, primary key)
   ├── recipe_id (uuid, foreign key → recipes.id)
   ├── step_number (integer)
   └── content (text)
   ```
3. **Seed 5–10 recipes** using the Supabase SQL editor
4. **Install the Supabase client** (`npm install @supabase/supabase-js`) and create a `src/lib/supabase.ts` config file
5. **Store your keys safely** — add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to a `.env` file (already in your `.gitignore` so they won't be pushed to GitHub)
6. **Rewire `useRecipes()`** — replace the `queryFn` that calls `fetch('/data/recipes.json')` with a Supabase query. Since TanStack Query manages all the caching and state, your components won't need any changes:
   ```typescript
   // Before (local JSON)
   queryFn: () => fetch("/data/recipes.json").then(r => r.json())

   // After (Supabase)
   queryFn: async () => {
     const { data, error } = await supabase
       .from("recipes")
       .select("*, ingredients(*), instructions(*)");
     if (error) throw error;
     return data;
   }
   ```
   That's it. Same hook, same return shape, same components. Only the data source changed.

### React Concepts You'll Practice
- Environment variables in Vite (`import.meta.env`)
- Refactoring a `queryFn` without touching UI components (the power of abstraction)
- Relational data queries (Supabase's `select("*, ingredients(*)")` fetches nested relations)

### Resources
- [Supabase JavaScript quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [Supabase querying data](https://supabase.com/docs/guides/database/overview)

### Milestone Checkpoint ✓
Your app reads real data from Supabase. You can add a new recipe via the Supabase dashboard and see it appear in your app without any code changes. Your UI components didn't change at all — only the hook's `queryFn` did. TanStack Query Devtools shows the cached Supabase data.

---

## Phase 4: Grocery List Feature

**Goal:** Let users select recipes and generate a combined grocery list.

### Tasks
1. **Create a `GroceryListContext`** using React Context + `useReducer` to manage the grocery list globally. Define actions like `ADD_RECIPE`, `REMOVE_RECIPE`, `TOGGLE_ITEM`, and `CLEAR_LIST`. Wrap your app in a `<GroceryListProvider />` inside `App.tsx` (see the component tree in the App Structure section). This is **client state** (UI state the user controls), not server state, so Context + `useReducer` is the right tool — not TanStack Query.
2. **Build `<AddToGroceryButton />`** for the `<RecipeDetailPage />` — this component calls `dispatch({ type: 'ADD_RECIPE', payload: recipe })` from context. Also add a smaller version to `<RecipeCard />` for quick-add from the home page.
3. **Build `<GroceryBadge />`** for the `<Navbar />` — reads the item count from context and displays it as a small counter badge. This demonstrates how Context lets distant components (navbar and recipe page) share state without prop drilling.
4. **Build the `<GroceryListPage />`:**
   - `<GroceryItem />` — a single ingredient row with a checkbox, ingredient name, quantity, and unit. Toggling the checkbox dispatches `TOGGLE_ITEM`.
   - Write a `mergeIngredients()` utility function that aggregates ingredients across selected recipes, combining duplicates with the same name and unit (e.g., two recipes needing "1 cup almond milk" becomes "2 cups almond milk"). This is **derived state** — computed from the raw data in context.
   - `<ClearListButton />` and `<PrintButton />` at the bottom
5. **Persist grocery list to `localStorage`** — use a `useEffect` to sync your reducer state to `localStorage` on every change, and initialize from `localStorage` on first load. This is a proper use of `useEffect` — syncing with an external system (browser storage), not data fetching.

### React Concepts You'll Practice
- `useContext` and `useReducer` for complex shared client state
- Context Provider pattern
- Derived state (computing the merged grocery list from selected recipes)
- `useEffect` for syncing with `localStorage` (a proper `useEffect` use case)
- The distinction between client state (Context) and server state (TanStack Query)

### Resources
- [React docs — Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React docs — useReducer](https://react.dev/reference/react/useReducer)

### Milestone Checkpoint ✓
You can pick 3 recipes, go to the grocery list page, and see a combined, de-duplicated shopping list with checkboxes. The list persists if you close and reopen the browser.

---

## Phase 5: Polish, UX & Responsive Design

**Goal:** Make the app feel great to use on any device.

### Tasks
1. **Responsive navbar** — add a hamburger menu toggle for mobile using `useState` (open/close) and Tailwind's `md:hidden` / `md:flex` utilities. This is a classic React exercise in toggling UI with state.
2. **Responsive layout** — mobile-first grid for recipe cards (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), collapsible filters on small screens
3. **Recipe images** — use [Supabase Storage](https://supabase.com/docs/guides/storage) to upload and serve recipe photos
4. **Empty states** — friendly messages when no recipes match a filter or the grocery list is empty
5. **Loading skeletons** — show placeholder shapes while data loads instead of a spinner
6. **Transitions** — subtle page transitions and hover effects (Tailwind's `transition` utilities make this easy)
7. **Print-friendly grocery list** — a `@media print` stylesheet so users can print their list
8. **Favicon and metadata** — give the app a proper name, icon, and Open Graph tags for when links are shared

### Resources
- [Tailwind responsive design docs](https://tailwindcss.com/docs/responsive-design)
- [Supabase Storage guide](https://supabase.com/docs/guides/storage)

### Milestone Checkpoint ✓
The app looks and feels polished on both phone and desktop. You'd feel good showing it to your family.

---

## Phase 6: Deploy & Share

**Goal:** Get the app live on a public URL your friends and family can visit.

### Tasks
1. **Make sure your repo is up to date** — commit and push all your latest work to GitHub
2. **Deploy to Vercel** (recommended for React/Vite):
   - Connect your GitHub repo at [vercel.com](https://vercel.com)
   - Add your Supabase environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
   - Vercel auto-deploys on every push to `main`
3. **Set up Supabase Row Level Security (RLS)** — since there are no user accounts, configure a public read-only policy so anyone can view recipes but only you can edit them (via the Supabase dashboard)
4. **Custom domain (optional)** — buy a cheap domain and point it to Vercel if you want a memorable URL

### Resources
- [Vercel deployment guide for Vite](https://vite.dev/guide/static-deploy#vercel)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

### Milestone Checkpoint ✓
You send a link to your family group chat and they can browse your vegan recipes from their phones.

---

## Phase 7 (Future Ideas)

Once the core app is live, here are features you can add as you keep learning:

- **Servings adjuster** — scale ingredient quantities up or down based on desired servings
- **Favorites** — save favorite recipes to `localStorage` (or Supabase later if you add accounts)
- **Recipe submission form** — a protected admin page where you can add recipes from the app itself instead of the Supabase dashboard (teaches forms, validation, and TanStack Query `useMutation` for writing data)
- **Meal planner** — drag-and-drop weekly meal calendar (explore libraries like `@dnd-kit`)
- **PWA support** — add a service worker and manifest so the app can be "installed" on phones without an app store
- **User accounts** — Supabase Auth lets you add login so family members can save their own favorites

---

## Tailwind: Yes or No?

**Use Tailwind.** Here's why it's a good fit for your situation specifically:

You already know CSS, so Tailwind won't be a crutch — it'll be a productivity tool. You'll still understand everything happening under the hood. The main benefits for this project are rapid prototyping (you'll iterate on recipe card layouts quickly), built-in responsive utilities, and a consistent design system without writing a bunch of custom CSS files. When Tailwind feels limiting for something specific, just write regular CSS alongside it — they play together fine.

---

## Suggested Timeline

| Phase | Estimated Time |
|---|---|
| Phase 1 — Foundation, TypeScript & GitHub | 4–6 days |
| Phase 2 — Components, State & TanStack Query | 5–7 days |
| Phase 3 — Supabase Swap | 2–4 days |
| Phase 4 — Grocery List | 3–5 days |
| Phase 5 — Polish | 3–5 days |
| Phase 6 — Deploy | 1 day |

**Total: roughly 3–5 weeks** at a steady pace, depending on how much time you put in daily. Phase 1 has an extra day to get comfortable with TypeScript syntax. Phase 3 is short because TanStack Query makes the Supabase swap trivial — you're only changing a `queryFn`, not rewriting components. Don't rush — the goal is to learn React deeply, not just finish.
