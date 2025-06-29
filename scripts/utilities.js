/** @param {string} path */
export async function JSONLoad(path) {
  try {
    const res = await fetch(path);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to load JSON:", err);
    return null;
  }
}

export function removeFromArray(array, item) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export function trackPressedKeys(returnListeners = false) {
  const pressedKeys = {};

  const keyDownListener = document.addEventListener("keydown", (event) => {
    pressedKeys[event.code] = true;
  });

  const keyUpListener = document.addEventListener("keyup", (event) => {
    pressedKeys[event.code] = false;
  });

  if (returnListeners) return [mouse, keyDownListener, keyUpListener];
  return pressedKeys;
}

export function trackMousePosition(returnListener = false) {
  const mouse = { x: 0, y: 0 };

  const mouseMoveListener = document.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  if (returnListener) return [mouse, mouseMoveListener];
  return mouse;
}
