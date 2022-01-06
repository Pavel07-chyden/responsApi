import axios, { AxiosResponse } from 'axios'
import { setFetching } from '../reducers/reposReducer'


export const getContributors = async (username: string, reponame: string, setContributors: any) => {
   (setFetching(false))
   try {
      (setFetching(false))
      const response = await axios.get<AxiosResponse, any>(`https://api.github.com/repos/${username}/${reponame}/contributors?page=1&per_page=10`)
      setContributors(response.data)
   } catch (e) {

   } finally {
      (setFetching(false))
   }
}
