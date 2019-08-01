import axios from 'axios'

const googleSearch = axios.create({
  baseURL: 'https://www.googleapis.com/customsearch/v1/'
})

export default async (searchTerm, startIndex) => {
  const options = {
    path: '/',
    params: {
      q: searchTerm,
      key: process.env.REACT_APP_API_KEY,
      searchType: 'image',
      num: 8,
      start: startIndex,
      cx: process.env.REACT_APP_CX
    }
  }

  try {
    const response = await googleSearch.get(options.path, {
      params: options.params
    })
    return response.data
  } catch (error) {
    throw error
    // Log error somewhere for visibility
  }
}
