import { observer } from 'mobx-react-lite';

import { RenderSystem } from '@lukoil/scad-runtime-core';
import { useRuntimeContext } from '../../provider';

import styles from './styles.module.scss';

export const ProjectViewer = observer(() => {  
  const { mainScreen } = useRuntimeContext()

  return (
    <div className={styles.project_viewer}>
      <div className={styles.project_viewer_content}>
        <RenderSystem entities={mainScreen} />
      </div>
    </div>
  )
})
