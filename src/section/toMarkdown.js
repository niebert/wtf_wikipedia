const setDefaults = require('../lib/setDefaults');

const defaults = {
  title: true,
  images: true,
  tables: true,
  lists: true,
  sentences: true,
};

const doSection = (section, options) => {
  options = setDefaults(options, defaults);
  let md = '';
  //make the header
  if (options.title === true && section.title()) {
    let header = '##';
    for(let i = 0; i < section.depth; i += 1) {
      header += '#';
    }
    md += header + ' ' + section.title() + '\n';
  }
  //put any images under the header
  if (options.images === true) {
    let images = section.images();
    if (images.length > 0) {
      md += images.map((img) => img.markdown()).join('\n');
      md += '\n';
    }
  }
  //make a mardown table
  if (options.tables === true) {
    let tables = section.tables();
    if (tables.length > 0) {
      md += '\n';
      md += tables.map((table) => table.html(options)).join('\n');
      md += '\n';
    }
  }
  //make a mardown bullet-list
  if (options.lists === true) {
    let lists = section.lists();
    if (lists.length > 0) {
      md += lists.map((list) => list.markdown(options)).join('\n');
      md += '\n';
    }
  }
  //finally, write the sentence text.
  if (options.sentences === true) {
    md += section.sentences().map((s) => s.markdown(options)).join(' ');
  }
  return md;
};
module.exports = doSection;
