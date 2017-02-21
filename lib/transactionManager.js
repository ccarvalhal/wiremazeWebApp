/**
 * The transaction manager for the Wiremaze Message Board.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var jwt = require("jwt-simple");

/**
 * Constructor for the Transaction Manager for the Wiremaze Message Board Server Module.
 *
 * @returns {TransactionManager}
 * @constructor
 */
function TransactionManager() {
    if (!(this instanceof TransactionManager)) {
        return new TransactionManager();
    }

    // List with the ID of the valid transactions.
    this.transactions = [];
    this.secret = "TIEL1HKO6UL8VD5S90B6";
}

/**
 * Checks the transaction referred by the argument "transactionId": if the transaction exists, it is valid and a new
 * transaction is created to replace it. So, a transaction can be validated only once.
 *
 * @param {String} transactionId The ID of the transaction to be checked.
 * @return {String} The new ID of the transaction or "undefined" if the transaction is invalid.
 */
TransactionManager.prototype.checkTransaction = function(transactionId) {
    var newTransactionId;
    for (var i = 0, leni = this.transactions.length; i < leni; i++) {
        if (this.transactions[i] === transactionId) {
            newTransactionId = jwt.encode({timestamp: new Date().getTime()}, this.secret);
            this.transactions.splice(i, 1);
            this.transactions.push(newTransactionId);
            break;
        }
    }
    return newTransactionId;
};

/**
 * Generates a new transaction and returns its ID.
 *
 * @return {String} The ID of the new transaction.
 */
TransactionManager.prototype.getNewTransaction = function() {
    var newTransactionId = jwt.encode({timestamp: new Date().getTime()}, this.secret);
    this.transactions.push(newTransactionId);
    return newTransactionId;
};

module.exports = new TransactionManager();