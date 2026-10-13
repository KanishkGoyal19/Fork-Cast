import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are an expert culinary assistant. Create a practical recipe using the ingredients provided by the user. Include clear preparation and cooking instructions, approximate measurements, and common pantry items when needed. Format your response in markdown.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured");
    return res.status(500).json({ error: "Recipe generation is not configured" });
  }

  const { ingredients, filters = {} } = req.body ?? {};
  if (
    !Array.isArray(ingredients) ||
    ingredients.length === 0 ||
    !ingredients.every((ingredient) => typeof ingredient === "string") ||
    !filters ||
    typeof filters !== "object" ||
    Array.isArray(filters)
  ) {
    return res.status(400).json({ error: "Provide ingredients and recipe filters" });
  }

  const ingredientsString = ingredients.join(", ");
  const activeFilters = Object.entries(filters)
    .filter(([key, value]) => key !== "exclude" && key !== "excludedIngredients" && value)
    .map(([key]) => key.replace(/([A-Z])/g, " $1").toLowerCase())
    .join(", ");
  const excludedIngredients =
    filters.exclude && typeof filters.excludedIngredients === "string"
      ? filters.excludedIngredients.trim()
      : "";
  const filterNote = activeFilters
    ? `The user prefers a recipe that is: ${activeFilters}.`
    : "";
  const excludedNote = excludedIngredients
    ? `Please avoid using the following ingredients: ${excludedIngredients}.`
    : "";
  const userPrompt = `I have ${ingredientsString}. ${filterNote} ${excludedNote} Please give me a recipe you'd recommend I make.`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1024,
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty recipe");
    }

    return res.status(200).json({ recipe: response.text });
  } catch (error) {
    console.error("Error generating recipe with Gemini:", error);
    return res.status(500).json({ error: "Failed to generate recipe" });
  }
}
