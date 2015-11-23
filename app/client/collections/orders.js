/**
 * Orders Collection functions
 * @scope client
 */

/**
 * Set status to cancelled
 * @param orderId {String}}
 */
Orders.cancelOrder = function (orderId) {
  Orders.update(orderId, {$set: {status: "canceled"}});
};

/**
 * Set status to confirmed
 * @param orderId {String}}
 */
Orders.confirmOrder = function (orderId) {
  Orders.update(orderId, {$set: {status: "confirmed"}});
};
