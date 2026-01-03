export default async function handler(req, res) {
  const { endpoint } = req.query;
  
  const response = await fetch(`https://api.balldontlie.io/v1/${endpoint}`, {
    headers: {
      'Authorization': process.env.NBA_API_KEY
    }
  });
  
  if (!response.ok) {
    return res.status(response.status).json({ error: 'API request failed' });
  }
  
  const data = await response.json();
  res.json(data);
}
