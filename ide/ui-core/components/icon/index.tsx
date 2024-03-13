import type { CSSProperties, FC } from 'react';
import { upperFirst, camelCase } from 'lodash';

import data from './icons.json';
import styles from './styles.module.scss';

type TIconProps = {
  size?: number;
  rotate?: number;
}

export const Icon = data.selection.reduce((out, current, idx) => {
    const componentName = upperFirst(camelCase(current.name));

    const component: FC<TIconProps> = ({ size = 24, rotate = 0 }) => (
        <svg
          width={size}
          height={size}
          viewBox="0 0 1024 1024"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
          style={{
            '--rotate': `${rotate}deg`
          } as CSSProperties}>
            {data.icons[idx].paths.map((path, idx) => <path key={idx} d={path} fill="currentColor" />)}
        </svg>
    );

    component.displayName = `Icon.${componentName}`;

    out[componentName] = component;

    return out;

}, {} as Record<string, FC<TIconProps>>);
