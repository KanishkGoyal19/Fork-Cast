# ForkCast

ForkCast is a responsive recipe-generation web application that creates personalized recipes from ingredients the user has available. Users can choose dietary preferences or exclude specific ingredients, then generate a Markdown-formatted recipe through Groq.

**Live application:** [fork-cast-orcin.vercel.app](https://fork-cast-orcin.vercel.app/)

## Features

- Add ingredients using an alphabet-and-whitespace-only input.
- Generate recipes after adding at least four ingredients.
- Filter recipes using vegan, vegetarian, gluten-free, and dairy-free preferences.
- Exclude one or more specified ingredients.
- Render generated recipes as formatted Markdown.
- Copy generated recipes to the clipboard.
- Display a temporary loading state and disable repeated submissions.
- Save-button UI for selecting or deselecting a recipe.

> The current Save button is a local UI state only. Recipe persistence and recipe history are not implemented.

## Architecture

```text
React frontend
    |
    | POST /api/generate-recipes
    v
Vercel serverless API function
    |
    | Groq chat-completions request
    v
Groq openai/gpt-oss-20b model
```

- **React 19** builds the component-based frontend.
- **Vite 6** provides development and production frontend tooling.
- **Tailwind CSS 4** provides utility-first styling.
- **Groq SDK** communicates with Groq from the server-side API.
- **React Markdown** renders generated recipe text.
- **Remark GFM** adds GitHub-Flavored Markdown support.
- **Vercel** hosts the frontend and serverless API function.

The Groq API key is kept server-side through `GROQ_API_KEY`. It is never included in frontend code or a `VITE_` environment variable.

## Project Structure

```text
api/
  generate-recipes.js       Serverless Groq API handler
public/
  background.jpg            Page background
  images.png                ForkCast logo
src/
  components/
    Filters.jsx             Dietary and exclusion controls
    HeroSection.jsx         Logo and introduction
    IngredientsList.jsx     Ingredient list and generate button
    Recipe.jsx              Markdown result and copy/save controls
  pages/
    App.jsx                 Page composition and background
    Main.jsx                Application state and request logic
  index.css                 Tailwind CSS entry point
index.jsx                   React DOM entry point
vite.config.js              Vite configuration
tailwind.config.js          Tailwind content and plugin configuration
postcss.config.js           PostCSS configuration
```

`Header.jsx` exists but is not currently rendered in `App.jsx`.

## How It Works

1. `index.jsx` creates a React root and renders `App`.
2. `Main.jsx` stores ingredients, dietary filters, recipe text, loading state, and validation errors.
3. The user enters an ingredient and submits the form.
4. The frontend validates the text with a regular expression and appends valid ingredients to state.
5. After four ingredients are added, `IngredientsList.jsx` displays the Generate Recipe button.
6. The frontend sends a `POST` request containing ingredients and filters to `/api/generate-recipes`.
7. `api/generate-recipes.js` validates the request and constructs a system prompt and user prompt.
8. The server sends the prompt to Groq using the `openai/gpt-oss-20b` model.
9. Groq returns recipe text in Markdown.
10. The frontend stores the text in state and renders it with `ReactMarkdown`.
11. The user can copy the result or toggle the visual Save control.

## Environment Setup

### Prerequisites

- Node.js
- npm
- A Groq API key
- Optional for full local API testing: Vercel CLI

### Installation

```bash
git clone https://github.com/KanishkGoyal19/Fork-Cast.git
cd Fork-Cast
npm install
```

Create `.env.local` in the project root:

```env
GROQ_API_KEY=your_groq_api_key
```

Do not commit this file or expose the key to browser code.

### Run Locally

Vite alone starts the frontend:

```bash
npm run dev
```

To run the frontend and `/api/generate-recipes` serverless function together:

```bash
npx vercel dev
```

Open the local URL printed by Vercel.

For a production frontend build:

```bash
npm run build
```

To preview the build locally:

```bash
npm run preview
```

## Vercel Deployment

Set `GROQ_API_KEY` as an environment variable in the Vercel project settings, then deploy. Vercel will:

- Build the Vite frontend
- Serve the static assets
- Expose `api/generate-recipes.js` as `/api/generate-recipes`

## API Reference

### `POST /api/generate-recipes`

Request body:

```json
{
  "ingredients": ["chicken", "rice", "broccoli", "pepper"],
  "filters": {
    "vegan": false,
    "vegetarian": false,
    "glutenFree": true,
    "dairyFree": false,
    "exclude": true,
    "excludedIngredients": "mushrooms"
  }
}
```

Success response:

```json
{
  "recipe": "# Recipe title\n\n..."
}
```

Response statuses:

- `200`: Recipe generated successfully.
- `400`: Ingredients or filters are invalid.
- `405`: HTTP method is not `POST`.
- `500`: Groq API key is missing or recipe generation fails.

## Usage

1. Enter an ingredient and select **+ Add Ingredient**.
2. Repeat until at least four ingredients are listed.
3. Optionally select dietary preferences.
4. Optionally enable exclusions and enter excluded ingredients.
5. Select **Get a Recipe**.
6. Wait for Groq to generate the Markdown recipe.
7. Use **Copy Recipe** to copy the result.

## Current Limitations

The current implementation does not include persistence or a database. In particular:

- The Save button only toggles local component state.
- Recipes do not survive a page refresh.
- No recipe history or user accounts exist.
- The API does not currently enforce the frontend's four-ingredient minimum.
- Duplicate ingredients are allowed.
- Automated tests are not included.

## Technologies

- React 19
- Vite 6
- JavaScript and JSX
- Tailwind CSS 4
- PostCSS and Autoprefixer
- Groq SDK
- React Markdown
- Remark GFM
- Rehype Raw
- Vercel serverless functions
- Vercel Analytics
