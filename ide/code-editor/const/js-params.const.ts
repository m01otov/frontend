const OPTIONAL_WHITE_SPACE = ' ?';
const VARIABLE = '(\\w+)';
const DEFAULT_VALUE = '=(.+)';
const TYPE = `(.+)`;
const DISCRIPTION = `-${OPTIONAL_WHITE_SPACE}(.+)`;

export const JS_PARAMS_REGEXP_STRING_TEMPLATE =  String.raw`@param \{${TYPE}\}${OPTIONAL_WHITE_SPACE}\[${VARIABLE}(?:${DEFAULT_VALUE})?\]${OPTIONAL_WHITE_SPACE}(?:${DISCRIPTION})?`;
