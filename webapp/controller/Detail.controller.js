sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/flex/masterdetail/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, models) {
        "use strict";

        return Controller.extend("com.flex.masterdetail.controller.Detail", {
            OrderID: null,

            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteDetail").attachPatternMatched(this.onRouteMatched, this);
            },

            async onRouteMatched(event) {
                this.OrderID = event.getParameter("arguments").OrderID;
                // Employee
                // TODO: Check if Employee is filled
                this.getJSONModel("employee").setProperty('/employeeLoading', true);
                models.readEmployee().then(result => {
                    this.getJSONModel("employee").setProperty('/employee', result);
                }).finally(() => { 
                    this.getJSONModel("employee").setProperty('/employeeLoading', false);
                })
                
                // Order
                this.getJSONModel("orders").setProperty('/selectedOrderDetailsLoading', true);
                models.readOrderDetails(this.OrderID).then(result => {
                    this.getJSONModel("orders").setProperty('/selectedOrder_details', result);
                }).finally(() => { 
                    this.getJSONModel("orders").setProperty('/selectedOrderDetailsLoading', false);
                });
            },

            getJSONModel(name) {
                return this.getView().getModel(name);
            },

            onListItemPress(event){
                const SelectedOrderID = event.getSource().getBindingContext('orders').getObject().OrderID;
                this.getJSONModel("orders").setProperty('/selectedOrder', SelectedOrderID);
                this.getOwnerComponent().getRouter().navTo("RouteDetail", { OrderID: SelectedOrderID });
            }
        });
    });
