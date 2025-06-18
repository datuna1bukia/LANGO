const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const sendMessage = async (characterId, messages) => {
  console.log('API KEY:', process.env.REACT_APP_OPENAI_API_KEY);

  if (!process.env.REACT_APP_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing');
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are ${characterId}. Respond as if you are this character, maintaining their personality, knowledge, and speaking style.`
        },
        ...messages
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to get response from OpenAI');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}; 