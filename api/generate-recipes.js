// api/generate-recipes.js
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `You are an expert culinary assistant. Create a practical recipe using the ingredients provided by the user. The recipe should primarily feature these ingredients and include clear preparation and cooking instructions, approximate measurements, and common pantry items when needed. Format your response in markdown.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is not configured');
    return res.status(500).json({ error: 'Recipe generation is not configured' });
  }

  try {
    const { ingredients, filters = {} } = req.body ?? {};
    if (
      !Array.isArray(ingredients) ||
      ingredients.length === 0 ||
      !ingredients.every((ingredient) => typeof ingredient === 'string') ||
      !filters ||
      typeof filters !== 'object' ||
      Array.isArray(filters)
    ) {
      return res.status(400).json({ error: 'Provide ingredients and recipe filters' });
    }

    const ingredientsString = ingredients.join(', ');
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => key !== 'exclude' && key !== 'excludedIngredients' && value)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').toLowerCase())
      .join(', ');
    const excludedIngredients =
      filters.exclude && typeof filters.excludedIngredients === 'string'
        ? filters.excludedIngredients.trim()
        : '';
    const filterNote = activeFilters
      ? `The user prefers a recipe that is: ${activeFilters}.`
      : '';
    const excludedNote = excludedIngredients
      ? `Please avoid using the following ingredients: ${excludedIngredients}.`
      : '';
    const userPrompt = `I have ${ingredientsString}. ${filterNote} ${excludedNote} Please give me a recipe you'd recommend I make.`;

    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt.trim() },
      ],
      max_tokens: 1024,
    });
    const recipe = completion.choices[0]?.message?.content?.trim();

    if (!recipe) {
      throw new Error('Groq returned an empty recipe');
    }

    return res.status(200).json({ recipe });
  } catch (error) {
    console.error('Error generating recipe with Groq:', error);
    return res.status(500).json({ error: 'Failed to generate recipe' });
  }
}
