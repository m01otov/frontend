import { forwardRef, useLayoutEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

import { useForwardedRef } from '@lukoil/scad-ide-ui-core';
import { useCodeEditorContext } from '../../provider';
import { getOrCreateModel } from '../../utils/models'
import { validateJsParamsFromMonacoModel } from '../../utils/validate-js-params';

import styles from './styles.module.scss';
import { JS_DEFAULT_VALUE } from '../../default-values.const';

type TMonacoProps = {
  path: string;
};

const DEFAULT_VALUE: Record<string, string> = {
	javascript: JS_DEFAULT_VALUE
}

//TODO: по возможности добавить генерацию комментария @param через контекстное меню 

export const Monaco = forwardRef<HTMLDivElement, TMonacoProps>(({
	path,
}, ref) => {
	const { value, language, setValue } = useCodeEditorContext();
	const containerRef = useForwardedRef(ref);
	const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	useLayoutEffect(() => {
		const { current: containerElement } = containerRef;

		if (containerElement && !editor.current) {
			monaco.editor.defineTheme('scad', {
				base: 'vs-dark',
				inherit: true,
				rules: [],
				colors: {
					'editor.background': '#1D2127',
					'dropdown.background': '#181c21',
					'dropdown.foreground': '#787D82',
					'list.activeSelectionBackground': '#22272F'
				}
			});

			let initialValue = value || DEFAULT_VALUE[language] || '';
			const monacoInstance = monaco.editor.create(containerElement, {
				language,
        model: getOrCreateModel(monaco, initialValue, language, path),
        theme: 'scad',
				minimap: {
					enabled: false,
				},
				scrollbar: {
					useShadows: false,
					verticalScrollbarSize: 2
				},
        automaticLayout: true,
			});

			const validateParams = () => {}
				if (language === 'javascript') {
					const model = monacoInstance.getModel()

				if (model) {
					const markers = validateJsParamsFromMonacoModel(model);
					monaco.editor.setModelMarkers(model, "owner", markers);
				}
			}

			setValue(monacoInstance.getValue())
      monacoInstance.onDidChangeModelContent(() => {
				validateParams();
				setValue(monacoInstance.getValue())
      });

			validateParams();

      editor.current = monacoInstance;
		}

		return () => {
			editor.current?.getModel()?.dispose()
			editor.current?.dispose();

			editor.current = null;
    };
	}, [containerRef.current, language, path])

	return (
		<div
			ref={containerRef}
			className={styles.monaco} />
	);
})

Monaco.displayName = 'Monaco';
