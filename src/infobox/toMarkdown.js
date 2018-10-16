const pad = require('../lib/pad');

const dontDo = {
  image: true,
  caption: true
};

// render an infobox as a table with two columns, key + value
const doInfobox = function(obj, options) {
  let md = '|' + pad('', 35) + '|' + pad('', 30) + '|\n';
  md += '|' + pad('---', 35) + '|' + pad('---', 30) + '|\n';
  Object.keys(obj.data).forEach((k) => {
    if (dontDo[k] === true) {
      return;
    }
    let key = '**' + k + '**';
    let s = obj.data[k];
    let val = s.markdown(options);
    //markdown is more newline-sensitive than wiki
    val = val.split(/\n/g).join(', ');
    md += '|' + pad(key, 35) + '|' + pad(val, 30) + ' |\n';
  });
  return md;
};
module.exports = doInfobox;
