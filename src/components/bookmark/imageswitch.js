export function ImageSwitch(e) {
  return e.target.src.includes("/flag_t.png")
    ? e.target.setAttribute("src", "/flag.png")
    : e.target.setAttribute("src", "/flag_t.png");
}
