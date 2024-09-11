export function draggable(node: any, data: any) {
  let state = data;

  node.draggable = true;
  node.style.cursor = "grab";

  function handle_dragstart(e: any) {
    // e.preventDefault();
    if (!e.dataTransfer) return;
    e.target.classList.add("dragging");
    e.dataTransfer.setData("text/plain", state);
  }

  function handle_dragend(e: any) {
    if (!e.dataTransfer) return;
    e.target.classList.remove("dragging");
  }

  function handle_drag(e: any) {
    if (!e.dataTransfer) return;
    console.log(e);
  }

  node.addEventListener("dragstart", handle_dragstart);
  node.addEventListener("drag", handle_drag);
  node.addEventListener("dragend", handle_dragend);

  return {
    update(data: any) {
      state = data;
    },

    destroy() {
      node.removeEventListener("dragstart", handle_dragstart);
    },
  };
}

export function dropzone(node: HTMLElement, options: any) {
  let state = {
    dropEffect: "move",
    dragover_class: "droppable",
    ...options,
  };

  // let children = Array.from(node.childNodes)
  //   .filter((childNode: ChildNode) => childNode instanceof Element)
  //   .map((element) => {
  //     if (element.classList.contains("poke")) return element;
  //   });

  function handle_dragenter(e: any) {
    if (!(e.target instanceof HTMLElement)) return;
    // const draggingElements = document.getElementsByClassName("dragging");
    // if (draggingElements.length === 0) return null;

    // const draggableElement = draggingElements[0];

    // const draggablePreview = document.createElement("div");
    // draggablePreview.className = "ghost"; // Add the 'preview' class for styling

    // draggablePreview.innerHTML = draggableElement.innerHTML;
    // if (e.target instanceof HTMLElement) {
    //   e.target.appendChild(draggablePreview);
    // }
    e.target.classList.add(state.dragover_class);
  }

  function handle_dragleave(e: any) {
    if (!(e.target instanceof HTMLElement)) return;
    // const draggingElements = document.getElementsByClassName("ghost");
    // if (draggingElements.length === 0) return null;

    // const ghost = draggingElements[0];
    // e.target.removeChild(ghost);
    e.target.classList.remove(state.dragover_class);
  }

  function handle_dragover(e: any) {
    e.preventDefault();
    if (!e.dataTransfer) {
      return;
    }

    e.dataTransfer.dropEffect = state.dropEffect;
  }

  function handle_drop(e: any) {
    e.preventDefault();
    if (!e.dataTransfer) return;
    const data = e.dataTransfer.getData("text/plain");
    if (!(e.target instanceof HTMLElement)) return;
    e.target.classList.remove(state.dragover_class);
    state.on_dropzone(data, e);
  }

  // function handle_drop(event: any) {
  //   event.preventDefault();
  //   const target = event.target;
  //   if (target.classList.contains("draggable")) {
  //     target.classList.remove("drag-over");
  //     const draggedElement = document.querySelector(".dragging");

  //     if (!draggedElement) {
  //       return;
  //     }
  //     const container = document.querySelector(".container");

  //     // Reorder items in the container
  //     if (draggedElement !== target) {
  //       const draggedIndex = Array.from(node.children).indexOf(draggedElement);
  //       const targetIndex = Array.from(node.children).indexOf(target);

  //       if (draggedIndex < targetIndex) {
  //         node.insertBefore(draggedElement, target.nextSibling);
  //       } else {
  //         node.insertBefore(draggedElement, target);
  //       }
  //     }
  //     draggedElement.classList.remove("dragging");
  //   }
  // }

  node.addEventListener("dragenter", handle_dragenter);
  node.addEventListener("dragleave", handle_dragleave);
  node.addEventListener("dragover", handle_dragover);
  node.addEventListener("drop", handle_drop);

  return {
    update(options: any) {
      state = {
        dropEffect: "move",
        dragover_class: "droppable",
        ...options,
      };
    },

    destroy() {
      node.removeEventListener("dragenter", handle_dragenter);
      node.removeEventListener("dragleave", handle_dragleave);
      node.removeEventListener("dragover", handle_dragover);
      node.removeEventListener("drop", handle_drop);
    },
  };
}
