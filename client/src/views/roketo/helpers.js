"use strict";
exports.__esModule = true;
exports.TICK_TO_YEAR = exports.TICK_TO_MONTH = exports.TICK_TO_WEEK = exports.TICK_TO_DAY = exports.TICK_TO_HOUR = exports.TICK_TO_MINUTE = exports.TICK_TO_S = exports.TICK_TO_MS = exports.EMPTY_ACCOUNT = void 0;
var EMPTY_ACCOUNT = function (id) { return ({
    account_id: id,
    dynamic_inputs: [],
    dynamic_outputs: [],
    static_streams: [],
    last_action: null,
    ready_to_withdraw: [],
    total_incoming: [],
    total_outgoing: [],
    total_received: [],
    is_external_update_enabled: false
}); };
exports.EMPTY_ACCOUNT = EMPTY_ACCOUNT;
// Multiply your stream speed by one of this constants, to receive amount transferred over period
exports.TICK_TO_MS = 1e6;
exports.TICK_TO_S = 1e9;
exports.TICK_TO_MINUTE = exports.TICK_TO_S * 60;
exports.TICK_TO_HOUR = exports.TICK_TO_MINUTE * 60;
exports.TICK_TO_DAY = exports.TICK_TO_HOUR * 24;
exports.TICK_TO_WEEK = exports.TICK_TO_DAY * 7;
exports.TICK_TO_MONTH = exports.TICK_TO_WEEK * 4;
exports.TICK_TO_YEAR = exports.TICK_TO_MONTH * 12;
