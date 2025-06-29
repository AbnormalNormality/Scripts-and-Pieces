# Scripts and Pieces

## JavaScript

### update.js

- https://abnormalnormality.github.io/Scripts-and-Pieces/scripts/update.js

Runs when referenced, but can be manually called afterwards with `checkForUpdates()`.

### themeSelector.js

- https://abnormalnormality.github.io/Scripts-and-Pieces/scripts/themeSelector.js

Adds a small box to the top right of the screen to choose a theme, by default light, dark, or system (auto).
The theme chosen can be used to modify css and js:

```
[ts-theme="dark"] {
  --background: #444;
}
```

You can also add `ts-only='["theme1", "theme2", ...]'` to an element to make it only display in certain themes.

### utilities.js

- https://abnormalnormality.github.io/Scripts-and-Pieces/scripts/utilities.js

Currently only includes `JSONLoad(path)` for reading a JSON file.

`removeFromArray(array, item)`: Removes an item from an array (only removes the first instance).

`trackPressedKeys(returnListeners)`: Returns a dictionary with the keys pressed, limited by browser. `returnListeners = true` returns the keydown and keyup listeners as well.

`trackMousePosition(returnListener)`: Returns a dictionary with the x and y coordinates of the mouse. `returnListener = true` returns the mousemove listeners as well.

### utilities.js

- https://abnormalnormality.github.io/Scripts-and-Pieces/scripts/keybinds.js

`Alt+g`: Open current website's GitHub repository (only works on *.github.io websites)
