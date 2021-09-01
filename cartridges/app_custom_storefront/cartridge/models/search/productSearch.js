'use strict';


var collections = require('*/cartridge/scripts/util/collections');
var searchRefinementsFactory = require('*/cartridge/scripts/factories/searchRefinements');

var productSearchBase = module.superModule;

function getRefinements(productSearch, refinements, refinementDefinitions) {
  return collections.map(refinementDefinitions, function (definition) {
    var refinementValues = refinements.getAllRefinementValues(definition);
    var values = searchRefinementsFactory.get(productSearch, definition, refinementValues);

    return {
      displayName: definition.displayName,
      isCategoryRefinement: definition.categoryRefinement,
      isAttributeRefinement: definition.attributeRefinement,
      isPriceRefinement: definition.priceRefinement,
      isPromotionRefinement: definition.promotionRefinement,
      values: values
    };
  });
}


/**
 * @constructor
 * @classdesc ProductSearch class
 *
 * @param {dw.catalog.ProductSearchModel} productSearch - Product search object
 * @param {Object} httpParams - HTTP query parameters
 * @param {string} sortingRule - Sorting option rule ID
 * @param {dw.util.ArrayList.<dw.catalog.SortingOption>} sortingOptions - Options to sort search
 *     results
 * @param {dw.catalog.Category} rootCategory - Search result's root category if applicable
 */
function ProductSearch(productSearch, httpParams, sortingRule, sortingOptions, rootCategory) {
  productSearchBase.call(this, productSearch, httpParams, sortingRule, sortingOptions,
    rootCategory);
}

Object.defineProperty(ProductSearch.prototype, 'refinements', {
  get: function () {
    if (!this.cachedRefinements) {
      this.cachedRefinements = getRefinements(
                this.productSearch,
                this.productSearch.refinements,
                this.productSearch.refinements.refinementDefinitions
            );
    }

    return this.cachedRefinements;
  }
});
module.exports = ProductSearch;
