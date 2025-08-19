import React from "react"
import IngredientsList from "../components/IngredientsList";
import Recipe from "../components/Recipe";
import Filters from "../components/Filters";

export default function Main() {
    //state management to update several user data and components
    const [ingredients, setIngredients] = React.useState([]);  //add ingredients to array
    const [recipe, setRecipe] = React.useState("");  //output of recipe from claude
    const [isLoading, setIsLoading] = React.useState(false);  // Add loading state
    const [filters, setFilters] = React.useState({  //applied filters
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        dairyFree: false,
        exclude: false,
        excludedIngredients: ""
    });
    const [error, setError] = React.useState("");  // error state for form validation

    const recipeSection = React.useRef(null);  //useRef doesnt cause a re render of the element when changed, unlike useEffect
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" });  //auto scroll to recipe when loaded 
        }
    }, [recipe]);

    async function getRecipe() {
        setIsLoading(true);
        try {
            const res = await fetch("/api/generate-recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ingredients, filters }),
            });  //POST req to API, sending ingredients and filters

            const data = await res.json();
            if (res.ok) {
                setRecipe(data.recipe);
            } else {
                setRecipe("Sorry, something went wrong.");
            }  //catch errors for non-200 responses or no recipe
        } catch (error) {
            console.error("Error fetching recipe:", error);
            setRecipe("Failed to generate recipe.");
        } finally {
            setIsLoading(false);  //reset loading state 
        }
    }

    function addIngredients(formData) {
        const newIngredient = formData.get("Ingredient");
        const isValid = /^[A-Za-z\s]+$/.test(newIngredient);  //only takes input with alphabets and spaces, regex method
        if (!newIngredient || !isValid) {
            setError("Please enter a valid ingredient using only letters and spaces.");
            return;
        }  // validation check
        setError("");  // Clear error message
        setIngredients((prevIngredientsList) => [...prevIngredientsList, newIngredient]);  //update the ingredients list with the new ingredient
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
            <Filters filters={filters} setFilters={setFilters} />   {/* Filters component for ingredient preferences */}
            {ingredients.length > 0 ? (
                <IngredientsList
                    ref={recipeSection}  // Reference to scroll into view
                    ingredients={ingredients}  // List of ingredients
                    getRecipe={getRecipe}  // Function to fetch recipe
                    isLoading={isLoading}  // Pass loading state
                />
            ) : null}  {/* If no ingredients, do not show IngredientsList. ternary function*/}

            {recipe ? <Recipe recipe={recipe} /> : null}  {/* If recipe exists, show Recipe component */}
        </main>
    );
}

