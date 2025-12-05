import { put, head } from '@vercel/blob';

const BLOB_NAME = 'portable-context-store.json';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get the store from blob storage
      try {
        const blob = await head(BLOB_NAME);
        if (blob && blob.url) {
          const response = await fetch(blob.url);
          if (response.ok) {
            const data = await response.json();
            return res.status(200).json(data);
          }
        }
        // Blob doesn't exist or couldn't be fetched, return empty store
        return res.status(200).json({ groups: [] });
      } catch (error) {
        // Blob doesn't exist yet, return empty store
        if (error.statusCode === 404 || error.message?.includes('404')) {
          return res.status(200).json({ groups: [] });
        }
        console.error('Error fetching blob:', error);
        return res.status(200).json({ groups: [] });
      }
    } else if (req.method === 'POST' || req.method === 'PUT') {
      // Save the store to blob storage
      const data = req.body;
      const blob = await put(BLOB_NAME, JSON.stringify(data), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      });
      
      return res.status(200).json({ success: true, url: blob.url });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Blob storage error:', error);
    return res.status(500).json({ 
      error: 'Failed to access blob storage',
      message: error.message 
    });
  }
}

