import { useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { ProjectViewer } from '../../components/project-viewer';
import { useRuntimeContext } from '../../provider';

export const ProjectScreen = observer(() => {
  const { id: projectId } = useParams();

  const { loadProject } = useRuntimeContext()

  useLayoutEffect(() => {
    if (!projectId) return;
    
    loadProject(projectId)
  }, [loadProject, projectId])

  return <ProjectViewer />
});

ProjectScreen.displayName = 'ProjectScreen';
