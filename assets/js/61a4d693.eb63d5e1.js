"use strict";(self.webpackChunkgpt_term_docs=self.webpackChunkgpt_term_docs||[]).push([[554],{7522:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>h});var r=n(9901);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),u=p(n),d=o,h=u["".concat(l,".").concat(d)]||u[d]||c[d]||i;return n?r.createElement(h,a(a({ref:t},m),{},{components:n})):r.createElement(h,a({ref:t},m))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9441:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(3050),o=(n(9901),n(7522));const i={sidebar_position:2},a=void 0,s={unversionedId:"Options",id:"Options",title:"Options",description:"How to use command line options",source:"@site/docs/Options.mdx",sourceDirName:".",slug:"/Options",permalink:"/gpt-term/docs/Options",draft:!1,editUrl:"https://github.com/JonWatkins/gpt-term/tree/main/packages/gpt-term-docs/docs/Options.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Tutorial",permalink:"/gpt-term/docs/Tutorial"},next:{title:"Managing Keys",permalink:"/gpt-term/docs/Managing Keys"}},l={},p=[{value:"How to use command line options",id:"how-to-use-command-line-options",level:2},{value:"Supported commandline options",id:"supported-commandline-options",level:2},{value:"-v, --verbose",id:"-v---verbose",level:3},{value:"-e, --engine <em>&lt;string&gt;</em>",id:"-e---engine-string",level:3},{value:"-m, --max-tokens <em>&lt;number&gt;</em>",id:"-m---max-tokens-number",level:3},{value:"-t, --temperature <em>&lt;number&gt;</em>",id:"-t---temperature-number",level:3},{value:"-p, --presence-penalty <em>&lt;number&gt;</em>",id:"-p---presence-penalty-number",level:3},{value:"-f, --frequency-penalty <em>&lt;number&gt;</em>",id:"-f---frequency-penalty-number",level:3},{value:"-s, --system-prompt <em>&lt;string&gt;</em>",id:"-s---system-prompt-string",level:3},{value:"-x, --stop <em>&lt;string&gt;</em>",id:"-x---stop-string",level:3},{value:"-c, --clear-history",id:"-c---clear-history",level:3}],m={toc:p},u="wrapper";function c(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"how-to-use-command-line-options"},"How to use command line options"),(0,o.kt)("p",null,"Most command line options are simple strings, such as the engine name ",(0,o.kt)("inlineCode",{parentName:"p"},"gpt-3.5-turbo")," in the following example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"gpt-term chat --engine gpt-3.5-turbo\n")),(0,o.kt)("h2",{id:"supported-commandline-options"},"Supported commandline options"),(0,o.kt)("h3",{id:"-v---verbose"},"-v, --verbose"),(0,o.kt)("p",null,"This option enables verbose logging, providing more detailed information during the execution of the CLI application."),(0,o.kt)("h3",{id:"-e---engine-string"},"-e, --engine ",(0,o.kt)("em",{parentName:"h3"},"<","string",">")),(0,o.kt)("p",null,"Use this option to specify the ChatGpt model to use for the conversation. You can choose from different models available."),(0,o.kt)("h3",{id:"-m---max-tokens-number"},"-m, --max-tokens ",(0,o.kt)("em",{parentName:"h3"},"<","number",">")),(0,o.kt)("p",null,"With this option, you can set the maximum number of tokens to generate in the chat completion. Tokens are units of text used by the model for processing."),(0,o.kt)("h3",{id:"-t---temperature-number"},"-t, --temperature ",(0,o.kt)("em",{parentName:"h3"},"<","number",">")),(0,o.kt)("p",null,"The sampling temperature determines the randomness of the output. You can set a value between 0 and 2, where higher values make the output more random."),(0,o.kt)("h3",{id:"-p---presence-penalty-number"},"-p, --presence-penalty ",(0,o.kt)("em",{parentName:"h3"},"<","number",">")),(0,o.kt)("p",null,"This option allows you to influence the model's likelihood of talking about new topics. You can set a number between -2.0 and 2.0, where positive values increase the likelihood."),(0,o.kt)("h3",{id:"-f---frequency-penalty-number"},"-f, --frequency-penalty ",(0,o.kt)("em",{parentName:"h3"},"<","number",">")),(0,o.kt)("p",null,"Use this option to control the model's likelihood of repeating the same line verbatim. Positive values between -2.0 and 2.0 decrease the likelihood."),(0,o.kt)("h3",{id:"-s---system-prompt-string"},"-s, --system-prompt ",(0,o.kt)("em",{parentName:"h3"},"<","string",">")),(0,o.kt)("p",null,"Specify your set of rules and instructions to guide the model's behavior in the conversation. This prompt helps the model understand the context and expectations.\nYou must wrap your prompt in quotes i.e. ",(0,o.kt)("inlineCode",{parentName:"p"},'-s "You are a javascript engineer"'),"."),(0,o.kt)("h3",{id:"-x---stop-string"},"-x, --stop ",(0,o.kt)("em",{parentName:"h3"},"<","string",">")),(0,o.kt)("p",null,"Up to 4 sequences where the API will stop generating further tokens. The OpenAI API expects either ",(0,o.kt)("inlineCode",{parentName:"p"},"string")," ",(0,o.kt)("inlineCode",{parentName:"p"},"array")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"null"),".\nThe value must be wrapped in quotes. To pass an array you will need to comma separate each value i.e. ",(0,o.kt)("inlineCode",{parentName:"p"},'--stop "Human:,AI:"'),"."),(0,o.kt)("h3",{id:"-c---clear-history"},"-c, --clear-history"),(0,o.kt)("p",null,"The chat function will write the history to disk when you exit. To prevent that behaviour you can pass this flag."))}c.isMDXComponent=!0}}]);