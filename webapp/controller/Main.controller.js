sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("zchat001.controller.Main", {

    // 示例：在初始化时使用转换方法
    onInit: function () {
        this.jsonModel = new JSONModel();
        this.getView().setModel(this.jsonModel, "chatbot");
    },
    onPressHide:function(){
        let ScrollContainer = this.byId("id_SC");
        ScrollContainer.setVisible(true);
        let box = this.byId("id_box");
        box.setVisible(true);
    },
    onSubmitQuery: function (oEvent) {
        var oInput = oEvent.getSource();
        var sQuery = oInput.getValue();
        oInput.setValue("");
        let MessageStrip01 = this.byId("MessageStrip01");
        MessageStrip01.setVisible(true);
        let TextArea01 = this.byId("TextArea01");
        TextArea01.setVisible(true);
        TextArea01.setValue(sQuery);

        // Add User query to the model
        this.aList = this.jsonModel.getProperty("/list");
        if (!this.aList) {
            this.aList = [];
        }

        var oJsonObj = {
          text: sQuery,
          type: "query",
        };
        this.aList.push(oJsonObj);
        this.jsonModel.setProperty("/list", this.aList);

        // Add Bot Response to the model
        // fetch existing model
        this.aList = this.jsonModel.getProperty("/list");
        var sUrl;

        sUrl = "<your-api-endpoint>/query";

        this.postAPI(sUrl, sQuery)
          .done(function (result) {
            var aList = Array.isArray(result) ? result : [result];
            this.jsonModel.setProperty("/list", this.aList.extend(aList));
          })
          .fail(function (result) {
            var aList = [];
            var oJsonObj = {
              text: "Failed to connect to backend!",
              type: "response",
            };
            this.aList.push(oJsonObj);
            this.jsonModel.setProperty("/list", this.aList);
          })
          .always(() => {
          });
      },
      onPress:function(oEvent){
        let list = this.jsonModel.getProperty("/list");
        let text = oEvent.getSource().mProperties.text;
        let MessageStrip01 = this.byId("MessageStrip01");
        MessageStrip01.setVisible(true);
        let TextArea01 = this.byId("TextArea01");
        TextArea01.setVisible(true);
        TextArea01.setValue(text);
      }
    });
});
