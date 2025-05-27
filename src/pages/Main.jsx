import React from "react"
import IngredientsList from "../components/IngredientsList";
import Recipe from "../components/Recipe";
import Filters from "../components/Filters";

import { getRecipeFromChefClaude } from "../utils/ai";
export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);  // Add loading state
    const [filters, setFilters] = React.useState({
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        dairyFree: false,
        exclude: false,
        excludedIngredients: ""
    });
    const [error, setError] = React.useState("");

    const recipeSection = React.useRef(null);
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipe]);

    async function getRecipe() {
        setIsLoading(true);  // Start loading
        try {
            const recipeMD = await getRecipeFromChefClaude(ingredients, filters);
            setRecipe(recipeMD);
        } finally {
            setIsLoading(false);  // End loading
        }
    }
    function addIngredients(formData) {
        const newIngredient = formData.get("Ingredient");
        const isValid = /^[A-Za-z\s]+$/.test(newIngredient);
        if (!newIngredient || !isValid) {
            setError("Please enter a valid ingredient using only letters and spaces.");
            return;
        }
        setError("");  // Clear error message
        setIngredients((prevIngredientsList) => [...prevIngredientsList, newIngredient]);
    }

    return (
        <main className="p-6 min-h-screen"
        >
            <form
                action={addIngredients}
                className="flex flex-col md:flex-row items-center justify-center gap-4 bg-white shadow-md rounded-lg p-4 md:p-6 max-w-2xl mx-auto mb-6"
            >
                {error && (
                    <p className="text-red-500 font-medium text-sm mb-1 -mt-2 text-center w-full">
                        {error}
                    </p>
                )}

                <input

                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add Ingredient"
                    name="Ingredient"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                >
                    + Add Ingredient
                </button>
            </form>
            <Filters filters={filters} setFilters={setFilters} />
            {ingredients.length > 0 ? (
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    isLoading={isLoading}  // Pass loading state
                />
            ) : null}

            {recipe ? <Recipe recipe={recipe} /> : null}
        </main>
    );
}

