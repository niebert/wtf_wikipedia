const pipeSplit = require('../_parsers/pipeSplit');
const pipeList = require('../_parsers/pipeList');

const misc = {
  //https://en.wikipedia.org/wiki/Template:Taxon_info
  'taxon info': (tmpl, r) => {
    let order = ['taxon', 'item'];
    let obj = pipeSplit(tmpl, order);
    r.templates.push(obj);
    return '';
  },
  'uss': (tmpl, r) => {
    let order = ['ship', 'id'];
    let obj = pipeSplit(tmpl, order);
    r.templates.push(obj);
    return '';
  },
  //https://en.wikipedia.org/wiki/Template:Marriage
  //this one creates a template, and an inline response
  marriage: (tmpl, r) => {
    let data = pipeSplit(tmpl, ['name', 'from', 'to', 'end']);
    r.templates.push(data);
    let str = `${data.name || ''}`;
    if (data.from) {
      if (data.to) {
        str += ` (m. ${data.from}-${data.to})`;
      } else {
        str += ` (m. ${data.from})`;
      }
    }
    return str;
  },
  //https://en.wikipedia.org/wiki/Template:Based_on
  'based on': (tmpl, r) => {
    let obj = pipeSplit(tmpl, ['title', 'author']);
    r.templates.push(obj);
    return `${obj.title} by ${obj.author || ''}`;
  },
  'climate chart': (tmpl, r) => {
    let list = pipeList(tmpl).data;
    let title = list[0];
    let source = list[38];
    list = list.slice(1);
    //amazingly, they use '−' symbol here instead of negatives...
    list = list.map((str) => {
      if (str && str[0] === '−') {
        str = str.replace(/−/, '-');
      }
      return str;
    });
    let months = [];
    //groups of three, for 12 months
    for(let i = 0; i < 36; i += 3) {
      months.push({
        low: Number(list[i]),
        high: Number(list[i + 1]),
        precip: Number(list[i + 2])
      });
    }
    let obj = {
      template: 'climate chart',
      data: {
        title: title,
        source: source,
        months: months
      }
    };
    r.templates.push(obj);
    return '';
  },
  '__throw-wtf-error': () => {
    //okay you asked for it!
    throw new Error('Intentional error thrown from wtf-wikipedia!');
  }
};
module.exports = misc;
