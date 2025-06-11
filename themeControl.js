class ThemeControl {
  themes = [
    ["light", "Light"],
    ["dark", "Dark"],
    ["auto", "Auto"],
  ];
  currentTheme = null;
  colourTheme = null;

  div = null;
  colorSchemeQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  html = document.documentElement;

  constructor() {
    const theme = this.getSavedTheme();
    this.currentTheme = theme;
    this.colourTheme = this.parseTheme(theme);

    this.colorSchemeQueryList.addEventListener("change", () => {
      if (this.currentTheme == "auto") this.setTheme(this.currentTheme);
    });
    this.setTheme(this.currentTheme);
  }

  createDisplay() {
    this.div = document.createElement("div");
    this.div.id = "theme-control";

    const label = document.createElement("label");
    label.textContent = "Theme: ";
    label.setAttribute("for", "theme-select");

    const select = document.createElement("select");
    select.id = "theme-select";

    this.themes.forEach(([value, text]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      option.selected = value === this.currentTheme;
      select.appendChild(option);
    });

    select.addEventListener(
      "change",
      function () {
        this.setTheme(select.value);
      }.bind(this)
    );

    this.div.appendChild(label);
    this.div.appendChild(select);

    return this.div;
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.colourTheme = this.parseTheme(theme);

    this.html.setAttribute("tc-theme", this.colourTheme);
    localStorage.setItem("tc-theme", theme);
  }

  getSavedTheme() {
    const savedTheme = localStorage.getItem("tc-theme");
    return savedTheme ? savedTheme : "auto";
  }

  parseTheme(theme) {
    return theme === "auto"
      ? this.colorSchemeQueryList.matches
        ? "dark"
        : "light"
      : theme;
  }
}

const tc = new ThemeControl();
tc.createDisplay();

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(tc.div);
});
