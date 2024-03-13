import { observer } from 'mobx-react-lite';
import Split from 'react-split';

import { FileExplorer } from '@lukoil/scad-file-explorer';
import { Panel } from '@lukoil/scad-ide-ui-core';
import { ProjectTitle } from '@root/components/project-title';
import { useIDEContext } from '@root/context';
import { AssetEditorContainer } from '@root/components/asset-editor-container';

export const ProjectScreen = observer(() => {
  const { assetEditor: AssetEditor, setFile, file, closeAssetEditor, projectId } = useIDEContext()

  return (
    <Split
      direction="horizontal"
      gutterSize={3}
      sizes={[14, 86]}
      style={{ height: '100%', display: 'flex', flexGrow: 1 }}>
      <Panel>
        {{
          header: (
            <ProjectTitle>
              Проект А
            </ProjectTitle>
          ),
          content: (
            <FileExplorer
              projectId={projectId!}
              onOpenFile={setFile} />
          )
        }}
      </Panel>
      
      <AssetEditorContainer>
        { /* @ts-expect-error: will be fixed in future */}
        {(AssetEditor && file) && <AssetEditor file={file} onClose={closeAssetEditor} />}
      </AssetEditorContainer>
    </Split>
  )
});

ProjectScreen.displayName = 'ProjectScreen';
