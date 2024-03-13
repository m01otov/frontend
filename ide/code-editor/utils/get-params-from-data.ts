import { JS_PARAMS_REGEXP_STRING_TEMPLATE } from '../const/js-params.const';
import { validateJsType } from './validate-js-params';

type TVariableMeta = {
  type: string[]
  variable: string
  defaultValue?: string
  discription?: string
}

export const getParamsFromData = (data: string) => {
  const matchedParams = [...data.matchAll(new RegExp(JS_PARAMS_REGEXP_STRING_TEMPLATE, 'g'))];

  return (
    matchedParams.reduce<TVariableMeta[]>((acc, [_, type, variable, defaultValue, discription]) => {
      const typeList = type.split('|');
      const isTypesValid = typeList.every(validateJsType)
  
      if (!isTypesValid) return acc;

      acc.push({
        type: typeList,
        variable,
        defaultValue,
        discription
      });
  
      return acc;
    }, [])
  )
}
