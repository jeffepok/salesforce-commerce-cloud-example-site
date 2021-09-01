'use strict';

var Template = require('dw/util/Template');

var HashMap = require('dw/util/HashMap');

/**
* Render logic for CTA With Hero Component
* @param {dw.experience.ComponentScriptContext} context The component script context object.
* @returns {string} The template to be displayed
*/
module.exports.render = function (context) {
  var content = context.content;
  var model = new HashMap();
  model.heroTitle = content.heroTitle;
  model.heroCTALink = content.heroCTALink;
  model.heroCTAText = content.heroCTAText;
  return new Template('experience/components/commerce_assets/heroWithCTA').render(model).text;
};
