'use strict';
var cloudinary = require('int_cloudinary_sfra/cloudinary/cloudinary');
var detail = require('base/product/detail');
var base = require('base/product/base');

function updateAttribute() {
  $('body').on('product:afterAttributeSelect', function (e, response) {
        // custom start: update cloudinary PGW
    cloudinary.updateCloudinaryGalleryWidget(response.data.cloudinary);
        // custom end: update cloudinary PGW
    if ($('.product-detail>.bundle-items').length) {
      response.container.data('pid', response.data.product.id);
      response.container.find('.product-id').text(response.data.product.id);
    } else if ($('.product-set-detail').eq(0)) {
      response.container.data('pid', response.data.product.id);
      response.container.find('.product-id').text(response.data.product.id);
    } else {
      $('.product-id').text(response.data.product.id);
      $('.product-detail:not(".bundle-item")').data('pid', response.data.product.id);
    }
  });
}

/**
 * Update availability on change event on quantity selector and on store:afterRemoveStoreSelection event.
 * If store has been selected, exit function otherwise proceed to update attributes.
 * @param {Object} element DOM Element.
 */
function updateAvailability(element) {
  var $productContainer = $(element).closest('.product-detail');
  var searchPID = $(element).closest('.product-detail').attr('data-pid');
  var selectorPrefix = '.product-detail[data-pid="' + searchPID + '"]';
  if ($(selectorPrefix + ' .selected-store-with-inventory').is(':visible')) {
    return;
  }

  if (!$productContainer.length) {
    $productContainer = $(element).closest('.modal-content').find('.product-quickview');
  }

  if ($('.bundle-items', $productContainer).length === 0) {
    base.attributeSelect($(element).find('option:selected').data('url'),
            $productContainer);
  }
}

/**
 * Registering on change event on quantity selector and on store:afterRemoveStoreSelection event.
 */
function availability() {
  $(document).on('change', '.quantity-select', function (e) {
    e.preventDefault();
    updateAvailability($(this));
  });
  $(document).on('store:afterRemoveStoreSelection', function (e, element) {
    e.preventDefault();
    updateAvailability(element);
  });
}

var exportDetails = $.extend({}, base, detail, { availability: availability, updateAttribute: updateAttribute });

module.exports = exportDetails;
