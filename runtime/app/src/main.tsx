import 'reflect-metadata';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider as DIProvider } from 'inversify-react';

import { diContainer } from '@lukoil/scad-runtime-core';
import { createApp } from './create-app';
import { createRouter } from './router';

import './app.global.scss';

const app = await createApp('scad', diContainer);
const router = createRouter(diContainer);

app.render(
  <StrictMode>
    <DIProvider container={diContainer}>
      <RouterProvider router={router} />
    </DIProvider>
  </StrictMode>
);
