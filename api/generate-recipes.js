// api/generate-recipe.js
import { Anthropic } from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are Chef Claude, an expert culinary assistant. Your task is to create a recipe using the ingredients provided by the user. The recipe should primarily feature these ingredients and include clear instructions for preparation and cooking. Ensure the recipe is practical, easy to follow, and includes approximate measurements for each ingredient where applicable. If necessary, suggest additional common pantry items (e.g., salt, pepper, oil) to complete the recipe. Format your response in markdown.`;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { ingredients, filters } = req.body;

  const ingredientsString = ingredients.join(", ");
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => key !== "exclude" && key !== "excludedIngredients" && value)
    .map(([key]) => key.replace(/([A-Z])/g, " $1").toLowerCase())
    .join(", ");
  const excluded = filters.exclude && filters.excludedIngredients.trim() !== ""
    ? `Please avoid using the following ingredients: ${filters.excludedIngredients}.`
    : "";
  const filterNote = activeFilters ? `The user prefers a recipe that is: ${activeFilters}.` : "";
  const userPrompt = `I have ${ingredientsString}. ${filterNote} ${excluded} Please give me a recipe you'd recommend I make.`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userPrompt.trim(),
        }
      ],
    });

    res.status(200).json({ recipe: msg.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate recipe' });
  }
}
