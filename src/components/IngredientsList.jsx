export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
        <li key={index} className="text-lg font-medium text-gray-700">
            {ingredient}
        </li>
    ));

    return (
        <section className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Ingredients on Hand:</h2>
            <ul className="list-disc pl-5 space-y-2">{ingredientsListItems}</ul>
            {props.ingredients.length >= 4 ? (
                <>
                    <div ref={props.ref} className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-gray-800">Ready for a recipe?</h3>
                        <p className="text-gray-600">Generate a recipe from your list of ingredients.</p>
                        {props.isLoading && (
                            <div className="flex items-center justify-center mt-4">
                                {/* Loading spinner */}
                                <svg
                                    className="animate-spin h-5 w-5 text-gray-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                <span className="ml-2 text-gray-700">Thinking...</span>
                            </div>
                        )}
                        <button
                            onClick={props.getRecipe}
                            disabled={props.isLoading}
                            className="mt-4 bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                        >
                            Get a Recipe
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-lg mt-4">
                    Need <span className="font-bold text-red-500">{4 - props.ingredients.length}</span> more ingredients.
                </p>
            )}
        </section>
    );
}
