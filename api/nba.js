export default async function handler(req, res) {
  const { endpoint } = req.query;
  
  try {
    const response = await fetch(`https://api-nba-v1.p.rapidapi.com/${endpoint}`, {
      headers: {
        'X-RapidAPI-Key': process.env.NBA_API_KEY,
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
