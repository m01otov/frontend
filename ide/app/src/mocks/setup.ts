import { setupWorker } from 'msw';

import { projectsHandlers } from './projects.handlers';
import { filesHandlers } from './files.handlers';
import { foldersHandlers } from './folders.handlers';

export const worker = setupWorker(
  ...projectsHandlers,
  ...filesHandlers,
  ...foldersHandlers
);
