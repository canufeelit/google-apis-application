import axios from 'axios'

const youtubeSearch = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/'
})

export default async (searchTerm, nextPageToken) => {
  const options = {
    path: '/search',
    params: {
      q: searchTerm,
      key: process.env.REACT_APP_API_KEY,
      part: 'snippet',
      type: 'video',
      maxResults: 12,
      pageToken: nextPageToken
    }
  }

  try {
    const response = await youtubeSearch.get(options.path, {
      params: options.params
    })
    return response.data
  } catch (error) {
    throw error
    // Log error somewhere for visibility
  }
}
