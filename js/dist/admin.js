module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=7)}([function(t,e){t.exports=flarum.extensions["askvortsov-rich-text"]},function(t,e){t.exports=flarum.core.compat.extend},function(t,e,n){"use strict";var o=n(1),r=n(3),c=n.n(r);e.a=function(){Object(o.extend)(c.a.prototype,"boot",(function(){this.forum.attribute("askvortsov-checklist.cross_out_completed_items")&&$(".App").addClass("checklist-cross-completed")}))}},function(t,e){t.exports=flarum.core.compat["common/Application"]},function(t,e,n){"use strict";function o(){return(o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}n.d(e,"a",(function(){return h}));var r=n(1);function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var i=function(){return function(t){var e,n;function o(){return t.apply(this,arguments)||this}return n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,c(e,n),o.prototype.onEditorUpdate=function(){var t,e=!0,n=this.state.editorView.state.selection.$anchor.path;for(t=n.length-1;t>=0&&(!n[t].type||n[t].type!==this.state.getSchema().nodes.list_item);t--);var o=n[t]&&n[t].content.content[0];o&&o.type===this.state.getSchema().nodes.list_checkbox||(e=!1),this.$().toggleClass("active",e)},o}(n(0).components.CommandButton)};function s(t){return"paragraph_open"===t.type}function a(t){return"inline"===t.type}var u=function(t){for(var e=!1,n=t.tokens,o=n.length-3;o>=0;o--)if("list_item_open"===n[o].type&&s(n[o+1])&&a(n[o+2])){var r=n[o+2],c=/^\[([ |x|X])\]\s?/.exec(r.content);if(c){var i="x"===c[1]||"X"===c[1];r.content=r.content.slice(c[0].length),r.children[0].content=r.content;var u=new(Object.getPrototypeOf(t).Token)("list_checkbox","input",0);u.hidden=!0,u.attrPush(["type","checkbox"]),i&&u.attrPush(["checked",""]),n.splice(o+1,0,u),e=!0}}return e};var l=function(t){t.core.ruler.push("markdown-it-list-checkbox",u)},p=function(){function t(t,e,n){this.dom=this.contentDOM=document.createElement("li"),this.schema=e.state.schema,this.recalcTaskStatus(t)}var e=t.prototype;return e.update=function(t){this.recalcTaskStatus(t)},e.recalcTaskStatus=function(t){t.content.content[0]&&"list_checkbox"===t.content.content[0].type.name?(this.contentDOM.setAttribute("data-task-id",""),this.contentDOM.setAttribute("data-task-state",t.content.content[0].attrs.checked?"checked":"unchecked")):(this.contentDOM.removeAttribute("data-task-id"),this.contentDOM.removeAttribute("data-task-state"))},t}(),d=function(t,e,n){var o=!!t.attrs.checked,r=document.createElement("input");r.setAttribute("type","checkbox"),r.onclick=function(){var t=n();o=!o,e.dispatch(e.state.tr.setNodeMarkup(t,void 0,{checked:o}))},t.attrs.checked&&r.setAttribute("checked",""),this.dom=this.contentDom=r};function h(){if("askvortsov-rich-text"in flarum.extensions){var t=n(0).components.ProseMirrorMenu,e=i();Object(r.extend)(t.prototype,"items",(function(t){var o,r,c,i;t.add("check_list",e.component({type:"check_list",icon:"fas fa-check-square",tooltip:app.translator.trans("askvortsov-checklist.forum.composer.checklist_tooltip"),state:this.attrs.state,command:(o=this.attrs.state.getSchema().nodes.bullet_list,r=this.attrs.state.getSchema().nodes.list_item,c=this.attrs.state.getSchema().nodes.list_checkbox,i=n(0).wrapInList,function(t,e,n){var s,a=t.selection.$anchor.path;for(s=a.length-1;s>=0&&(!a[s].type||a[s].type!==r);s--);for(s<0&&i(o)(n.state,n.dispatch),s=(a=n.state.selection.$anchor.path).length-1;s>=0&&(!a[s].type||a[s].type!==r);s--);var u=a[s]&&a[s].content.content[0];return u&&u.type===c?e(n.state.tr.delete(a[s+2]-1,a[s+2])):e(n.state.tr.insert(a[s+2],c.create({checked:!1}))),!0})}),10)}));var c=n(0).proseMirror.markdown.MarkdownSerializerBuilder;Object(r.extend)(c.prototype,"buildNodes",(function(t){t.list_checkbox=function(t,e){t.text(e.attrs.checked?"[x] ":"[ ] ",!1)}}));var s=n(0).proseMirror.markdown.MarkdownParserBuilder;Object(r.extend)(s.prototype,"buildTokens",(function(t){o(t,{list_checkbox:{node:"list_checkbox",getAttrs:function(t){return{checked:""===t.attrGet("checked")}}}})})),Object(r.extend)(s.prototype,"buildTokenizer",(function(t){t.use(l)}));var a=n(0).proseMirror.markdown.SchemaBuilder;Object(r.override)(a.prototype,"buildNodes",(function(t){var e=t();return e.update("list_item",o({},e.get("list_item"),{content:"list_checkbox? paragraph block*"})).addBefore("list_item","list_checkbox",{defining:!0,group:"list_checkbox",attrs:{checked:{default:!1}},parseDOM:[{tag:"input[type=checkbox]",getAttrs:function(t){return isElementDOMNode(t)?{checked:t.hasAttribute("checked")}:{}}}],toDOM:function(t){var e={type:"checkbox"};return t.attrs.checked&&(e.checked=""),["input",e]}})}));var u=n(0).proseMirror.ProseMirrorEditorDriver;Object(r.extend)(u.prototype,"buildPluginItems",(function(t){t.add("checkboxEditorPlugin",new(0,n(0).Plugin)({props:{nodeViews:{list_checkbox:function(t,e,n){return new d(t,e,n)},list_item:function(t,e,n){return new p(t,e,n)}}}}))}));var h=n(0).InputRule;Object(r.extend)(u.prototype,"buildInputRules",(function(t){t.push(new h(/^\[([ |x]?)\] $/,(function(t,e,n,o){var r=t.selection.$from;if(r.depth>=3&&"list_item"===r.node(-1).type.name&&0===r.index(-1)){var c={checked:"x"===e[1]},i=r.before(-1);return t.tr.delete(n,o).insert(i+1,t.schema.nodes.list_checkbox.create(c))}return null})))})),Object(r.extend)(u.prototype,"buildPluginItems",(function(t){var e,o,r,c,i,s;t.add("checkListKeymap",n(0).keymap((e=this.schema,{Enter:(o=e.nodes.list_item,r=e.nodes.list_checkbox,c=n(0).liftListItem,i=n(0).splitListItem,s=n(0).Selection,function(t,e,n){var a,u=t.selection.$anchor.path;for(a=u.length-1;a>=0&&(!u[a].type||u[a].type!==o);a--);var l=u[a]&&u[a].content.content[0];if(!l||l.type!==r)return!1;var p=u[a].content.content[1];if(p&&!p.content.content.length)return e(n.state.tr.delete(u[a+2]-1,n.state.selection.to)),n.state.doc.resolve(n.state.selection.from-1),e(n.state.tr.setSelection(s.near(n.state.doc.resolve(t.selection.from-1)))),c(o)(t,e);if(!i(o)(t,e))return!1;var d=n.state.selection.$from.before(-1);return e(n.state.tr.insert(d+1,r.create({checked:!1}))),!0})})),10)}))}}},,,function(t,e,n){"use strict";n.r(e);var o=n(4),r=n(2);app.initializers.add("askvortsov/flarum-checklist",(function(){app.extensionData.for("askvortsov-checklist").registerSetting({setting:"askvortsov-checklist.cross_out_completed_items",label:app.translator.trans("askvortsov-checklist.admin.settings.cross_out_completed_items"),type:"boolean"}),Object(o.a)(),Object(r.a)()}))}]);
//# sourceMappingURL=admin.js.map