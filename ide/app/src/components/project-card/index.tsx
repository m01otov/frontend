import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Icon } from '@lukoil/scad-ide-ui-core';

import styles from './styles.module.scss'

type TProjectCardProps = {
  id: string
  title: string
  discription: string
}

export const ProjectCard: FC<TProjectCardProps> = ({ id, discription, title }) => (
  <div className={styles.card}>
    <div className={styles.card__title}>{title}</div>

    <NavLink to={id} className={styles.card__edit}>
      <Icon.Edit size={16} />
    </NavLink>

    <div className={styles.card__discription}>{discription}</div>
  </div>
)