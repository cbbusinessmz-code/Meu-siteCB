
import { GoogleGenAI } from "@google/genai";

// Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (title: string, category: string, type: string) => {
  try {
    // Using gemini-3-flash-preview for basic text generation tasks as recommended.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma descrição curta, profissional e persuasiva para um produto digital do tipo "${type}" chamado "${title}" na categoria "${category}". Use uma linguagem atraente para o mercado de Moçambique. Max 3 parágrafos.`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    // Directly access the .text property from the GenerateContentResponse object.
    return response.text || "Não foi possível gerar a descrição.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com a IA.";
  }
};
