export const Inspection = () => {
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && (event.key === "S" || event.key === "s")) {
      event.preventDefault();
    }
    if (
      event.key === "F12" ||
      (event.ctrlKey && event.key === "C") ||
      (event.ctrlKey && (event.key === "E" || event.key === "e")) ||
      (event.ctrlKey && (event.key === "J" || event.key === "j")) ||
      (event.ctrlKey && (event.key === "I" || event.key === "i")) ||
      (event.ctrlKey && (event.key === "K" || event.key === "k")) ||
      (event.ctrlKey && (event.key === "U" || event.key === "u"))
    ) {
      event.preventDefault();
    }
  });
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
};
