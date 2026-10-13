# ForkCast

ForkCast is a modern, React-based web application that generates personalized recipes based on user-provided ingredients and dietary preferences. Built using the Google Gemini API and enhanced with custom backend logic, ForkCast enables users to generate, save, and revisit their favorite recipes easily. The app supports dietary filters and intelligent ingredient substitutions for a more inclusive and useful experience.

## **Table of Contents**

* [Demo](#demo)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Usage](#usage)

---

## **Demo**

Check out the live demo of ForkCast:
[ForkCast on Vercel](https://fork-cast-orcin.vercel.app/)

---

## **Features**

* Generate personalized recipes from user-provided ingredients using Google Gemini.
* Support for dietary preferences: vegan, vegetarian, gluten-free, dairy-free.
* Specify excluded ingredients or preferred substitutes.
* Save recipe history for future reference.
* Copy and reuse recipes with one click.
* Responsive and intuitive user interface.
* Deployed on Vercel for fast and scalable performance.

---

## **Technologies Used**

* **React** – Frontend UI framework
* **Next.js** – Routing and SSR
* **Google Gemini API** – Natural language recipe generation
* **Node.js & Express** – Backend logic and history persistence
* **MongoDB** – Recipe history and user data storage
* **JavaScript, HTML, CSS** – Core development technologies

---

## **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/KanishkGoyal19/Fork-Cast.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/app/apikey). Create a `.env.local` file in the project root and add the key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

   Do not add a `VITE_` prefix: the key is used only by the server-side API endpoint. Keep `.env.local` private and do not commit it.

4. Start the app locally with its `/api/generate-recipes` endpoint:

   ```bash
   npm run dev:vercel -- --local
   ```

   This runs the Vercel development server, which serves both the Vite frontend and the API function. Open the local URL shown in the terminal.

5. For deployment on Vercel, add `GEMINI_API_KEY` under **Project Settings → Environment Variables**, then redeploy.

---

## **Usage**

1. Enter ingredients in the input field.
2. Select dietary preferences or exclusions.
3. Click "Generate Recipe" to create a custom meal.
4. Save or copy your recipe from the history tab for later use.

---

---
