import { type FC, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { kebabCase } from 'lodash';

import { useSettingsContext } from '@lukoil/scad-ide-settings';

import { dark } from './dark.theme';
import { light } from './light.theme';

const themes = { dark, light };

export const Theme: FC<unknown> = observer(() => {
  const settings = useSettingsContext();

  useLayoutEffect(() => {
    let style = document.getElementById('theme');

    if (!style) {
      style = document.createElement('style');
      style.id = 'theme';
    }

    style.textContent = `
      :root {
        ${Object.entries(themes[settings.theme]).reduce((out, [name, value]) => {
          return out += `--${kebabCase(name)}: ${value}; \n`
        }, '')}
      }
    `;

    document.head.appendChild(style);
  }, [settings.theme])

  return null;
})
