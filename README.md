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
