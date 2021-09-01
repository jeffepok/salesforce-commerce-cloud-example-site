'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

var cloudinaryConstants = require('*/cartridge/scripts/util/cloudinaryConstants');
var cloudinaryModel = require('*/cartridge/scripts/model/cloudinaryModel');

/**
 * Render logic for storefront.productTile component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var ProductFactory = require('*/cartridge/scripts/factories/product');

    var content = context.content;
    var productTileParams = { pview: 'tile', pid: context.content.product.ID };
    var product = ProductFactory.get(productTileParams);

    var productUrl = URLUtils.url('Product-Show', 'pid', product.id).relative().toString();


    if (cloudinaryConstants.CLD_ENABLED && product) {
        var productPrimaryImg = cloudinaryModel.getProductPrimaryImage(product.id, cloudinaryConstants.CLD_HIGH_RES_IMAGES_VIEW_TYPE, {
            pageType: pageType
        });

        if (!empty(productPrimaryImg)) {
            cloudinaryModel.addCloudinaryProductImage(product, productPrimaryImg);
        }
        // add cloudinary swatch images
        if (cloudinaryConstants.CLD_ENABLE_SWATCH_ON_PLP) {
            cloudinaryModel.addCloudinaryProductSwatchImage(product, pageTypeSwatches);
        }
    }

    model.product = product;
    
    model.display = {
        swatches: true,
        ratings: content.displayRatings
    };
    model.urls = {
        product: productUrl
    };

    return new Template('experience/components/commerce_assets/product/productTile').render(model).text;
};
