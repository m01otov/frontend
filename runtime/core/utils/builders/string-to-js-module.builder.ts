export const stringToJsModule = async (content: string) => {
  const blob = new Blob([content], { type: 'text/javascript' });
  const file = URL.createObjectURL(blob)
  const module = await import(/* @vite-ignore */file)

  return module
}
