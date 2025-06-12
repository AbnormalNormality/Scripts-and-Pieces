class ThemeSelector {
  themes = [
    { value: "auto", name: "🌗" },
    { value: "light", name: "☀️" },
    { value: "dark", name: "🌕" },
  ];
  prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  localstoragekey = "ts-theme";
  cssDict = {
    ":root": {
      "--ts-font-family": "Verdana, Geneva, Tahoma, sans-serif",
      "--ts-margin": "min(2vh, 2vw)",
      "--ts-shadow": "0 1px 3px rgba(0, 0, 0, 0.2)",
    },
    '[ts-theme="light"]': {
      "--ts-background": "#fff",
      "--ts-text-colour": "#000",
      "--ts-border": "1px solid #4445",
    },
    '[ts-theme="dark"]': {
      "--ts-background": "#444",
      "--ts-text-colour": "#fff",
      "--ts-border": "1px solid #ccc5",
    },
    "#theme-selector": {
      appearance: "none",
      "background-color": "var(--ts-background)",
      border: "none",
      "border-radius": "5px",
      "box-shadow": "var(--ts-shadow)",
      color: "var(--ts-text-colour)",
      "font-family": "var(--ts-font-family)",
      "line-height": "1.2",
      outline: "none",
      padding: "0.2em 0.5em 0.4em 0.5em",
      position: "fixed",
      right: "var(--ts-margin)",
      "text-align": "center",
      top: "var(--ts-margin)",
      transition:
        "background-color 0.3s ease, color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease",
      border: "var(--ts-border)",
    },
  };

  currentTheme = null;
  selector = null;
  style = null;

  constructor() {
    this.currentTheme = localStorage.getItem(this.localstoragekey) || "auto";

    document.addEventListener("DOMContentLoaded", () => {
      if (!this.themes.find((t) => t.value === this.currentTheme))
        this.currentTheme = "auto";
      document.body.appendChild(this.createDisplay());
      if (this.selector) this.selector.value = this.currentTheme;
      this.applyTheme();
    });
  }

  createDisplay() {
    if (!this.style) {
      this.style = document.createElement("style");
      this.style.textContent = this.compileCSS(this.cssDict);
      document.head.appendChild(this.style);
    }

    if (this.selector) this.selector.remove();
    this.selector = document.createElement("select");
    this.selector.id = "theme-selector";
    this.selector.value = this.currentTheme;

    this.themes.forEach(({ value, name }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = name;
      this.selector.appendChild(option);
    });

    this.selector.addEventListener("change", (e) => {
      this.currentTheme = e.target.value;
      this.applyTheme();
    });

    this.selector.addEventListener("wheel", (e) => {
      e.preventDefault();
      const optionsArray = [...this.selector.options];
      let currentIndex = optionsArray.findIndex(
        (opt) => opt.value === this.selector.value
      );
      currentIndex += e.deltaY < 0 ? -1 : e.deltaY > 0 ? 1 : 0;
      if (currentIndex >= 0 && currentIndex < optionsArray.length) {
        this.selector.value = optionsArray[currentIndex].value;
        this.selector.dispatchEvent(new Event("change"));
      }
    });

    return this.selector;
  }

  applyTheme() {
    const theme =
      this.currentTheme === "auto"
        ? this.prefersDarkScheme.matches
          ? "dark"
          : "light"
        : this.currentTheme;

    document.documentElement.setAttribute("ts-theme", theme);
    localStorage.setItem(this.localstoragekey, this.currentTheme);

    document.querySelectorAll("[tc-only]").forEach((el) => {
      try {
        const themes = JSON.parse(el.getAttribute("tc-only"));
        if (themes.includes(theme)) {
          el.style.display = "";
        } else {
          el.style.display = "none";
        }
      } catch {
        el.style.display = "";
      }
    });
  }

  compileCSS(dict) {
    return Object.entries(dict)
      .map(([selector, rules]) => {
        const ruleString = Object.entries(rules)
          .map(([key, value]) => `${key}: ${value};`)
          .join(" ");
        return `${selector} { ${ruleString} }`;
      })
      .join("\n");
  }
}

const ts = new ThemeSelector();
