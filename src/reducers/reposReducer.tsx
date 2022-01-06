import axios, { AxiosResponse } from "axios"
import { AppDispatch } from "../app/store"
import { DataType } from "./defaultStateType"

const SET_REPOS = "SET_REPOS"
const SET_IS_FETCHING = "SET_IS_FETCHING"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_IS_OWNER = "SET_IS_OWNER"
const SET_STARGAZERS_COUNT = "SET_STARGAZERS_COUNT"
const SET_IS_LOGIN = "SET_IS_LOGIN"


export type StateActions =
   | ReturnType<typeof setRepos>
   | ReturnType<typeof setFetching>
   | ReturnType<typeof setCurrentPage>
   | ReturnType<typeof setOwner>
   | ReturnType<typeof setCount>
   | ReturnType<typeof setStargazersCount>
   | ReturnType<typeof setLogin>

export type PacksInitialState = {
   items: Array<DataType> | null,
   isFetching: boolean,
   currentPage: number,
   perPage: number,
   totalCount: number,
   stargazersCount: number,
   owner: any | null,
   login: string | null,
}


const defaultState: PacksInitialState = {
   items: null,
   isFetching: true,
   currentPage: 1,
   perPage: 10,
   totalCount: 0,

   stargazersCount: 0,
   owner: null,
   login: null

}

export default function reposReducer(state = defaultState, action: StateActions): PacksInitialState {
   switch (action.type) {
      case SET_REPOS:
         return {
            ...state,
            items: action.payload,
            isFetching: false,
         }
      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.payload,
         }
      case SET_IS_FETCHING:
         return {
            ...state,
            isFetching: action.payload,
         }
      case SET_IS_OWNER:
         return {
            ...state,
            owner: action.payload,
         }
      case SET_STARGAZERS_COUNT:
         return {
            ...state,
            stargazersCount: action.payload,
         }
      case SET_IS_LOGIN:
         return {
            ...state,
            login: action.payload,
         }
      default:
         return state
   }
}



export const setStargazersCount = (stargazersCount: number) => ({ type: "SET_STARGAZERS_COUNT", payload: stargazersCount } as const)
export const setCount = (totalCount: number) => ({ type: "SET_COUNT", payload: totalCount } as const)
export const setRepos = (repos: Array<DataType>) => ({ type: "SET_REPOS", payload: repos } as const)
export const setFetching = (bool: boolean) => ({ type: "SET_IS_FETCHING", payload: bool } as const)
export const setCurrentPage = (page: number) => ({ type: "SET_CURRENT_PAGE", payload: page } as const)
export const setOwner = (avatar: any) => ({ type: 'SET_IS_OWNER', payload: avatar } as const)
export const setLogin = (login: string) => ({ type: 'SET_IS_LOGIN', payload: login } as const)


export const getCurrentReposThunk = (username: string, reponame: string) => (dispatch: AppDispatch) => {
   axios.get<AxiosResponse, any>(`https://api.github.com/repos/${username}/${reponame}`)
      .then((res) => {
         dispatch(setOwner(res.data.owner.avatar_url))
         dispatch(setLogin(res.data.owner.login))
         dispatch(setStargazersCount(res.data.stargazers_count))
      })
}
export const getReposThunk = (searchValue: string, currentPage: number, perPage: number) => (dispatch: AppDispatch) => {
   if (searchValue === "") {
      searchValue = "stars:%3E1";
   }
   axios.get<any, AxiosResponse>(`https://api.github.com/search/repositories?q=${searchValue}&sort=stars&per_page=${perPage}&page=${currentPage}`)
      .then((res) => {

         dispatch(setRepos(res.data.items))
      })
}



