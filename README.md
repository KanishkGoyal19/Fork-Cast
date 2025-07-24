# ForkCast

⚠️Currently down due to api key expiry, will be back as soon as possible.I apologise for any issues faced

ForkCast is a modern, React-based web application that generates personalized recipes based on user-provided ingredients and dietary preferences. Built using Claude AI API and enhanced with custom backend logic, ForkCast enables users to generate, save, and revisit their favorite recipes easily. The app supports dietary filters and intelligent ingredient substitutions for a more inclusive and useful experience.

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

* Generate personalized recipes from user-provided ingredients using Claude AI.
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
* **Claude AI API** – Natural language recipe generation
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

3. Create a `.env.local` file in the root directory and add the following:

   ```env
   VITE_ANTHROPIC_API_KEY=your_claude_api_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## **Usage**

1. Enter ingredients in the input field.
2. Select dietary preferences or exclusions.
3. Click "Generate Recipe" to create a custom meal.
4. Save or copy your recipe from the history tab for later use.

---

---
