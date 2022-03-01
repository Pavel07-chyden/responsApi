import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../app/store'
import Repo from './repo/Repo';
import s from './Main.module.css'
import { getReposThunk, setCurrentPage } from '../reducers/reposReducer';
import { creatorPages } from '../utils/pagesCreator';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const Main: FunctionComponent = () => {
   const dispatch = useDispatch()
   const repos = useSelector((state: RootState) => state.repos.items)
   const isFetching = useSelector((state: RootState) => state.repos.isFetching)
   const currentPage = useSelector((state: RootState) => state.repos.currentPage)
   const totalCount = useSelector((state: RootState) => state.repos.totalCount)
   const perPage = useSelector((state: RootState) => state.repos.perPage)
   const pagesCount = Math.ceil(totalCount / perPage)

   const pages: Array<number> = []

   let newPages = creatorPages(pages, pagesCount, currentPage)

   const [seachValue, setSeachValue] = useState("")

   useEffect(() => {

      dispatch(getReposThunk(seachValue, currentPage, perPage))
   }, [currentPage])

   const searchHandker = () => {
      dispatch(setCurrentPage(1))
      dispatch(getReposThunk(seachValue, currentPage, perPage))
   }


   const somePages = (page: number) => {
      dispatch(setCurrentPage(page))
   }
   console.log(repos);
   return (
      <div>
         <div className={s.search}>
            <div>
               <input value={seachValue} onChange={(e) => setSeachValue(e.currentTarget.value)} type="text" />
            </div>
            <button onClick={searchHandker} className={s.search_btn}>Search</button>
         </div>
         {
            isFetching === false
               ?
               repos && repos.map((repo: any) =>
                  <Repo repo={repo} />)
               :
               <div className={s.isFetching}>

               </div>
         }
         <div className={s.pages}>
            {newPages.map((page: any, index: any) => <span
               key={index}
               className={currentPage == page ? s.current_page : s.page}
               onClick={() => somePages(page)}
            >{page}</span>)}
         </div>
      </div>
   )
}
