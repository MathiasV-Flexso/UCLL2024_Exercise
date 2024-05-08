/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "com/flex/masterdetail/model/models",
    "sap/f/library",
    "sap/f/FlexibleColumnLayoutSemanticHelper",
    "sap/base/util/UriParameters"
],
    function (UIComponent, Device, models, library, FlexibleColumnLayoutSemanticHelper, UriParameters) {
        "use strict";
        var LayoutType = library.LayoutType;

        return UIComponent.extend("com.flex.masterdetail.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                
                this.getRouter().attachBeforeRouteMatched(this.onBeforeRouteMatched, this);

                // register all odata models
                models.registerODataModels(this.getModel("oNorthwind"));

                // set json models
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(models.createOrdersModel(), "orders");
                this.setModel(models.createEmployeeModel(), "employee");
                this.setModel(models.createProductModel(), "product");
            },

            /**
            * Returns an instance of the semantic helper
            * @returns {sap.f.FlexibleColumnLayoutSemanticHelper} An instance of the semantic helper
            */
            getHelper: function () {
                var oFCL = this.getRootControl().byId("fcl"),
                    oParams = UriParameters.fromQuery(location.search),
                    oSettings = {
                        defaultTwoColumnLayoutType: LayoutType.TwoColumnsBeginExpanded,
                        defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
                        mode: oParams.get("mode"),
                        maxColumnsCount: oParams.get("max")
                    };

                return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
            },

            onBeforeRouteMatched: function (oEvent) {
                var oModel = this.getModel("layout");
                var sLayout = oEvent.getParameters().arguments.layout;

                // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
                if (!sLayout) {
                    var oNextUIState = this.getHelper().getNextUIState(0);
                    sLayout = oNextUIState.layout;
                }

                // Update the layout of the FlexibleColumnLayout
                if (sLayout) {
                    oModel.setProperty("/layout", sLayout);
                }
            }
        });
    }
);