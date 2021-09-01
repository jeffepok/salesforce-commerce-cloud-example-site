'use strict';

var ProductMgr = require('dw/catalog/ProductMgr');
var txn = require('dw/system/Transaction');

function run() {
    txn.wrap(function(){
        var products = ProductMgr.queryAllSiteProducts();
        while (products.hasNext()) {
          products.next().setOnlineFlag(true);
        }
    });

}

exports.Run = run;


