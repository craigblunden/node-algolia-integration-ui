const querystring = require('querystring');                                                                                                                                                                                                
var axios = require('axios');

// require('dotenv').config()

module.exports = {

  sanitise: function(data, netoWebsiteURL) {

    let sanitisedData = data.filter(item => {
      return !item.ParentSKU
    })

    sanitisedData = sanitisedData.map(item => {
      item.objectID = `${item.SKU}-1`
      item.ItemURL = `${netoWebsiteURL}/${item.ItemURL}`
      item.ImageURL = `${netoWebsiteURL}/assets/thumb/${item.SKU}.jpg`

      if (item.hasOwnProperty("Categories")) {
        let categories = item.Categories.map(cat => {

          let obj = {}
          if(cat.Category){
            if (cat.Category.hasOwnProperty("CategoryName") && cat.Category.hasOwnProperty("CategoryID")) {
              obj.CategoryName = cat.Category.CategoryName 
              obj.CategoryID = cat.Category.CategoryID 
            }
          }

          return obj 

        })
        item.Categories = categories
      }
      
      return item
    })

    return sanitisedData
  },

  fetchDataFromDatabase : function (netoWebsiteURL, netoAPIUsername, netoAPIKey){

    return axios.post(`${netoWebsiteURL}/do/WS/NetoAPI`, {
      "Filter" : {
        "Approved":[
          true
        ], 
        "Visible":[
          true
        ], 
        "Limit":999999999,
        "OutputSelector":[
          "ParentSKU",
          "ID",
          "Brand",
          "Model",
          // "Virtual",
          "Name",
          // "PrimarySupplier",
          // "Approved",
          // "IsActive",
          // "IsNetoUtility",
          // "AuGstExempt",
          // "NzGstExempt",
          // "IsGiftVoucher",
          // "FreeGifts",
          // "CrossSellProducts",
          // "UpsellProducts",
          // "PriceGroups",
          // "ItemLength",
          // "ItemWidth",
          // "ItemHeight",
          // "ShippingLength",
          // "ShippingWidth",
          // "ShippingHeight",
          // "ShippingWeight",
          // "CubicWeight",
          // "HandlingTime",
          // "WarehouseQuantity",
          // "WarehouseLocations",
          // "CommittedQuantity",
          // "AvailableSellQuantity",
          // "ItemSpecifics",
          "Categories",
          // "AccountingCode",
          // "SortOrder1",
          // "SortOrder2",
          // "RRP",
          // "DefaultPrice",
          // "PromotionPrice",
          // "PromotionStartDate",
          // "PromotionStartDateLocal",
          // "PromotionStartDateUTC",
          // "PromotionExpiryDate",
          // "PromotionExpiryDateLocal",
          // "PromotionExpiryDateUTC",
          // "DateArrival",
          // "DateArrivalUTC",
          // "CostPrice",
          // "UnitOfMeasure",
          // "BaseUnitOfMeasure",
          // "BaseUnitPerQuantity",
          // "QuantityPerScan",
          // "BuyUnitQuantity",
          // "SellUnitQuantity",
          // "PreOrderQuantity",
          // "PickPriority",
          // "PickZone",
          // "TaxFreeItem",
          // "TaxInclusive",
          // "SearchKeywords",
          // "ShortDescription",
          // "Description",
          // "Features",
          // "Specifications",
          // "Warranty",
          // "eBayDescription",
          // "TermsAndConditions",
          // "ArtistOrAuthor",
          // "Format",
          // "ModelNumber",
          // "Subtitle",
          // "AvailabilityDescription",
          // "Images",
          // "ImageURL",
          // "BrochureURL",
          "ProductURL",
          // "DateAdded",
          // "DateAddedLocal",
          // "DateAddedUTC",
          // "DateCreatedLocal",
          // "DateCreatedUTC",
          // "DateUpdated",
          // "DateUpdatedLocal",
          // "DateUpdatedUTC",
          // "UPC",
          // "UPC1",
          // "UPC2",
          // "UPC3",
          // "Type",
          // "SubType",
          // "NumbersOfLabelsToPrint",
          // "ReferenceNumber",
          // "InternalNotes",
          // "BarcodeHeight",
          // "SupplierItemCode",
          // "SplitForWarehousePicking",
          // "DisplayTemplate",
          // "EditableKitBundle",
          // "RequiresPackaging",
          // "IsAsset",
          // "WhenToRepeatOnStandingOrders",
          // "SerialTracking",
          // "Group",
          // "ShippingCategory",
          // "MonthlySpendRequirement",
          // "RestrictedToUserGroup",
          // "IsInventoried",
          // "IsBought",
          // "IsSold",
          // "ExpenseAccount",
          // "PurchaseTaxCode",
          // "CostOfSalesAccount",
          // "IncomeAccount",
          // "AssetAccount",
          // "KitComponents",
          // "SEOPageTitle",
          // "SEOMetaKeywords",
          // "SEOPageHeading",
          // "SEOMetaDescription",
          // "SEOCanonicalURL",
          "ItemURL",
          // "AutomaticURL",
          // "Job",
          // "RelatedContents",
          // "SalesChannels",
          // "Misc01",
          // "Misc02",
          // "Misc03",
          // "Misc04",
          // "Misc05",
          // "Misc06",
          // "Misc07",
          // "Misc08",
          // "Misc09",
          // "Misc10",
          // "Misc11",
          // "Misc12",
          // "Misc13",
          // "Misc14",
          // "Misc15",
          // "Misc16",
          // "Misc17",
          // "Misc18",
          // "Misc19",
          // "Misc20",
          // "Misc21",
          // "Misc22",
          // "Misc23",
          // "Misc24",
          // "Misc25",
          // "Misc26",
          // "Misc27",
          // "Misc28",
          // "Misc29",
          // "Misc30",
          // "Misc31",
          // "Misc32",
          // "Misc33",
          // "Misc34",
          // "Misc35",
          // "Misc36",
          // "Misc37",
          // "Misc38",
          // "Misc39",
          // "Misc40",
          // "Misc41",
          // "Misc42",
          // "Misc43",
          // "Misc44",
          // "Misc45",
          // "Misc46",
          // "Misc47",
          // "Misc48",
          // "Misc49",
          // "Misc50",
          // "Misc51",
          // "Misc52"
        ]
      }
    },{
      headers: {
        'NETOAPI_KEY': netoAPIKey,
        'NETOAPI_ACTION': 'GetItem', 
        'Accept': 'application/json',
        "NETOAPI_USERNAME": netoAPIUsername
      }
    })
  }
}