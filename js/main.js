var editor = ace.edit("ace-api");
editor.$blockScrolling = Infinity;

editor.setValue(document.documentElement.innerHTML, -1);
var Emmet = require("ace/ext/emmet"); // important to trigger script execution
editor.setOption("enableEmmet", true);

editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
// editor.setFontSize(14);
// editor.getSession().setUseWrapMode(true);
// editor.getSession().setTabSize(2);