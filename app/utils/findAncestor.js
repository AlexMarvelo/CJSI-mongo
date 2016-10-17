window.findAncestor = function(el, cls) {
  while (!el.classList.contains(cls)) {
    el = el.parentElement;
  }
  return el;
};
