sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/flex/masterdetail/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, models) {
        "use strict";

        return Controller.extend("com.flex.masterdetail.controller.Master", {
            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteMaster").attachPatternMatched(this.onRouteMatched, this);
            },

            async onRouteMatched() {
                // Employee
                this.getJSONModel("employee").setProperty('/employeeLoading', true);
                models.readEmployee().then(result => {
                    this.getJSONModel("employee").setProperty('/employee', result);
                }).finally(() => { 
                    this.getJSONModel("employee").setProperty('/employeeLoading', false);
                })
                
                // Orders
                this.getJSONModel("orders").setProperty('/ordersLoading', true);
                models.readOrders().then(result => {
                    this.getJSONModel("orders").setProperty('/orders', result);
                }).finally(() => { 
                    this.getJSONModel("orders").setProperty('/ordersLoading', false);
                });
            },

            getJSONModel(name) {
                return this.getView().getModel(name);
            },

            onListItemPress(event){
                const SelectedOrder = event.getSource().getBindingContext('orders').getObject();
                const oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1);

                this.getOwnerComponent().getRouter().navTo(/** To do :) */);
            }
        });
    });
