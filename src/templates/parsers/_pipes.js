const strip = require('./_strip');
const parseLine = require('../../sentence').parseLine;

//try to handle inline-wikitext, (like links) inside the pipe-text
const tightenUp = function(arr) {
  return arr.map((str) => {
    if (str && str.indexOf('[') !== -1) {
      let s = parseLine(str);
      if (s.links && s.links[0]) {
        return s.links[0].page;
      }
      return s.text;
    }
    return str;
  });
};

// this splits a text-segment by '|' characters, but does so carefully
const pipes = function(tmpl) {
  tmpl = strip(tmpl);
  let arr = tmpl.split(/\|/g);
  for(let i = 0; i < arr.length; i += 1) {
    let str = arr[i];
    //stitch [[link|text]] pieces back together
    if (/\[\[[^\]]+$/.test(str) === true && /^[^\[]+\]\]/.test(arr[i + 1]) === true) {
      arr[i] += '|' + arr[i + 1];
      arr[i + 1] = null;
    }
    //stitch {{imdb|8392}} pieces back together, too
    if (/\{\{[^\}]+$/.test(str) === true && /^[^\{]+\}\}/.test(arr[i + 1]) === true) {
      arr[i] += '|' + arr[i + 1];
      arr[i + 1] = null;
    }
  }
  let name = arr[0] || '';
  arr = arr.slice(1);
  return {
    name: name.trim().toLowerCase(),
    list: tightenUp(arr)
  };
};
module.exports = pipes;
