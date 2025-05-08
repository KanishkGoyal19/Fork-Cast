import Anthropic from '@anthropic-ai/sdk';
const SYSTEM_PROMPT = `You are Chef Claude, an expert culinary assistant. Your task is to create a recipe using the ingredients provided by the user. The recipe should primarily feature these ingredients and include clear instructions for preparation and cooking. Ensure the recipe is practical, easy to follow, and includes approximate measurements for each ingredient where applicable. If necessary, suggest additional common pantry items (e.g., salt, pepper, oil) to complete the recipe.Format your response in markdown to make it easier to render to a web page`

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY, // Correctly access the API key
    dangerouslyAllowBrowser: true,
});

export async function getRecipeFromChefClaude(ingredientsArr, filters) {
    const ingredientsString = ingredientsArr.join(", ");
    const activeFilters = Object.entries(filters)
        .filter(([key, value]) => key !== "exclude" && key !== "excludedIngredients" && value)
        .map(([key]) => key.replace(/([A-Z])/g, " $1").toLowerCase())
        .join(", ");
    const excluded = filters.exclude && filters.excludedIngredients.trim() !== ""
        ? `Please avoid using the following ingredients: ${filters.excludedIngredients}.`
        : "";
    const filterNote = activeFilters
        ? `The user prefers a recipe that is: ${activeFilters}.`
        : "";
    const userPrompt = `I have ${ingredientsString}. ${filterNote} ${excluded} Please give me a recipe you'd recommend I make.`;

    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            {
                role: "user",
                content:  userPrompt.trim(),
            }
        ],
    });
    return msg.content[0].text;
}
