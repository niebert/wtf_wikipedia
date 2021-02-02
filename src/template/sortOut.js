const Infobox = require('../infobox/Infobox')
const Reference = require('../reference/Reference')
const Template = require('./Template')
const isCitation = new RegExp('^(cite |citation)', 'i')

const referenceTypes = {
  citation: true,
  refn: true,
  harvnb: true,
  source: true, //wikinews
}

const isObject = function (obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

// split Infoboxes from templates and references
const sortOut = function (keep, domain) {
  let res = {
    infoboxes: [],
    templates: [],
    references: [],
  }
  //remove references and infoboxes from our list
  keep.forEach((obj) => {
    let kind = obj.template || obj.type || obj.name
    // is it a Reference?
    if (referenceTypes[kind] === true || isCitation.test(kind) === true) {
      res.references.push(new Reference(obj))
      return
    }
    // is it an Infobox?
    if (obj.template === 'infobox' && obj.data && isObject(obj.data)) {
      obj.domain = domain //infoboxes need this for images, i guess
      res.infoboxes.push(new Infobox(obj))
      return
    }
    // otherwise, it's just a template
    res.templates.push(new Template(obj))
  })
  return res
}

module.exports = sortOut
