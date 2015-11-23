/**
 * @class Images
 */

Images.addShopImage = function (file, shopId) {
    Images.insert(file, function (err, fileObj) {
      if (err){
         // handle error
         console.log(err)
      } else {
         // handle success depending what you need to do
         _.delay(function () {
           Shops.update(shopId, {$set: {"images": [fileObj._id]}});
         }, 2000)
      }
    });
},

Images.addShopLogo = function (file, shopId) {
    Images.insert(file, function (err, fileObj) {
      if (err){
         // handle error
         console.log(err)
      } else {
         // handle success depending what you need to do
         _.delay(function () {
           Shops.update(shopId, {$set: {"logo": fileObj._id}});
        }, 2000)
      }
    });
},

Images.saveImageFromUI = function (file, evt, shopId) {
  console.log(file, evt);
  if ($(evt.target).closest('.form-group').attr('name') === 'image') {
    Images.addShopImage(file, shopId);
  } else if ($(evt.target).closest('.form-group').attr('name') === 'logo') {
    Images.addShopLogo(file, shopId);
  }
}
