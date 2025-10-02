import Mercury from '@postlight/mercury-parser';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const url = req.query.url || req.body?.url;
    if (!url) return res.status(400).json({ error: 'Missing url' });

    const result = await Mercury.parse(url, { fetch });
    const { title, content, author, date_published, dek, lead_image_url, url: finalUrl, domain } = result || {};
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({ title, content, author, date_published, dek, lead_image_url, finalUrl, domain });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Parse failed' });
  }
}