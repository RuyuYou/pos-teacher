'use strict';

let buildCartItems = ((inputs, allItems)=> {
  let cartItems = [];
  for (let input of inputs) {
    let inputArray = input.split('-');
    let barcode = inputArray[0];dd
    let count = parseFloat(inputArray[1] || 1);
    let cartItem = cartItems.find((cartItem)=> {
      return cartItem.item.barcode === barcode;
    });
    if (cartItem) {
      cartItem.count++;
    }
    else {
      let item = allItems.find((item)=> {
        return item.barcode === barcode;
      });
      cartItems.push({item: item, count: count});
    }
  }
  return cartItems;
});
