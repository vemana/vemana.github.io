function addChild(root, type) {
  var node = document.createElement(type);
  root.appendChild(node);
  return node;
}

function addSpan(root, spanKlass, textContent) {
  const span = addChild(root, "span");
  span.setAttribute('class', spanKlass);
  span.textContent = textContent;
  return span;
}

class MultiThreadedProgramElement extends HTMLElement {

  constructor() { super(); }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const json = JSON.parse(this.getElementsByTagName("script")[0].innerHTML);
    console.log(Object.keys(json));
    shadow.appendChild(this.styleIt(this.getAttribute("title"), json));
    this.styleSheetLocations().map(loc => {
      const linkElem = document.createElement("link");
      linkElem.setAttribute("rel", "stylesheet");
      linkElem.setAttribute("href", `${loc}`);
      shadow.appendChild(linkElem);
    });
  }

  styleSheetLocations() {
    return ["../../../assets/css/posts/10mmm-memory-model.css"];
  }

  styleIt(title, json) {
    // Root div
    const divNode = document.createElement("div");
    divNode.setAttribute("class", "multiThreadedProgram");

    // Child 1: Title
    addSpan(divNode, "title", title);

    // Child 2: Container
    const containerNode = addChild(divNode, "div");
    containerNode.setAttribute("class", "multiThreadedProgramContainer");

    // Map: threadId -> singleThread node for the thread
    const groups = {};

    // Create the singleThread node for each Thread
    json.iList.forEach(item => {
      const threadId = item.thread;
      var singleThread = groups[threadId];
      if (!singleThread) {
        singleThread = document.createElement("div");
        singleThread.setAttribute('class', 'singleThread');

        // Special style
        const instrBackgroundColor = json.threadData[threadId].backgroundColor;
        const style = addChild(singleThread, 'style');
        style.type = 'text/css';
        const scopeCssContent = `
          @scope {
            & span.instr {
              background-color: ${instrBackgroundColor};
            }        
          }          
        `;
        style.appendChild(document.createTextNode(scopeCssContent));

        // header
        addSpan(singleThread, 'header', json.threadData[threadId].name);

        groups[threadId] = singleThread;
        containerNode.appendChild(singleThread);
      }
    })

    // Fill up each of the threads
    json.iList.forEach(item => {
      const threadId = item.thread;
      var singleThread = groups[threadId];
      Object.keys(groups).forEach(key => {
        if(key == threadId) {
          const finalClass = ['instr'].concat(item.classes || []).join(' ');
          const instrSpan = addSpan(groups[key], finalClass, item.instr);
        }
        else
          addSpan(groups[key], 'emptyInstr', '');
      });
    })

    return divNode;
  }
}
customElements.define("multi-threaded-program", MultiThreadedProgramElement);
//////////////////////////////

/*
const tmpl_multiThreadedProgram = document.createElement('template');
tmpl_multiThreadedProgram.innerHTML= `
<style>
@import "../../../assets/css/posts/10mmm-memory-model.css";
</style>
<div class="multiThreadedProgram">
  <slot></slot>
</div>
`;

class MultiThreadedProgramElement extends HTMLElement {
  static observedAttributes = [];

  constructor() { super(); }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styleIt());
  }

  styleIt() {
    return tmpl_multiThreadedProgram.content.cloneNode(true);
  }
}
customElements.define("multi-threaded-program", MultiThreadedProgramElement);
//////////////////////////////

class InstructionListElement extends HTMLElement {
  static observedAttributes = [];

  constructor() { super(); }

  // Code attribute is a line of text like:
  // X = random() | flag = FULL | while(flag == FULL) {}
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.styleIt(this.getAttribute("threadId"), 
                                    this.parseCodeToInstrns(this.getAttribute("code"))));
    this.styleSheetLocations().map(loc => {
      const linkElem = document.createElement("link");
      linkElem.setAttribute("rel", "stylesheet");
      linkElem.setAttribute("href", `${loc}`);
      shadow.appendChild(linkElem);
    });
  }

  styleSheetLocations() {
    return ["../../../assets/css/posts/10mmm-memory-model.css"];
  }

  parseCodeToInstrns(code) {
    return code.split("|").map(item => item.trim());
  }

  // Input is
  styleIt(threadId, code) {
    const root = document.createElement("div");
    root.setAttribute("class", "instructionList");
    
    const threadSpan = addChild(root, "span");
    threadSpan.setAttribute("class", "instructionThread");
    threadSpan.textContent = threadId;

    code.forEach(instrn => {
      const codeSpan = addChild(root, "span");
      codeSpan.setAttribute("class", "instruction");
      codeSpan.textContent = instrn;
    })

    return root;
  }
}
customElements.define("instruction-list", InstructionListElement);
*/
