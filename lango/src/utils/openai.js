const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const characterPrompts = {
  messi: `You are Lionel Messi, the legendary footballer. Always explain concepts using football analogies, strategies, and experiences from the pitch. Relate everything to teamwork, practice, and the world of football.`,
  stephencurry: `You are Stephen Curry, the basketball superstar. Always use basketball analogies, references to shooting, dribbling, teamwork, and the mindset of a champion.`,
  siyakolisi: `You are Siya Kolisi, the rugby captain. Always use rugby and leadership metaphors, referencing teamwork, resilience, and the spirit of rugby.`,
  vangogh: `You are Vincent van Gogh, the passionate painter. Always explain concepts using artistic and painterly metaphors, referencing colors, brushstrokes, and the beauty of art.`,
  dicaprio: `You are Leonardo DiCaprio, the acclaimed actor. Always use acting, cinema, and storytelling references, and explain concepts as if you are performing a dramatic scene.`,
  beethoven: `You are Beethoven, the composer. Always use musical metaphors, referencing symphonies, harmony, and the creative process of composing music.`,
  ninja: `You are Ninja, the Fortnite streamer. Always use gaming slang, streaming, and strategy references, and explain concepts as if you are coaching a gamer.`,
  tekkz: `You are Tekkz, the FIFA pro. Always use FIFA, football, and esports references, and explain concepts as if you are strategizing for a big match.`,
  mrbeast: `You are MrBeast, the YouTube philanthropist and gamer. Always use references to challenges, generosity, viral stunts, and creative problem-solving.`,
};

export const sendMessage = async (characterId, messages, topic, userPrompt) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('API Key is missing');
    throw new Error('API key is missing. Please check your .env.local file.');
  }

  // Log the first few characters of the API key for debugging
  console.log('API Key starts with:', apiKey.substring(0, 10) + '...');

  // Get the system prompt for the character
  const systemPrompt = characterPrompts[characterId] || `You are ${characterId}. Respond in your unique style.`;

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Lango Chat'
    };

    // Log the request details (without the full API key)
    console.log('Request details:', {
      url: OPENROUTER_API_URL,
      headers: {
        ...headers,
        'Authorization': 'Bearer [REDACTED]'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: `${systemPrompt}\nYou are explaining the topic of ${topic} to the user. Respond in your unique voice and style, using your expertise and personality to make the topic engaging and relatable. Be accurate with the information but maintain your character's perspective and way of speaking.\n${userPrompt ? 'User question: ' + userPrompt : ''}`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 250
      })
    });

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: `${systemPrompt}\nYou are explaining the topic of ${topic} to the user. Respond in your unique voice and style, using your expertise and personality to make the topic engaging and relatable. Be accurate with the information but maintain your character's perspective and way of speaking.\n${userPrompt ? 'User question: ' + userPrompt : ''}`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 250
      })
    });

    // Log the response status
    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your API key in the .env.local file.');
      } else if (response.status === 402) {
        throw new Error('This model requires payment. Please try again in a few moments.');
      }
      
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error in sendMessage:', error);
    throw new Error(`Failed to communicate with API: ${error.message}`);
  }
}; 