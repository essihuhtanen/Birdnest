import axios from 'axios'

export const fetcher = async ({ path, id }: { path: string; id?: string }) => {
  const urlEnding = id ? `${path}/${id}` : path
  const options = {
    url: `${process.env.REACT_APP_BACKEND_URL}/${urlEnding}`,
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  const response = await axios(options)
  return response.data
}
