import { createBrowserRouter } from 'react-router-dom';

import { ProjectScreen } from './screens/project/[id].screen';
import { RuntimeContextProvider } from './provider';

export const createRouter = () => {
  return createBrowserRouter([{
    path: '/:id',
    element: (
      <RuntimeContextProvider>
        <ProjectScreen />
      </RuntimeContextProvider>
    )
  }, {
    path: "*",
    element: <div>404</div>
  }])
}
