import 'reflect-metadata';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider as DIProvider } from 'inversify-react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { diContainer } from '@lukoil/scad-runtime-core';
import { Notifications, type TNotificationsProps } from '@lukoil/scad-ide-notifications';
import { Theme } from '@lukoil/scad-ide-ui-core';

import { createRouter } from '@root/router';
import { createApp } from './create-app';

import './app.global.scss';

const app = await createApp('scad-ide', diContainer, {
  enableMockWorker: false
});
const router = createRouter(diContainer);

const notificationsConfig: TNotificationsProps = {
  maxSnack: 3,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  }
}

app.render(
  <StrictMode>
    <DIProvider container={diContainer}>
      <Notifications {...notificationsConfig} />
      <Theme />
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
    </DIProvider>
  </StrictMode>
);

DIProvider.displayName = 'DIProvider';
