type TProperty = {
  type: string[]
  variable: string
  defaultValue?: string
  discription?: string
}


interface IScriptProperties {
  value: TProperty[];

  set: (value: string) => IScriptProperties
}

const OPTIONAL_WHITE_SPACE = ' ?';
const VARIABLE = '(\\w+)';
const DEFAULT_VALUE = '=(.+)';
const TYPE = `(.+)`;
const DISCRIPTION = `-${OPTIONAL_WHITE_SPACE}(.+)`;
const JS_PARAMS_REGEXP_STRING_TEMPLATE =  String.raw`@param \{${TYPE}\}${OPTIONAL_WHITE_SPACE}\[${VARIABLE}(?:${DEFAULT_VALUE})?\]${OPTIONAL_WHITE_SPACE}(?:${DISCRIPTION})?`;

export enum EJsVariableTypes  {
  STRING = 'string',
  INT = 'int',
  UINT = 'uint',
  FLOAT = 'float',
  COLOR = 'color',
  ARRAY = 'array'
}

const validateJsType = (type: string) => Object.values(EJsVariableTypes).some((jsValidType) => jsValidType === type)

export const scriptProperties = (value: TProperty[]): IScriptProperties => ({
  value,

  set(value: string) {
    const matchedParams = [...value.matchAll(new RegExp(JS_PARAMS_REGEXP_STRING_TEMPLATE, 'g'))];

    this.value = matchedParams.reduce<TProperty[]>((acc, [_, type, variable, defaultValue, discription]) => {
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
  
    return this;
  }
})
