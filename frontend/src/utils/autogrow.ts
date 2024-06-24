export const auto_grow = (element: any): void => {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight) + "px";
}