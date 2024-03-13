import * as monaco from 'monaco-editor';

import { EJsVariableTypes } from '../enums/js-variable-types.enum';
import { JS_PARAMS_REGEXP_STRING_TEMPLATE } from '../const/js-params.const';

export const validateJsType = (type: string) => Object.values(EJsVariableTypes).some((jsValidType) => jsValidType === type)

export const validateJsParamsFromMonacoModel = (model: monaco.editor.ITextModel): monaco.editor.IMarkerData[] => {
	return (
    model
		.findMatches(JS_PARAMS_REGEXP_STRING_TEMPLATE, false, true, true, null, true)
		.reduce<monaco.editor.IMarkerData[]>((acc, match) => {
      const { matches, range } = match;

			if (!matches) return acc;

			const [_, type] = matches;

      const typeList = type.split('|');
      const isTypesValid = typeList.every(validateJsType);

			if (isTypesValid) return acc;

      acc.push({
        message: 'Invalid variable type',
        severity: monaco.MarkerSeverity.Error,
        startLineNumber: range.startLineNumber,
        startColumn: range.startColumn,
        endLineNumber: range.endLineNumber,
        endColumn: range.endColumn,
      });

			return acc;
		}, [])
  )
}