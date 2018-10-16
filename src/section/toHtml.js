

const doSection = (section, options) => {
  let html = '';
  //make the header
  if (options.title === true && section.title()) {
    let num = 1 + section.depth;
    html += '  <h' + num + '>' + section.title() + '</h' + num + '>';
    html += '\n';
  }
  //put any images under the header
  if (options.images === true) {
    let imgs = section.images();
    if (imgs.length > 0) {
      html += imgs.map((image) => image.html(options)).join('\n');
      html += '\n';
    }
  }
  //make a html table
  if (options.tables === true) {
    html += section.tables().map((t) => t.html(options)).join('\n');
  }
  // //make a html bullet-list
  if (section.lists() && options.lists === true) {
    html += section.lists().map((list) => list.html(options)).join('\n');
  }
  //finally, write the sentence text.
  if (options.sentences === true) {
    html += '  <div class="text">\n    ';
    html += section.sentences().map((s) => s.html(options)).join(' ');
    html += '\n  </div>\n';
  }
  return '<div class="section">\n' + html + '</div>\n';
};
module.exports = doSection;
