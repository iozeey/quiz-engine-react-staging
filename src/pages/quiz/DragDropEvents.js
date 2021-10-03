export function handleDragStart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

export function handleDragEnterLeave(e) {
  if (e.type === "dragenter") {
  } else {
  }
}
export function handleOverDrop(e) {
    console.log("target",e.target);
  let dataAttribute = e.target.getAttribute("data-box");
  e.preventDefault();
  if (dataAttribute !== null) {
    return;
  }
  if (
    e.type !== "drop" ||
    (e.target.children.length > 0 && e.target.id !== "parentBox")
  ) {
    return;
  }
  var draggedId = e.dataTransfer.getData("text");
  var draggedEl = document.getElementById(draggedId);
  if (draggedEl) {
    if (draggedEl.parentNode === e.target) {
      return;
    }
    draggedEl.parentNode.removeChild(draggedEl);
    e.target.appendChild(draggedEl);
    
  }

}
