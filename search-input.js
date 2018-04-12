class SearchInput extends HTMLElement {

  constructor(){
    super();
    this._$input = null;
    this._$container = null;
    this._$siInput = null;
    this._$handles = null;
    this._$handle2 = null;
    this._$openBtn = null;
    this._isOpen = false;
  }

  connectedCallback(){
    this.innerHTML = `
      <div class="si-container">
        <div class = "si-input-frame">
          <input type="text" id="siInput" />
        </div>
        <div class="si-right-half-circle"></div>
        <button id="siOpenBtn"></button>
        <div id="siHandles">
          <div id="siHandle1"  class = "si-handle"></div>
          <div id="siHandle2"  class = "si-handle"></div>
        </div>
      </div>
    `;
    this._$input = this.querySelector("#siInput");
    this._$container = this.querySelector(".si-container");
    this._$handles = this.querySelector("#siHandles");
    this._$handle2 = this.querySelector("#siHandle2");
    this._$openBtn = this.querySelector("#siOpenBtn");
    this._$openBtn.addEventListener("click", () => {
      if (this._isOpen === true) return;
      this._open();
    });
    this._$handles.addEventListener("click", () => {
      if (this._isOpen === false) return;
      this._close();
    });
  }
  _open(){
      this._isOpen = true;
      this._$container.classList.add("open");
      this._$input.animate([
        { transform: "translateX(calc(100% - 25px))"},
        { transform: "translateX(25px)" },
      ], {
        duration: 500,
        fill: "forwards",
        easing: "ease-out"
      });
      this._$handles.animate([
        { transform: "translate(0px, 0px) rotate(45deg)"},
        { transform: "translate(-20px, -20px) rotate(45deg)"},


      ], {
        duration: 200,
        fill: "forwards",
        easing: "ease-out"
      }).onfinish = () => {
        this._$handle2.animate([
          { transform: "translate(0px,0px) rotate(0)"},
          { transform: "translate(0px,0px) rotate(90deg)"},
        ], {
          duration: 400,
          fill: "forwards",
          easing: "cubic-bezier(1,-0.33,.51,1.61)",
        });
        this._$input.focus();
      };


    }

  _close(){
    this._isOpen = false;
    this._$container.classList.remove("open");
    this._$input.blur();
    this._$input.animate([
      { transform: "translateX(calc(100% - 25px))"},
      { transform: "translateX(25px)" },
    ], {
      duration: 300,
      fill: "backwards",
      easing: "ease-out"
    }).reverse();
    this._$handles.animate([
      { transform: "translate(0px, 0px) rotate(45deg)"},
      { transform: "translate(-20px, -20px) rotate(45deg)"},


    ], {
      duration: 700,
      fill: "backwards",
      easing: "cubic-bezier(.97,-0.2,.52,1.53)"
    }).reverse();
    this._$handle2.animate([
      { transform: "translate(0px,0px) rotate(90deg)"},
      { transform: "translate(0px,0px) rotate(0deg)"},
    ], {
      duration: 100,
      fill: "forwards",
      easing: "cubic-bezier(1,-0.26,.57,1.46)",
    });

  };
}


customElements.define("search-input", SearchInput);
