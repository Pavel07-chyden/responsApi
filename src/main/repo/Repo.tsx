
import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './repo.module.css'
const Repo = (props: any) => {
   const repo = props.repo
   return (
      <div className={s.repo}>
         <div className={s.repo__header}>
            <div className={s.repo__header_name}> <NavLink to={`/card/${repo.owner.login}/${repo.name}`}>{repo.name}</NavLink></div>
            <div className={s.repo__header_stars}>Количество звезд: {repo.stargaszers_count}</div>
         </div>
         <div className={s.repo__last_commit}>{repo.updated_at}</div>
         <a href={repo.html_url} className={s.repo__link}> Cылка на репозиторий:{repo.html_url}</a>
      </div>
   );
}
export default Repo;

