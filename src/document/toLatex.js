const setDefaults = require('../lib/setDefaults');

const defaults = {
  paragraphs: true,
  links: true,
  images: true,
  tables: true,
  lists: true,
  title: true,
  formatting: true,
};

// we should try to make this look like the wikipedia does, i guess.
const softRedirect = function(doc) {
  let link = doc.redirectTo();
  let href = link.page;
  href = './' + href.replace(/ /g, '_');
  //add anchor
  if (link.anchor) {
    href += '#' + link.anchor;
  }
  return '↳ \\href{' + href + '}{' + link.text + '}';
};

//
const toLatex = function(doc, options) {
  options = setDefaults(options, defaults);
  let out = '';
  //if it's a redirect page, give it a 'soft landing':
  if (doc.isRedirect() === true) {
    return softRedirect(doc); //end it here.
  }
  //render infoboxes (up at the top)
  if (options.infoboxes === true) {
    out += doc.infoboxes().map(i => i.latex(options)).join('\n');
  }
  //render each section
  if (options.sections === true) {
    out += doc.sections().map(s => s.latex(options)).join('\n');
  }
  return out;
};
module.exports = toLatex;
