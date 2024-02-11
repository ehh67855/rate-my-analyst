import { Ai } from '@cloudflare/ai';

export default {
  async fetch(request: Request) {
    try {
      const requestBody = await request.json();
      const ai = new Ai('ae651a4cce1e68a7f32d4d6376c03ea08b59c'); // Replace '<YOUR_AI_KEY>' with your actual API key

      // Generate AI response using the received data
      const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
        prompt: JSON.stringify(requestBody) // Pass the received data as the prompt
      });

      return new Response(JSON.stringify(response));
    } catch (error) {
      console.error("Error generating AI response:", error);
      // Return an error response if something goes wrong
      return new Response('Error generating AI response', { status: 500 });
    }
  }
};
