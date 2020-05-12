import mustache from "mustache/mustache.mjs";

export class SCPElement extends HTMLElement {
  constructor() {
    super();
    this.data = {};
    this.name = Object.getPrototypeOf(this).constructor.name;
  }

  get styles() {
    return "";
  }

  get html() {
    return "<div></div>";
  }

  connectedCallback() {
    $scp_component[this.name] = this;
    const style = document.createElement("style");
    style.innerText = this.styles;
    this.appendChild(style);
    this.render();
  }

  render() {
    this.innerHTML =
      mustache.render(this.html, this.data) + `<style>${this.styles}</style>`;
  }
}
