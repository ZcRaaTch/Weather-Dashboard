let draggableLeft = document.querySelectorAll(".draggable-left"),
  dragContLeft = document.querySelector(".drag-cont-left"),
  highlights = document.querySelector(".highlights"), // Variable 'highlights' is right side equivalent for 'dragContleLeft'
  draggableRight = document.querySelectorAll(".highlights>.card ");

// ------------------------------------------
// draggable functionality for left part of dashboard

draggableLeft.forEach((dragged) => {
  dragged.addEventListener("dragstart", (e) => {
    e.stopImmediatePropagation();
    dragged.classList.add("dragging");
  });
  dragged.addEventListener("dragend", () => {
    dragged.classList.remove("dragging");
  });
});

dragContLeft.addEventListener("dragover", (e) => {
  e.preventDefault();

  const afterElement = getDragAfterElement(dragContLeft, e.clientY);
  const dragged = document.querySelector(".dragging");

  if (afterElement == null) {
    dragContLeft.appendChild(dragged);
  } else {
    dragContLeft.insertBefore(dragged, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable-left:not(.dragging)"), //getting elements other than the one being dragged
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2; //vertical offset
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
// ------------------------------------------
// draggable functionality for right side of the dashboard

draggableRight.forEach((dragged) => {
  dragged.addEventListener("dragstart", (e) => {
    e.stopImmediatePropagation();
    dragged.classList.add("dragging");
  });

  dragged.addEventListener("dragend", () => {
    dragged.classList.remove("dragging");
  });
});

// Handle drag over event for highlights container
highlights.addEventListener("dragover", (e) => {
  e.preventDefault();
  const dragged = document.querySelector(".dragging");

  if (!dragged) return;

  const closestElement = getClosestElement(highlights, e.clientX, e.clientY);

  if (closestElement === null) {
    highlights.appendChild(dragged);
  } else {
    highlights.insertBefore(dragged, closestElement);
  }
});

// Function to get the closest element based on both x and y coordinates
function getClosestElement(container, x, y) {
  const draggableElements = [
    ...container.querySelectorAll(".highlights>.card:not(.dragging)"), //getting elements other than the one being dragged
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetX = x - (box.left + box.width / 2);
      const offsetY = y - (box.top + box.height / 2);
      const offset = Math.sqrt(offsetX ** 2 + offsetY ** 2); // Distance from center

      if (offset < closest.distance) {
        return { distance: offset, element: child };
      }

      return closest;
    },
    { distance: Number.POSITIVE_INFINITY, element: null }
  ).element;
}
