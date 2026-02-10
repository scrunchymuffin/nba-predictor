export default async function handler(req, res) {
  try {
    // Check if KV is available
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.log('KV not configured, returning demo data');
      return res.json({
        players: generateDemoData(),
        lastUpdated: new Date().toISOString(),
        isDemoData: true
      });
    }

    // Manually create KV REST client
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;
    
    const response = await fetch(`${kvUrl}/get/nba:player_stats`, {
      headers: {
        Authorization: `Bearer ${kvToken}`,
      },
    });

    if (!response.ok) {
      console.log('KV fetch failed, returning demo data');
      return res.json({
        players: generateDemoData(),
        lastUpdated: new Date().toISOString(),
        isDemoData: true
      });
    }

    const data = await response.json();
    
    if (!data.result) {
      console.log('No data in KV yet, returning demo data');
      return res.json({
        players: generateDemoData(),
        lastUpdated: new Date().toISOString(),
        isDemoData: true
      });
    }

    const playerData = JSON.parse(data.result);
    res.json(playerData);
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.json({
      players: generateDemoData(),
      lastUpdated: new Date().toISOString(),
      isDemoData: true
    });
  }
}

function generateDemoData() {
  return [
    { name: 'LeBron James', team: 'LAL', stats: { points: { mean: '25.0', stdDev: '6.2' }, rebounds: { mean: '7.5', stdDev: '2.1' }, assists: { mean: '8.0', stdDev: '2.5' }, threes: { mean: '2.0', stdDev: '1.2' }, gamesAnalyzed: 20 }, lastGameDate: new Date().toISOString(), nextOpponent: 'GSW', nextIsHome: true, isBackToBack: false, opponentDefenseRank: 8 },
    { name: 'Stephen Curry', team: 'GSW', stats: { points: { mean: '27.0', stdDev: '7.5' }, rebounds: { mean: '5.0', stdDev: '1.8' }, assists: { mean: '6.0', stdDev: '2.0' }, threes: { mean: '5.0', stdDev: '2.1' }, gamesAnalyzed: 20 }, lastGameDate: new Date().toISOString(), nextOpponent: 'LAL', nextIsHome: false, isBackToBack: false, opponentDefenseRank: 15 },
    { name: 'Giannis Antetokounmpo', team: 'MIL', stats: { points: { mean: '30.0', stdDev: '6.8' }, rebounds: { mean: '11.0', stdDev: '2.5' }, assists: { mean: '6.0', stdDev: '2.2' }, threes: { mean: '1.0', stdDev: '0.9' }, gamesAnalyzed: 20 }, lastGameDate: new Date().toISOString(), nextOpponent: 'BOS', nextIsHome: true, isBackToBack: false, opponentDefenseRank: 3 },
    { name: 'Luka Doncic', team: 'DAL', stats: { points: { mean: '28.0', stdDev: '7.2' }, rebounds: { mean: '9.0', stdDev: '2.3' }, assists: { mean: '8.0', stdDev: '2.4' }, threes: { mean: '3.0', stdDev: '1.5' }, gamesAnalyzed: 20 }, lastGameDate: new Date().toISOString(), nextOpponent: 'PHX', nextIsHome: false, isBackToBack: false, opponentDefenseRank: 12 },
    { name: 'Joel Embiid', team: 'PHI', stats: { points: { mean: '33.0', stdDev: '8.1' }, rebounds: { mean: '10.0', stdDev: '2.6' }, assists: { mean: '4.0', stdDev: '1.5' }, threes: { mean: '1.0', stdDev: '0.8' }, gamesAnalyzed: 20 }, lastGameDate: new Date().toISOString(), nextOpponent: 'BKN', nextIsHome: true, isBackToBack: true, opponentDefenseRank: 22 },
  ].sort((a, b) => a.name.localeCompare(b.name));
}
