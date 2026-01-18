export default async function handler(req, res) {
  const { endpoint } = req.query;
  
  try {
    const response = await fetch(`https://stats.nba.com/stats/${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'Referer': 'https://www.nba.com/',
        'User-Agent': 'Mozilla/5.0'
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
