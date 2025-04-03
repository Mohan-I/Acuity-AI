// const aiKey = 'AIzaSyBVMhrAXvnw3BRFlgkY4pcNZHoUV-eYtiQ';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEN_APIKEY; // Note: Vite requires env vars to be prefixed with VITE_
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
      generationConfig,
      history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  
  // For client-side, just return the text response
  return result.response.text();
  
  // If you need to handle inline data (like images), you would:
  // 1. Return the data URL or blob instead of trying to save files
  // 2. Let the client handle displaying/downloading the content
}

export default run;