import * as monaco from 'monaco-editor';

type Monaco = typeof monaco

export function createModelUri(monaco: Monaco, path: string) {
  return monaco.Uri.parse(path);
}

export function getModel(monaco: Monaco, path: string) {
  return monaco.editor.getModel(createModelUri(monaco, path));
}

export function createModel(monaco: Monaco, value: string, language?: string, path?: string) {
  return monaco.editor.createModel(
    value,
    language,
    path ? createModelUri(monaco, path) : undefined,
  );
}

export function getOrCreateModel(monaco: Monaco, value: string, language: string, path: string) {
  return getModel(monaco, path) || createModel(monaco, value, language, path);
}