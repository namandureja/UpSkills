"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RoketoContractApi = void 0;
var bignumber_js_1 = require("bignumber.js");
var helpers_1 = require("./helpers");
var GAS_SIZE = "200000000000000";
var STORAGE_DEPOSIT = 1e22;
function RoketoContractApi(_a) {
    var _this = this;
    var contract = _a.contract, ft = _a.ft, walletConnection = _a.walletConnection, account = _a.account, operationalCommission = _a.operationalCommission, tokens = _a.tokens;
    var getAccount = function (accountId) { return __awaiter(_this, void 0, void 0, function () {
        var fallback, account_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fallback = (0, helpers_1.EMPTY_ACCOUNT)(accountId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, contract.get_account({ account_id: accountId })];
                case 2:
                    account_1 = _a.sent();
                    return [2 /*return*/, account_1 || fallback];
                case 3:
                    e_1 = _a.sent();
                    console.debug("[RoketoContractApi]: nearerror", e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, fallback];
            }
        });
    }); };
    return {
        // account methods
        getCurrentAccount: function () { return getAccount(walletConnection.getAccountId()); },
        updateAccount: function updateAccount(_a) {
            var _b = _a.tokensWithoutStorage, tokensWithoutStorage = _b === void 0 ? 0 : _b;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, contract.update_account({
                                account_id: account.accountId
                            }, GAS_SIZE, new bignumber_js_1["default"](STORAGE_DEPOSIT)
                                .multipliedBy(tokensWithoutStorage)
                                .plus(operationalCommission)
                                .toFixed())];
                        case 1:
                            res = _c.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        // stream methods
        getAccount: getAccount,
        createStream: function createStream(_a, _b) {
            var deposit = _a.deposit, receiverId = _a.receiverId, token = _a.token, speed = _a.speed, description = _a.description, _c = _a.autoDepositEnabled, autoDepositEnabled = _c === void 0 ? false : _c, _d = _a.isAutoStartEnabled, isAutoStartEnabled = _d === void 0 ? true : _d;
            var _e = _b === void 0 ? {} : _b, callbackUrl = _e.callbackUrl;
            return __awaiter(this, void 0, void 0, function () {
                var res, createCommission, tokenContract, error_1;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            createCommission = tokens[token].commission_on_create;
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 6, , 7]);
                            if (!(token === "NEAR")) return [3 /*break*/, 3];
                            return [4 /*yield*/, contract.create_stream({
                                    args: {
                                        owner_id: walletConnection.getAccountId(),
                                        receiver_id: receiverId,
                                        token_name: token,
                                        tokens_per_tick: speed,
                                        description: description,
                                        is_auto_deposit_enabled: autoDepositEnabled,
                                        is_auto_start_enabled: isAutoStartEnabled
                                    },
                                    gas: GAS_SIZE,
                                    amount: new bignumber_js_1["default"](deposit).plus(createCommission).toFixed(),
                                    callbackUrl: callbackUrl
                                })];
                        case 2:
                            // contract.methodName({ args, gas?, amount?, callbackUrl?, meta? })
                            res = _f.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            tokenContract = ft[token].contract;
                            return [4 /*yield*/, tokenContract.ft_transfer_call({
                                    args: {
                                        receiver_id: contract.contractId,
                                        amount: new bignumber_js_1["default"](deposit).plus(createCommission).toFixed(),
                                        memo: "Roketo transfer",
                                        msg: JSON.stringify({
                                            Create: {
                                                description: description,
                                                owner_id: walletConnection.getAccountId(),
                                                receiver_id: receiverId,
                                                token_name: token,
                                                tokens_per_tick: speed,
                                                balance: deposit,
                                                is_auto_deposit_enabled: autoDepositEnabled,
                                                is_auto_start_enabled: isAutoStartEnabled
                                            }
                                        })
                                    },
                                    gas: GAS_SIZE,
                                    amount: 1,
                                    callbackUrl: callbackUrl
                                })];
                        case 4:
                            // @ts-ignore
                            res = _f.sent();
                            _f.label = 5;
                        case 5: return [2 /*return*/, res];
                        case 6:
                            error_1 = _f.sent();
                            console.debug(error_1);
                            throw error_1;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        },
        depositStream: function depositStream(_a) {
            var streamId = _a.streamId, token = _a.token, deposit = _a.deposit;
            return __awaiter(this, void 0, void 0, function () {
                var tokenContract;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(token === "NEAR")) return [3 /*break*/, 2];
                            return [4 /*yield*/, contract.deposit({ stream_id: streamId }, GAS_SIZE, deposit)];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            tokenContract = ft[token].contract;
                            //@ts-ignore
                            return [4 /*yield*/, tokenContract.ft_transfer_call({
                                    receiver_id: contract.contractId,
                                    amount: deposit,
                                    msg: JSON.stringify({
                                        Deposit: streamId
                                    })
                                }, GAS_SIZE, 1)];
                        case 3:
                            //@ts-ignore
                            _b.sent();
                            _b.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        pauseStream: function pauseStream(_a) {
            var streamId = _a.streamId;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, contract.pause_stream({ stream_id: streamId }, GAS_SIZE, operationalCommission)];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        startStream: function startStream(_a) {
            var streamId = _a.streamId;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, contract.start_stream({ stream_id: streamId }, GAS_SIZE, operationalCommission)];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        stopStream: function stopStream(_a) {
            var streamId = _a.streamId;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, contract.stop_stream({ stream_id: streamId }, GAS_SIZE, operationalCommission)];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        changeAutoDeposit: function changeAutoDeposit(_a) {
            var streamId = _a.streamId, autoDeposit = _a.autoDeposit;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, contract.change_auto_deposit({ stream_id: streamId, auto_deposit: autoDeposit }, GAS_SIZE, operationalCommission)];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        // View methods
        getStream: function getStream(_a) {
            var streamId = _a.streamId;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, contract.get_stream({
                                stream_id: streamId
                            })];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        getStatus: function getStatus() {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, contract.get_status({})];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        getStreamHistory: function getStreamHistory(_a) {
            var streamId = _a.streamId, from = _a.from, to = _a.to;
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, contract.get_stream_history({
                                stream_id: streamId,
                                from: from,
                                to: to
                            })];
                        case 1:
                            res = _b.sent();
                            return [2 /*return*/, res];
                    }
                });
            });
        }
    };
}
exports.RoketoContractApi = RoketoContractApi;
