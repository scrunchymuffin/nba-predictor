import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    // Get cached player data from Vercel KV
    const playerData = await kv.get('nba:player_stats');
    
    if (!playerData) {
      // Return demo data if no data is cached yet
      return res.json({
        players: generateDemoData(),
        lastUpdated: new Date().toISOString(),
        isDemoData: true
      });
    }

    res.json(playerData);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
}

function generateDemoData() {
  return [
    { name: 'LeBron James', team: 'LAL', stats: { points: { mean: '25.0', stdDev: '6.2' }, rebounds: { mean: '7.5', stdDev: '2.1' }, assists: { mean: '8.0', stdDev: '2.5' }, threes: { mean: '2.0', stdDev: '1.2' }, gamesAnalyzed: 20 } },
    { name: 'Stephen Curry', team: 'GSW', stats: { points: { mean: '27.0', stdDev: '7.5' }, rebounds: { mean: '5.0', stdDev: '1.8' }, assists: { mean: '6.0', stdDev: '2.0' }, threes: { mean: '5.0', stdDev: '2.1' }, gamesAnalyzed: 20 } },
    { name: 'Giannis Antetokounmpo', team: 'MIL', stats: { points: { mean: '30.0', stdDev: '6.8' }, rebounds: { mean: '11.0', stdDev: '2.5' }, assists: { mean: '6.0', stdDev: '2.2' }, threes: { mean: '1.0', stdDev: '0.9' }, gamesAnalyzed: 20 } },
  ].sort((a, b) => a.name.localeCompare(b.name));
}
