sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device, Filter, FilterOperator, MessageToast) {
        "use strict";
        const EmployeeID = 1;
        let oNorthwindModel = null;

        function handleError (error) {
            MessageToast.show(error.message);
        }

        return {
            // @ts-ignore
            createDeviceModel: function () {
                const oModel = new JSONModel(Device);
                // @ts-ignore
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },

            createOrdersModel: function () {
                const oModel = new JSONModel({
                    ordersLoading: null,
                    orders: null,
                    selectedOrderId: null,
                    selectedOrder_details: null,
                    selectedOrderDetailsLoading: null
                });
                return oModel;
            },

            createEmployeeModel: function () {
                const oModel = new JSONModel({
                    employeeLoading: null,
                    employee: null
                });
                return oModel;
            },

            createProductModel: function () {
                const oModel = new JSONModel({
                    productsLoading: null,
                    products: null,
                    selectedProductKey: null,
                    selectedProductQuantity: null,
                });
                return oModel;
            },

            registerODataModels(oNorthwind) {
                oNorthwindModel = oNorthwind;
            },

            readOrders() {
                // @ts-ignore
                return new Promise((resolve, reject) => {
                    oNorthwindModel.read(`/Orders`,
                        {
                            success: (oResult) => {
                                resolve(oResult.results);
                            },
                            error: (oError) => {
                                reject(oError);
                            }
                        })
                })
            },

            readOrderDetails() {
                // Hint: /Order_Details
            },

            createOrderDetail(orderDetail) {
                // Hint: /Order_Details
            },

            readEmployee() {
                // Hint: /Employees
            },

            readProducts() {
                // @ts-ignore
                // Hint: /Products
            }
        };
    });