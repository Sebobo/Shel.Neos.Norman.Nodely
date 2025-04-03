(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/@neos-project/neos-ui-extensibility/dist/readFromConsumerApi.js
  function readFromConsumerApi(key) {
    return (...args) => {
      if (window["@Neos:HostPluginAPI"] && window["@Neos:HostPluginAPI"][`@${key}`]) {
        return window["@Neos:HostPluginAPI"][`@${key}`](...args);
      }
      throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!");
    };
  }
  var init_readFromConsumerApi = __esm({
    "node_modules/@neos-project/neos-ui-extensibility/dist/readFromConsumerApi.js"() {
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/react/index.js
  var require_react = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/react/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("vendor")().React;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/prop-types/index.js
  var require_prop_types = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/prop-types/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("vendor")().PropTypes;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/react-redux/index.js
  var require_react_redux = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/vendor/react-redux/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("vendor")().reactRedux;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/neos-ui-decorators/index.js
  var require_neos_ui_decorators = __commonJS({
    "node_modules/@neos-project/neos-ui-extensibility/dist/shims/neosProjectPackages/neos-ui-decorators/index.js"(exports, module) {
      init_readFromConsumerApi();
      module.exports = readFromConsumerApi("NeosProjectPackages")().NeosUiDecorators;
    }
  });

  // node_modules/@neos-project/neos-ui-extensibility/dist/index.js
  init_readFromConsumerApi();
  var dist_default = readFromConsumerApi("manifest");

  // src/NormanNodelyPlugin.jsx
  var import_react2 = __toESM(require_react());
  var import_prop_types2 = __toESM(require_prop_types());
  var import_react_redux = __toESM(require_react_redux());
  var import_neos_ui_decorators = __toESM(require_neos_ui_decorators());

  // src/SpeechBubble.jsx
  var import_react = __toESM(require_react());
  var import_prop_types = __toESM(require_prop_types());
  var SpeechBubble = class extends import_react.PureComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "handleClose", () => {
        const { onClose, id } = this.props;
        setTimeout(() => onClose(id), 100);
      });
    }
    componentDidMount() {
      const { timeout } = this.props;
      if (timeout) {
        setTimeout(this.handleClose, timeout);
      }
    }
    render() {
      const { message, severity } = this.props;
      return /* @__PURE__ */ import_react.default.createElement("span", { className: "speech-bubble", role: "alert" }, message);
    }
  };
  __publicField(SpeechBubble, "propTypes", {
    id: import_prop_types.default.string.isRequired,
    message: import_prop_types.default.string.isRequired,
    severity: import_prop_types.default.string.isRequired,
    timeout: import_prop_types.default.number,
    onClose: import_prop_types.default.func.isRequired
  });

  // src/vendor/chatbot.js
  function stripTags(s) {
    return s.replace(/<\/?[^>]+(>|$)/g, "");
  }
  var ChatBot = function() {
    let patterns;
    let botName;
    let humanName;
    let thinkingHtml;
    let inputs;
    let inputCapabilityListing;
    let examplePhrases = [];
    let engines;
    let addChatEntryCallback;
    let normalizer = [];
    function updateCommandDescription() {
      const descriptions = [];
      for (let i = 0; i < patterns.length; i++) {
        if (patterns[i].description !== void 0) {
          descriptions.push(patterns[i].description);
        }
      }
      for (let i = 0; i < engines.length; i++) {
        const caps = engines[i].getCapabilities();
        for (let j = 0; j < caps.length; j++) {
          descriptions.push(caps[j]);
        }
      }
      examplePhrases = [];
      let description = "";
      for (let i = 0; i < descriptions.length; i++) {
        let pdesc = descriptions[i].replace(/(['"][^'"]+['"])/gi, '<span class="phraseHighlight">$1</span>');
        pdesc = pdesc.replace(/(\[[^\[\]]+\])/gi, '<span class="placeholderHighlight">$1</span>');
        const regex = /<span class=['"]phraseHighlight["']>['"](.+?)['"]<\/span>/gi;
        let matches;
        while ((matches = regex.exec(pdesc)) !== null) {
          examplePhrases.push(stripTags(matches[1].replace(/['"]/gi, "")));
        }
        description += '<div class="commandDescription">' + pdesc + "</div>";
      }
      let datalist = document.getElementById("chatBotCommands");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "chatBotCommands";
        document.body.appendChild(datalist);
      } else {
        datalist.innerHTML = "";
      }
      for (let i = 0; i < examplePhrases.length; i++) {
        const option = document.createElement("option");
        option.value = examplePhrases[i];
        datalist.appendChild(option);
      }
      const commandDescElem = document.getElementById("chatBotCommandDescription");
      if (commandDescElem) {
        commandDescElem.innerHTML = description;
      }
    }
    return {
      Engines: {},
      init: function(options) {
        const settings = {
          // these are the defaults.
          botName: "Bot",
          humanName: "You",
          thinkingHtml: '<img src="data:image/gif;base64,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"/>',
          inputs: "",
          inputCapabilityListing: true,
          engines: [],
          patterns: [],
          normalizer: [],
          addChatEntryCallback: function(entryDiv, text, origin) {
            entryDiv.addClass("appear");
          },
          ...options
        };
        botName = settings.botName;
        humanName = settings.humanName;
        thinkingHtml = settings.thinkingHtml;
        inputs = settings.inputs;
        inputCapabilityListing = settings.inputCapabilityListing;
        engines = settings.engines;
        patterns = settings.patterns;
        addChatEntryCallback = settings.addChatEntryCallback;
        normalizer = settings.normalizer;
        updateCommandDescription();
        const inputElements = document.querySelectorAll(inputs);
        inputElements.forEach((input) => {
          input.setAttribute("list", "chatBotCommands");
          input.addEventListener("keyup", function(e) {
            if (e.keyCode === 13) {
              ChatBot.addChatEntry(this.value, "human");
              ChatBot.react(this.value);
            }
          });
        });
      },
      setBotName: function(name) {
        botName = name;
      },
      setHumanName: function(name) {
        humanName = name;
        document.querySelectorAll(".chatBotChatEntry.human .origin").forEach((elem) => elem.innerHTML = name);
      },
      addChatEntry: function addChatEntry(text, origin) {
        const entryDiv = document.createElement("div");
        entryDiv.className = "chatBotChatEntry " + origin;
        entryDiv.innerHTML = '<span class="origin">' + (origin === "bot" ? botName : humanName) + "</span>" + text;
        document.getElementById("chatBotHistory").prepend(entryDiv);
        if (addChatEntryCallback !== void 0) {
          addChatEntryCallback.call(this, entryDiv, text, origin);
        }
      },
      thinking: function(on) {
        const ti = document.getElementById("chatBotThinkingIndicator");
        if (on) {
          ti.innerHTML = thinkingHtml;
        } else {
          ti.innerHTML = "";
        }
      },
      react: function react(text) {
        this.thinking(true);
        normalizer.map((method) => {
          if (String.prototype[method] instanceof Function) {
            text = text[method]();
          } else if (method instanceof Function) {
            text = method(text) || text;
          }
        });
        for (let i = 0; i < patterns.length; i++) {
          const pattern = patterns[i];
          const r = new RegExp(pattern.regexp, "i");
          const matches = text.match(r);
          if (matches) {
            switch (pattern.actionKey) {
              case "rewrite":
                text = pattern.actionValue;
                for (let j = 1; j < matches.length; j++) {
                  text = text.replace("$" + j, matches[j]);
                }
                if (pattern.callback !== void 0) {
                  pattern.callback.call(this, matches);
                }
                break;
              case "response":
                let response = pattern.actionValue;
                if (response !== void 0) {
                  for (let j = 1; j < matches.length; j++) {
                    response = response.replace("$" + j, matches[j]);
                  }
                  this.addChatEntry(response, "bot");
                }
                ChatBot.thinking(false);
                if (pattern.callback !== void 0) {
                  pattern.callback.call(this, matches);
                }
                return;
            }
            break;
          } else {
            this.addChatEntry("I have no idea what you mean, please try again.", "bot");
          }
        }
        for (let e = 0; e < engines.length; e++) {
          const engine = engines[e];
          engine.react(text);
        }
      },
      addPatternObject: function(obj) {
        patterns.push(obj);
        updateCommandDescription();
      },
      addPattern: function(regexp, actionKey, actionValue, callback, description) {
        const obj = {
          regexp,
          actionKey,
          actionValue,
          description,
          callback
        };
        this.addPatternObject(obj);
      }
    };
  }();
  var chatbot_default = ChatBot;

  // src/NormanNodelyPlugin.jsx
  var _NormanNodelyPlugin = class extends import_react2.default.PureComponent {
    constructor() {
      super(...arguments);
      __publicField(this, "state", {
        lastFlashMessage: {
          id: "0",
          message: "Hi, I'm Norman Nodely! How can I help you today?",
          severity: "default",
          timeout: 1e4
        }
      });
      __publicField(this, "handleClick", () => {
        if (this.state.lastFlashMessage) {
          this.setState({ lastFlashMessage: null });
        } else {
          const message = this.getRandomMessage("default");
          this.setState({
            lastFlashMessage: {
              id: "" + Math.random() * 1e3,
              message,
              severity: "default",
              timeout: 3e3
            }
          });
        }
      });
      __publicField(this, "handleSubmit", (e) => {
      });
    }
    componentDidMount() {
      const that = this;
      chatbot_default.init({
        inputs: "#normanNodelyInput",
        inputCapabilityListing: true,
        addChatEntryCallback: (entryDiv, text, origin) => {
          if (origin !== "bot") {
            return;
          }
          that.setState({
            lastFlashMessage: {
              id: "" + Math.random() * 1e3,
              message: text,
              severity: "info",
              timout: 1e4
            }
          });
          document.getElementById("normanNodelyInput").value = "";
        }
      });
      chatbot_default.setBotName("Norman Nodely");
      chatbot_default.addPattern(
        "(?:my name is|I'm|I am) (.*)",
        "response",
        "Hi $1, thanks for talking to me today",
        function(matches) {
          chatbot_default.setHumanName(matches[1]);
        },
        "Say 'My name is [name]' to be called by your name."
      );
      chatbot_default.addPattern(
        "How (.*) publish(.*)",
        "response",
        "Just click the publish button on the top right corner."
      );
      const svg = document.getElementById("normanSvg");
      document.addEventListener("mousemove", (e) => {
        movePupils(e);
      });
      function movePupils(e) {
        let eyes = svg.querySelectorAll(".eye");
        eyes.forEach((eye, i) => {
          let eyeball = eye.querySelector(".eyeball");
          let pupil = eye.querySelector(".pupil");
          let pCenter = { x: +eyeball.getAttribute("cx"), y: +eyeball.getAttribute("cy") };
          let rEyeball = +eyeball.getAttribute("r");
          let rPupil = +pupil.getAttribute("r");
          let pCursor = new DOMPoint(e.clientX, e.clientY);
          pCursor = pCursor.matrixTransform(svg.getScreenCTM().inverse());
          let angle = Math.atan2(pCursor.y - pCenter.y, pCursor.x - pCenter.x) * 180 / Math.PI + i * 60;
          let a = pCursor.x - pCenter.x;
          let b = pCursor.y - pCenter.y;
          let distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
          let offset = distance < rEyeball ? 1 / rEyeball * distance : 1;
          let radiusOuter = (rEyeball - rPupil) * offset;
          let pMoved = {
            x: pCenter.x + Math.cos(angle * Math.PI / 180) * radiusOuter,
            y: pCenter.y + Math.sin(angle * Math.PI / 180) * radiusOuter
          };
          pupil.setAttribute("cx", pMoved.x);
          pupil.setAttribute("cy", pMoved.y);
        });
      }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.flashMessages !== prevProps.flashMessages) {
        const latestMessage = Object.values(this.props.flashMessages).slice(-1)[0];
        if (!latestMessage) {
          this.setState({
            lastFlashMessage: null
          });
        }
        this.setState({
          lastFlashMessage: {
            ...latestMessage,
            message: this.getRandomMessage(latestMessage?.severity),
            timeout: 7e3
          }
        });
      }
    }
    getRandomMessage(severity) {
      const messageCollection = _NormanNodelyPlugin.messages[severity] || _NormanNodelyPlugin.messages.default;
      const randomIndex = Math.floor(Math.random() * messageCollection.length);
      return messageCollection[randomIndex];
    }
    render() {
      const { lastFlashMessage } = this.state;
      return /* @__PURE__ */ import_react2.default.createElement("div", { className: "normanNodely" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "avatar", onClick: this.handleClick }, /* @__PURE__ */ import_react2.default.createElement(
        "svg",
        {
          id: "normanSvg",
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          x: "0",
          y: "0",
          width: "111.73",
          height: "124.72",
          viewBox: "0, 0, 111.73, 124.72"
        },
        /* @__PURE__ */ import_react2.default.createElement("defs", null, /* @__PURE__ */ import_react2.default.createElement("clipPath", { id: "Clip_1" }, /* @__PURE__ */ import_react2.default.createElement("path", { d: "M12.341,10.964 L115.341,10.964 L115.341,69.964 L12.341,69.964 z" }))),
        /* @__PURE__ */ import_react2.default.createElement("g", { id: "Ebene_1", transform: "translate(-5.976, -8.964)" }, /* @__PURE__ */ import_react2.default.createElement("g", { id: "neos_avatar_primary" }, /* @__PURE__ */ import_react2.default.createElement("path", { d: "M95.006,8.964 L74.246,24.094 L74.246,55.734 L95.006,85.084 L95.006,8.964 z", fill: "#28234C" }), /* @__PURE__ */ import_react2.default.createElement(
          "path",
          {
            d: "M95.006,121.784 L15.216,8.964 L5.976,15.724 L5.976,133.684 L26.726,118.564 L26.726,60.144 L78.626,133.684 L101.326,133.684 L117.706,121.784 L95.006,121.784 z",
            fill: "#28234C"
          }
        ), /* @__PURE__ */ import_react2.default.createElement(
          "path",
          {
            d: "M26.726,60.144 L26.726,118.564 L5.976,133.684 L28.676,133.684 L49.436,118.564 L49.436,92.314 L26.726,60.144 z",
            fill: "#009FE3"
          }
        ), /* @__PURE__ */ import_react2.default.createElement(
          "path",
          {
            d: "M95.006,85.084 L95.006,8.964 L117.706,8.964 L117.706,121.784 L95.006,121.784 L15.216,8.964 L41.166,8.964 L95.006,85.084 z",
            fill: "#009FE3"
          }
        )), /* @__PURE__ */ import_react2.default.createElement("g", { className: "eye" }, /* @__PURE__ */ import_react2.default.createElement("circle", { className: "eyeball", cx: "30", cy: "50", r: "20", fill: "white", stroke: "#000" }), /* @__PURE__ */ import_react2.default.createElement("circle", { className: "pupil", cx: "30", cy: "50", r: "10", fill: "#000" })), /* @__PURE__ */ import_react2.default.createElement("g", { className: "eye" }, /* @__PURE__ */ import_react2.default.createElement("circle", { className: "eyeball", cx: "95", cy: "50", r: "20", fill: "white", stroke: "#000" }), /* @__PURE__ */ import_react2.default.createElement("circle", { className: "pupil", cx: "95", cy: "50", r: "10", fill: "#000" })))
      )), /* @__PURE__ */ import_react2.default.createElement(
        "input",
        {
          id: "normanNodelyInput",
          type: "text",
          placeholder: "Talk to me\u2026",
          onKeyPress: this.handleSubmit
        }
      ), /* @__PURE__ */ import_react2.default.createElement("div", { id: "chatBot" }, /* @__PURE__ */ import_react2.default.createElement("div", { id: "chatBotThinkingIndicator" }), /* @__PURE__ */ import_react2.default.createElement("div", { id: "chatBotHistory" })), lastFlashMessage?.id && /* @__PURE__ */ import_react2.default.createElement(
        SpeechBubble,
        {
          id: lastFlashMessage.id,
          message: lastFlashMessage.message,
          severity: lastFlashMessage.severity,
          timeout: lastFlashMessage.timeout,
          onClose: this.handleClick
        }
      ));
    }
  };
  var NormanNodelyPlugin = _NormanNodelyPlugin;
  __publicField(NormanNodelyPlugin, "propTypes", {
    flashMessages: import_prop_types2.default.object
  });
  __publicField(NormanNodelyPlugin, "defaultProps", {
    flashMessages: {}
  });
  // Message collections for each severity type
  __publicField(NormanNodelyPlugin, "messages", {
    success: [
      "Hurray! You did it!",
      "Awesome job! That worked perfectly!",
      "Success! Everything went as planned.",
      "Well done! That was a great move.",
      "Perfect! That's exactly right.",
      "Excellent work! Mission accomplished.",
      "Bravo! You nailed it!",
      "Fantastic! That's the way to do it.",
      "Great success! Keep up the good work.",
      "Splendid! That worked like a charm."
    ],
    error: [
      "Oh no! Something went wrong!",
      "Oops! That didn't quite work.",
      "Uh-oh! We hit a snag.",
      "That didn't go as planned.",
      "We've got a problem here.",
      "Error detected! Let's try something else.",
      "That's not right. Maybe try again?",
      "Something's not working properly.",
      "Well, that didn't work. Let's rethink this.",
      "Houston, we have a problem!"
    ],
    info: [
      "Just so you know...",
      "Here's something you might find interesting.",
      "FYI: This might be useful to know.",
      "Quick update for you...",
      "Did you know? Here's some info.",
      "Heads up! Something to be aware of.",
      "For your information...",
      "Here's a tip that might help.",
      "Just a friendly reminder...",
      "By the way, I thought you should know..."
    ],
    default: [
      "Hello there!",
      "Hey! How's it going?",
      "Greetings from Norman!",
      "Hi! I'm your friendly assistant.",
      "Welcome back!",
      "Hey there! Need any help?",
      "Good to see you!",
      "Hello! I'm here if you need me.",
      "Hi! What are we working on today?",
      "Hey! Ready for some productivity?"
    ]
  });
  var mapStateToProps = (state) => ({
    flashMessages: state.ui.flashMessages
  });
  var mapDispatchToProps = (dispatch) => ({});
  var mapGlobalRegistryToProps = (0, import_neos_ui_decorators.neos)((globalRegistry) => ({}));
  var NormanNodelyPlugin_default = (0, import_react_redux.connect)(() => ({}), {})((0, import_react_redux.connect)(mapStateToProps, mapDispatchToProps)(mapGlobalRegistryToProps(NormanNodelyPlugin)));

  // src/manifest.js
  dist_default("Shel.Neos.SubTrees:TabbedPageTree", {}, (globalRegistry, { configuration }) => {
    const containerRegistry = globalRegistry.get("containers");
    containerRegistry.set("PrimaryToolbar/Left/Brand", NormanNodelyPlugin_default);
  });
})();
