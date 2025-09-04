// Neynar API integration for Farcaster posting
const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY;
const NEYNAR_BASE_URL = 'https://api.neynar.com/v2';

export interface CastData {
  text: string;
  embeds?: Array<{
    url: string;
  }>;
  parent?: string;
  channel_id?: string;
}

export async function postToFarcaster(castData: CastData, signerUuid: string) {
  try {
    const response = await fetch(`${NEYNAR_BASE_URL}/farcaster/cast`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NEYNAR_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signer_uuid: signerUuid,
        text: castData.text,
        embeds: castData.embeds,
        parent: castData.parent,
        channel_id: castData.channel_id,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Neynar API error: ${error}`);
    }

    const result = await response.json();
    return {
      success: true,
      castHash: result.cast.hash,
      castUrl: `https://warpcast.com/${result.cast.author.username}/${result.cast.hash}`,
    };
  } catch (error) {
    console.error('Error posting to Farcaster:', error);
    throw error;
  }
}

export async function getCastEngagement(castHash: string) {
  try {
    const response = await fetch(`${NEYNAR_BASE_URL}/farcaster/cast?identifier=${castHash}&type=hash`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NEYNAR_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cast engagement`);
    }

    const result = await response.json();
    const cast = result.cast;
    
    return {
      views: cast.replies?.count || 0,
      likes: cast.reactions?.likes_count || 0,
      recasts: cast.reactions?.recasts_count || 0,
      replies: cast.replies?.count || 0,
    };
  } catch (error) {
    console.error('Error fetching cast engagement:', error);
    throw error;
  }
}

export async function validateSignerUuid(signerUuid: string) {
  try {
    const response = await fetch(`${NEYNAR_BASE_URL}/farcaster/signer?signer_uuid=${signerUuid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NEYNAR_API_KEY}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error validating signer UUID:', error);
    return false;
  }
}
