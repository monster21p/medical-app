
const remote = require('electron').remote;
const s=()=>{
    var window = remote.getCurrentWindow();window.close();
};
setTimeout(function(){s()},4000);
