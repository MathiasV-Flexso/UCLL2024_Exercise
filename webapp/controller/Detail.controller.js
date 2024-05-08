sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/flex/masterdetail/model/models",
	"sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, models, Fragment) {
        "use strict";

        return Controller.extend("com.flex.masterdetail.controller.Detail", {
            OrderID: null,

            onInit: function () {
                this.getOwnerComponent().getRouter().getRoute("RouteDetail").attachPatternMatched(this.onRouteMatched, this);
            },

            async onRouteMatched(event) {
                this.OrderID = event.getParameter("arguments").OrderID;
                // Employee
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

                // Order
                this.getJSONModel("product").setProperty('/productsLoading', true);
                models.readProducts(this.OrderID).then(result => {
                    this.getJSONModel("product").setProperty('/products', result);
                }).finally(() => { 
                    this.getJSONModel("product").setProperty('/productsLoading', false);
                });
            },

            getJSONModel(name) {
                return this.getView().getModel(name);
            },

            onListItemPress(event){
                // Navigate to a third screen and add product & supplier details there. 
            },

            onPressAddProduct() {
                this.openDialog('AddProduct');
            },

            onCloseAddProductDialog() {
                this.closeDialog('AddProduct');
            },

            async onAddProduct() {
                const newOrderDetail = {
                    OrderID: 0,
                    ProductID: 0,
                    UnitPrice: 0,
                    Quantity: 0,
                    Discount: 0
                }
                await models.createOrderDetail(newOrderDetail);

                this.closeDialog('AddProduct');

                // Order
                this.getJSONModel("orders").setProperty('/selectedOrderDetailsLoading', true);
                models.readOrderDetails(this.OrderID).then(result => {
                    this.getJSONModel("orders").setProperty('/selectedOrder_details', result);
                }).finally(() => { 
                    this.getJSONModel("orders").setProperty('/selectedOrderDetailsLoading', false);
                });
            },

            /**
             * Event handler for opening a dialog.
             * @public
             * @param {string} sDialog Parameter containing the string for the dialog to open
             */
            openDialog: function (sDialog, oDialogData) {
                if (!oDialogData) oDialogData = {};
                return new Promise(function (resolve, reject) {
                    var oView = this.getView(),
                        sFragment = "com.flex.masterdetail.view.dialog." + sDialog,
                        sReference = "_" + sDialog + "Dialog";

                    // create dialog lazily
                    if (!this[sReference]) {
                        // load asynchronous XML fragment
                        Fragment.load({
                            id: oView.getId(),
                            name: sFragment,
                            controller: this
                        }).then(function (oDialog) {
                            // connect dialog to the root view of this component (models, lifecycle)
                            this[sReference] = oDialog;
                            oView.addDependent(oDialog);
                            oDialog.open();
                            resolve(oDialog);
                        }.bind(this));
                    } else {
                        this[sReference].open();
                        resolve(this[sReference]);
                    }
                }.bind(this))
            },

            /**
             * Event handler for closing a dialog.
             * @public
             * @param {string} sDialog Parameter containing the string for the dialog to close
             */
            closeDialog: function (sDialog) {
                return new Promise(function (resolve, reject) {
                    if (this["_" + sDialog + "Dialog"]) {
                        this["_" + sDialog + "Dialog"].destroy();
                        delete this["_" + sDialog + "Dialog"];
                    } else {
                        reject("ERROR: Dialog not found");
                    }
                }.bind(this));
            }
        });
    });
