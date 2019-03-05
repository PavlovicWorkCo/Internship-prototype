import { freeShippingThreshold, defaultShippingCost } from './costChangers';

export function getBagItemsCost(items) {
  const itemsCost = items.map(item => parseFloat(item.cost.slice(1)) * item.quantity);
  const bagCost = itemsCost.reduce((sum, current) => sum + current, 0);
  return bagCost;
}

export function checkShipToAddressFree(itemsCost) {
  return itemsCost > freeShippingThreshold;
}

export function getTotalCost(itemsCost, tax1, tax2, promoDiscount, pickupInStore, isShippingFree) {
  const totalCost = itemsCost * (1 - promoDiscount / 100) // apply discount
  * (1 + (tax1 + tax2) / 100) // apply tax
  + (isShippingFree || pickupInStore ? 0 : defaultShippingCost); // apply shipping cost
  return Math.round(totalCost * 100) / 100;
}

export function estimateTax(itemsCost, tax, promoDiscount) {
  return Math.round(
    (itemsCost * (1 - promoDiscount / 100) * tax / 100) * 100,
  ) / 100;
}
