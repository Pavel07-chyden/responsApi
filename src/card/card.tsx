import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, RouteComponentProps } from "react-router";
import { RootState } from "../app/store";
import { getCurrentReposThunk } from "../reducers/reposReducer";
import s from "./card.module.css"

export type CardsType = {

}

//@ts-ignore
const Card = (props: CardsType & RouteComponentProps) => {
   const stargazersCount = useSelector((state: RootState) => state.repos.stargazersCount)
   const owner = useSelector((state: RootState) => state.repos.owner)
   const login = useSelector((state: RootState) => state.repos.login)



   const dispatch = useDispatch();

   const { username, reponame } = useParams<{ username: string; reponame: string }>()



   useEffect(() => {


      dispatch(getCurrentReposThunk(username, reponame));
   }, [])

   console.log();


   return (
      <div>
         <button onClick={() => props.history.goBack()} className="cack-btn">BACK</button> card repo
         <div className={s.card}>
            <img src={owner} alt='' />
            <div className={s.name}>{login}</div>
            <div className={s.stars}>{stargazersCount}</div>
         </div>

      </div>
   );
}
export default Card;

