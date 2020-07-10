/**
 * @file lib/format-number.js
 */

export const formatNumber = (num) =>
  num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
