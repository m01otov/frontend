import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Icon } from '@lukoil/scad-ide-ui-core';
import { MenuBar } from '@components/menu-bar';
import { MainNavigation } from '@components/main-navigation';
import { Logo } from '@components/logo';
import { useIDEContext } from '@root/context';

export const DefaultLayout: FC<unknown> = observer(() => {
  const ideContext = useIDEContext();

  return (
    <>
      <MenuBar>
        <Logo />
        <MainNavigation>
          <MainNavigation.Item 
            to={ideContext.projectId
              ? `projects/${ideContext.projectId}`
              : 'projects'
            }>
            <Icon.Files size={20} />
          </MainNavigation.Item>

          <MainNavigation.Item to="settings">
            <Icon.Settings size={20} />
          </MainNavigation.Item>

          <MainNavigation.Item to="help">
            <Icon.Help size={20} />
          </MainNavigation.Item>
        </MainNavigation>
      </MenuBar>
      
      <main>
        <Outlet />
      </main>
    </>
  )
})

DefaultLayout.displayName = 'DefaultLayout';
