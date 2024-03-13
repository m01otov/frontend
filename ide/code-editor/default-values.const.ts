export const JS_DEFAULT_VALUE =
`export const createWidget = (element) => ({
  //@param {int} [a=0] - Числовой параметр
  a: 0,

  init() {
    // Вызывается при первой отрисовке виджета на экран
  },

  update() {
    // Вызывается при имзенениях свойств виджета
  },

  dispose() {
    // Вызывается при удалении виджета с экрана
  },
})
`