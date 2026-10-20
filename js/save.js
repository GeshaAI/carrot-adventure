const KEY='carrot-adventure-v02';
export function readSave(){try {const s=JSON.parse(localStorage.getItem(KEY)); return s?.version===2?s:null;}catch{return null;}}
export function writeSave(s){try{localStorage.setItem(KEY,JSON.stringify({version:2,...s}));return true;}catch{return false;}}
