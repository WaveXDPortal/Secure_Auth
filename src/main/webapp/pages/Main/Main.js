/*
 * Use App.getDependency for Dependency Injection
 * eg: var DialogService = App.getDependency('DialogService');
 */

/*
 * This function will be invoked when any of this prefab's property is changed
 * @key: property name
 * @newVal: new value of the property
 * @oldVal: old value of the property
 */
Prefab.stepStatus = 'Pending';
Prefab.noOfSteps;
Prefab.currentStep = 0;
Prefab.errorCOunt = 0;
Prefab.apiCount = 0;
Prefab.viewport;
Prefab.singleStep = false;
Prefab.onPropertyChange = function (key, newVal, oldVal) {

    switch (key) {
        case "phonenumber":
            Prefab.checkPrefabValues();
            break;
    }

};
Prefab.checkPrefabValues = function () {
    if (Prefab.stepdetails == null || Prefab.stepdetails == undefined || Prefab.stepdetails == "" || Prefab.stepdetails.size < 0) {
        Prefab.stepdetails = [];
        if (Prefab.numberverification == true) {
            Prefab.stepdetails.push(Prefab.Variables.stvNumberVerifyVariable.dataSet);
        }
        if (Prefab.simswapverification == true) {
            Prefab.stepdetails.push(Prefab.Variables.stvSimSwapVariable.dataSet);
        }
        if (Prefab.locationverification == true) {
            Prefab.stepdetails.push(Prefab.Variables.stvlocationVerifyVariable.dataSet);
        }
    }

}
Prefab.setStepChanges = function (stepName, variable) {
    var arrayindexitem = Prefab.Variables.stvStepDetails.dataSet.findIndex(arrayitem => {
        if (arrayitem.step_name.toLowerCase().includes(stepName.toLowerCase())) {
            return true;
        };

    });
    Prefab.Variables.stvStepDetails.dataSet.splice(arrayindexitem, 1, variable);



}
Prefab.singleapicall = function (arrayindex) {
    Prefab.singleStep = true;
    Prefab.currentStep = arrayindex;

    Prefab.apiCount = arrayindex;
    debugger;
    Prefab.Widgets.stvStepDetailsList1.selecteditem = arrayindex;
}
Prefab.setNumberStepProperties = function () {
    if (!Prefab.Viewport.isMobileType && Prefab.App.getDependency('i18nService').prefabLocale && Prefab.App.getDependency('i18nService').prefabLocale.get('Secure_Auth')) {
        Prefab.App.getDependency('i18nService').prefabLocale.get('Secure_Auth')[Prefab.Variables.stvNumberVerifyVariable.dataSet.step_title] = Prefab.numbervalidationsteptitle;
    }
    else if (Prefab.Viewport.isMobileType && Prefab.App.appConfig.appLocale.prefabMessages['Secure_Auth']) {
        Prefab.App.appConfig.appLocale.prefabMessages['Secure_Auth'][Prefab.Variables.stvNumberVerifyVariable.dataSet.step_title] = Prefab.numbervalidationsteptitle;
    }
    else {
        Prefab.i18nService.messages[Prefab.Variables.stvNumberVerifyVariable.dataSet.step_title] = Prefab.numbervalidationsteptitle;;

    }
    Prefab.Variables.stvNumberVerifyVariable.dataSet.step_Icon_Progress = Prefab.numbervalidationstepiconprogress;
    Prefab.Variables.stvNumberVerifyVariable.dataSet.step_Icon_done = Prefab.numbervalidationstepicondone;
    Prefab.Variables.stvNumberVerifyVariable.dataSet.errormessage = Prefab.numbervalidationsteperrormessage;
    Prefab.setStepChanges(Prefab.Variables.stvNumberVerifyVariable.dataSet.step_name, Prefab.Variables.stvNumberVerifyVariable.dataSet);
}
Prefab.setSimSwapStepProperties = function () {
    if (!Prefab.Viewport.isMobileTyp && Prefab.App.getDependency('i18nService').prefabLocale && Prefab.App.getDependency('i18nService').prefabLocale.get('Secure_Auth')) {
        Prefab.App.getDependency('i18nService').prefabLocale.get('Secure_Auth')[Prefab.Variables.stvSimSwapVariable.dataSet.step_title] = Prefab.simswapsteptitle;
    }
    else if (Prefab.Viewport.isMobileType && Prefab.App.appConfig.appLocale.prefabMessages['Secure_Auth']) {
        Prefab.App.appConfig.appLocale.prefabMessages['Secure_Auth'][Prefab.Variables.stvSimSwapVariable.dataSet.step_title] = Prefab.simswapsteptitle;
    }
    else {
        Prefab.i18nService.messages[Prefab.Variables.stvSimSwapVariable.dataSet.step_title] = Prefab.simswapsteptitle;
    }
    Prefab.Variables.stvSimSwapVariable.dataSet.step_Icon_Progress = Prefab.simswapstepiconprogress;
    Prefab.Variables.stvSimSwapVariable.dataSet.step_Icon_done = Prefab.simswapstepicondone;
    Prefab.Variables.stvSimSwapVariable.dataSet.errormessage = Prefab.simswapsteperrormessage;
    Prefab.setStepChanges(Prefab.Variables.stvSimSwapVariable.dataSet.step_name, Prefab.Variables.stvSimSwapVariable.dataSet);

}
Prefab.setLocationStepProperties = function () {
    if (!Prefab.Viewport.isMobileType && Prefab.App.getDependency('i18nService').prefabLocale && Prefab.App.getDependency('i18nService').prefabLocale.get('Secure_Auth')) {
        Prefab.App.getDependency('i18nService').prefabLocale.get('Secure_Auth')[Prefab.Variables.stvlocationVerifyVariable.dataSet.step_title] = Prefab.locationsteptitle;
    }
    else if (Prefab.Viewport.isMobileType && Prefab.App.appConfig.appLocale.prefabMessages['Secure_Auth']) {
        Prefab.App.appConfig.appLocale.prefabMessages['Secure_Auth'][Prefab.Variables.stvlocationVerifyVariable.dataSet.step_title] = Prefab.locationsteptitle;
    }
    else {
        Prefab.i18nService.messages[Prefab.Variables.stvlocationVerifyVariable.dataSet.step_title] = Prefab.locationsteptitle;
    }
    Prefab.Variables.stvlocationVerifyVariable.dataSet.step_Icon_Progress = Prefab.locationstepiconprogress;
    Prefab.Variables.stvlocationVerifyVariable.dataSet.step_Icon_done = Prefab.locationstepicondone;
    Prefab.Variables.stvlocationVerifyVariable.dataSet.errormessage = Prefab.locationsteperrormessage;
    Prefab.setStepChanges(Prefab.Variables.stvlocationVerifyVariable.dataSet.step_name, Prefab.Variables.stvlocationVerifyVariable.dataSet);

}
Prefab.onReady = function () {
    // Prefab.stepdetails = [
    //     {
    //         "api_uri": "https://nac-mountebankapi.wavemakeronline.com/verify",
    //         "api_host": "number-verification.nokia.rapidapi.com",
    //         "api_key": "bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354",
    //         "api_header": {
    //             "authorization": "test",
    //             "X-Correlator": "test",
    //             "Content-Type": "application/json",
    //             "X-RapidAPI-Key": "bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354",
    //             "X-RapidAPI-Host": "number-verification.nokia.rapidapi.com"
    //         },
    //         "request_body": {
    //             "phoneNumber": "1234567890",
    //             "hashedPhoneNumber": "U2FsdGVkX1+4lld4A/RIOU55UHsAU6IGZSBbPmH6Gig="
    //         },
    //         "request_params": {},
    //         "method_type": "POST",
    //         "step_title": "Number Validation",
    //         "step_Icon_Progress": "wi wi-phone-iphone",
    //         "step_Icon_done": "wi wi-phone-iphone",
    //         "step_name": "Number Verification"
    //     },
    //     {
    //         "api_uri": "https://nac-mountebankapi.wavemakeronline.com/sim-swap/sim-swap/v0/check",
    //         "api_host": "sim-swap.nokia.rapidapi.com",
    //         "api_key": "bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354",
    //         "api_header": {
    //             "Content-Type": "application/json",
    //             "X-RapidAPI-Key": "bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354",
    //             "X-RapidAPI-Host": "sim-swap.nokia.rapidapi.com"
    //         },
    //         "request_body": {
    //             "phoneNumber": "1234567890",
    //             "maxAge": 240
    //         },
    //         "request_params": {},
    //         "method_type": "POST",
    //         "step_title": "SIM Swap",
    //         "step_Icon_Progress": "wi wi-sim-card",
    //         "step_Icon_done": "wi wi-sim-card",
    //         "step_name": "SIM SWAP Verification"
    //     },
    //     {
    //         "api_uri": "https://nac-mountebankapi.wavemakeronline.com/verify",
    //         "api_host": "location-verification.nokia.rapidapi.com",
    //         "api_key": "bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354",
    //         "api_header": {
    //             "Content-Type": "application/json",
    //             "X-RapidAPI-Key": "bd84b964f1msh0c3b3fb3e781d61p1c78c2jsnb366b5862354",
    //             "X-RapidAPI-Host": "location-verification.nokia.rapidapi.com"
    //         },
    //         "request_body": {
    //             "device": {
    //                 "phoneNumber": "1234567890",
    //                 "networkAccessIdentifier": "",
    //                 "ipv4Address": {
    //                     "publicAddress": "",
    //                     "privateAddress": "",
    //                     "publicPort": ""
    //                 },
    //                 "ipv6Address": ""
    //             },
    //             "area": {
    //                 "areaType": {
    //                     "0": "C",
    //                     "1": "I",
    //                     "2": "R",
    //                     "3": "C",
    //                     "4": "L",
    //                     "5": "E"
    //                 },
    //                 "center": {
    //                     "latitude": 0,
    //                     "longitude": 0
    //                 },
    //                 "radius": ""
    //             },
    //             "maxAge": ""
    //         },
    //         "request_params": {},
    //         "method_type": "POST",
    //         "step_title": "Location",
    //         "step_Icon_Progress": "wi wi-location-on",
    //         "step_Icon_done": "wi wi-location-on",
    //         "step_name": "Device Location Verification"
    //     }
    // ];

    Prefab.checkPrefabValues();
    if (Prefab.numberverification) {
        Prefab.setNumberStepProperties();
    }
    if (Prefab.simswapverification) {
        Prefab.setSimSwapStepProperties();
    }
    if (Prefab.locationverification) {
        Prefab.setLocationStepProperties();
    }
    Prefab.viewport = Prefab.Viewport.isMobileType == true ? 'Mobile' : 'Web';
    // this method will be triggered post initialization of the prefab.
    if (!typeof Prefab.phonenumber == 'string') {
        Prefab.phonenumber = Prefab.phonenumber.toString();
    }
    if (typeof Prefab.stepdetails == 'string') {

        Prefab.Variables.stvStepDetails.dataSet = JSON.parse(Prefab.stepdetails);

    } else {
        Prefab.Variables.stvStepDetails.dataSet = Prefab.stepdetails
    }
    Prefab.noOfSteps = Prefab.Variables.stvStepDetails.dataSet.length;

    setTimeout(() => {
        Prefab.Widgets.stvStepDetailsList1.selecteditem = 0;
        callService();
    }, 1000);
};
Prefab.container4Load = function (widget, item, currentItemWidgets) {



};
Prefab.container3Load = function (widget, item, currentItemWidgets) {

};
Prefab.stvStepDetailsList1Render = function (widget, $data) {
    debugger;
    if (!Prefab.Viewport.isMobileType) {
        Prefab.stepStatus = 'Pending';
        Prefab.noOfSteps;
        Prefab.currentStep = Prefab.currentStep != 0 ? Prefab.currentStep : 0;
        Prefab.errorCOunt = 0;
        Prefab.apiCount = Prefab.apiCount != 0 ? Prefab.apiCount : 0;
        Prefab.singleStep = Prefab.singleStep != undefined && Prefab.singleStep != null ? Prefab.singleStep : false;
        if (Prefab.singleStep) {
            Prefab.Widgets.stvStepDetailsList1.deselectListItems(Prefab.currentStep);
            Prefab.Widgets.stvStepDetailsList1.selecteditem = Prefab.currentStep;
        }
    }
    // setTimeout(() => {
    //     // Prefab.Widgets.stvStepDetailsList1.getWidgets('label3', Prefab.currentStep)[0].caption = 'InProgress';
    //     //Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.currentStep)._currentItemWidgets.label3.caption = 'InProgress';

    //     callService();
    //     console.log("Waited 3 seconds!");
    // }, 1000);
    //Page.Widgets.EmployeeList.selecteditem = 0;

    // Prefab.Widgets.button2_1.click();
};
Prefab.button2_1Click = function ($event, widget) {

};
/*Prefab.JSCallServiceVariableonSuccess = function (variable, data) {
    //empty response case
    if (Prefab.viewport == 'Mobile') {
        if (data.data == "" || data.data == undefined || data.data == null) {
            if (Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount]) {
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].label3.caption = 'Failed';
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].label3.classname = 'label-error';
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].errorLabel.caption = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;
                Prefab.errormessage = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;
                // Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].errorLabel.show = true;
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].errorLabel.classname = 'f-xxs';
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.iconclass = 'wi wi-exclamation-circle icon-v-error';
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.classname = "icon-v-error";
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepTitle.classname = 'text-danger f-sm'


                Prefab.errorCOunt = Prefab.errorCOunt + 1;
                Prefab.onError(Prefab.apiCount, Prefab.errormessage);
                return;
            }
        } else {

            if (Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount]) {
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].label3.caption = 'Completed';
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].label3.classname = 'label-completed';
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.iconclass = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].step_Icon_done + ' icon-v-success';
                //Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.iconclass = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].step_Icon_done;
                Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.classname = 'icon-v-success';
                //Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.label3.caption = 'Completed';

                //Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.stepIcon.iconclass = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].step_Icon_done;//'wi wi-check'
                if (!Prefab.singleStep) {
                    if (Prefab.currentStep < Prefab.noOfSteps) {
                        Prefab.currentStep = Prefab.currentStep + 1;
                        Prefab.Widgets.stvStepDetailsList1.selecteditem = Prefab.Widgets.stvStepDetailsList1.selecteditem + 1;
                        Prefab.Widgets.stvStepDetailsList1.selectItem(Prefab.apiCount + 1);
                        Prefab.apiCount = Prefab.apiCount + 1;
                    }
                    if (Prefab.apiCount == Prefab.noOfSteps) {

                        Prefab.onSuccess();
                    }

                }
            }
        }
    }
    else {
        if (data.data == "" || data.data == undefined || data.data == null) {
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.label3.caption = 'Failed';
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.label3.class = 'label-error';
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.errorLabel.caption = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;
            Prefab.errormessage = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;
            //Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.errorLabel.show = true;
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.errorLabel.classname = 'f-xxs';
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.stepIcon.iconclass = 'wi wi-exclamation-circle icon-v-error';
            Prefab.errorCOunt = Prefab.errorCOunt + 1;
            Prefab.onError(Prefab.apiCount, Prefab.errormessage);
            return;
        } else {
            // Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].label3.caption = 'Completed';
            // Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].label3.class = 'label-completed';
            // Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.iconclass = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].step_Icon_done;
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.label3.caption = 'Completed'
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.label3.class = 'label-completed';
            //Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.stepIcon.iconclass = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].step_Icon_done;//'
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.stepIcon.iconclass = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].step_Icon_done + ' icon-v-success';
            if (!Prefab.singleStep) {
                if (Prefab.currentStep < Prefab.noOfSteps) {
                    Prefab.currentStep = Prefab.currentStep + 1;
                    Prefab.Widgets.stvStepDetailsList1.selectItem(Prefab.apiCount + 1);
                    Prefab.apiCount = Prefab.apiCount + 1;
                }
                if (Prefab.apiCount == Prefab.noOfSteps - 1) {

                    Prefab.onSuccess();
                }
            }
        }

    }
};*/

Prefab.JSCallServiceVariableonSuccess = function (variable, data) {
    const stepList = Prefab?.Widgets?.stvStepDetailsList1;
    const apiCount = Prefab?.apiCount;
    const dataSet = Prefab?.Variables?.stvStepDetails?.dataSet;

    if (Prefab.viewport == 'Mobile') {
        if (data?.data === "" || data?.data == null) {
            const widget = stepList?.itemWidgets?.[apiCount];
            const errorData = dataSet?.[apiCount];

            if (widget && errorData) {
                widget.label3 && (widget.label3.caption = 'Failed');
                widget.label3 && (widget.label3.classname = 'label-error');
                widget.errorLabel && (widget.errorLabel.caption = errorData.errormessage);
                widget.errorLabel && (widget.errorLabel.classname = 'f-xxs');
                widget.stepIcon && (widget.stepIcon.iconclass = 'wi wi-exclamation-circle icon-v-error');
                widget.stepIcon && (widget.stepIcon.classname = "icon-v-error");
                widget.stepTitle && (widget.stepTitle.classname = 'text-danger f-sm');

                Prefab.errormessage = errorData.errormessage;
                Prefab.errorCOunt = (Prefab.errorCOunt || 0) + 1;
                Prefab.onError && Prefab.onError(apiCount, Prefab.errormessage);
                return;
            }
        } else {
            const widget = stepList?.itemWidgets?.[apiCount];
            const stepData = dataSet?.[apiCount];

            if (widget && stepData) {
                widget.label3 && (widget.label3.caption = 'Completed');
                widget.label3 && (widget.label3.classname = 'label-completed');
                widget.stepIcon && (widget.stepIcon.iconclass = stepData.step_Icon_done + ' icon-v-success');
                widget.stepIcon && (widget.stepIcon.classname = 'icon-v-success');

                if (!Prefab.singleStep) {
                    if (Prefab.currentStep < Prefab.noOfSteps) {
                        Prefab.currentStep += 1;
                        if (typeof stepList.selecteditem === 'number') {
                            stepList.selecteditem += 1;
                        }
                        stepList.selectItem && stepList.selectItem(apiCount + 1);
                        Prefab.apiCount += 1;
                    }

                    if (Prefab.apiCount === Prefab.noOfSteps) {
                        Prefab.onSuccess && Prefab.onSuccess();
                    }
                }
            }
        }
    } else {
        const widgets = stepList?.getListItemByIndex?.(apiCount)?._currentItemWidgets;
        const errorData = dataSet?.[apiCount];

        if (data?.data === "" || data?.data == null) {
            if (widgets && errorData) {
                widgets.label3 && (widgets.label3.caption = 'Failed');
                widgets.label3 && (widgets.label3.class = 'label-error');
                widgets.errorLabel && (widgets.errorLabel.caption = errorData.errormessage);
                widgets.errorLabel && (widgets.errorLabel.classname = 'f-xxs');
                widgets.stepIcon && (widgets.stepIcon.iconclass = 'wi wi-exclamation-circle icon-v-error');

                Prefab.errormessage = errorData.errormessage;
                Prefab.errorCOunt = (Prefab.errorCOunt || 0) + 1;
                Prefab.onError && Prefab.onError(apiCount, Prefab.errormessage);
                return;
            }
        } else {
            const stepData = dataSet?.[apiCount];
            if (widgets && stepData) {
                widgets.label3 && (widgets.label3.caption = 'Completed');
                widgets.label3 && (widgets.label3.class = 'label-completed');
                widgets.stepIcon && (widgets.stepIcon.iconclass = stepData.step_Icon_done + ' icon-v-success');

                if (!Prefab.singleStep) {
                    if (Prefab.currentStep < Prefab.noOfSteps) {
                        Prefab.currentStep += 1;
                        stepList.selectItem && stepList.selectItem(apiCount + 1);
                        Prefab.apiCount += 1;
                    }

                    if (Prefab.apiCount === Prefab.noOfSteps - 1) {
                        Prefab.onSuccess && Prefab.onSuccess();
                    }
                }
            }
        }
    }
};



// recursive function
// function callService() {

//     debugger;
//     // condition for stopping
//     if (Prefab.currentStep < Prefab.noOfSteps) {
//         Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.currentStep].label3.caption = 'InProgress';
//         Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.currentStep].label3.class = 'label-inprogress';
//         //Prefab.Widgets.stvStepDetailsList1.getWidgets('label3', Prefab.currentStep)[0].caption = 'InProgress';
//         Prefab.Variables.JSCallServiceVariable.setInput("JsonNode", Prefab.Variables.stvStepDetails.dataSet[Prefab.currentStep]);
//         Prefab.Variables.JSCallServiceVariable.invoke();

//         // decrease count
//         if (Prefab.errorCOunt > 0) {
//             Prefab.OnOnError();
//             return;
//         }
//         else {
//             Prefab.currentStep = Prefab.currentStep + 1;
//             setTimeout(() => {

//                 console.log("Waited 1 seconds!");
//                 //Prefab.Widgets.stvStepdetailsList1.itemWidgets[Prefab.currentStep].label3.caption = 'InProgress';
//                 callService();
//             }, 1000);
//         }

//     } else {

//         // terminate execution
//         Prefab.onSuccess();
//         return;
//     };
// };
function callService() {


}
/*Prefab.stvStepDetailsList1Select = function (widget, $data) {
    setTimeout(() => {
        if (Prefab.viewport == 'Mobile' && Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.currentStep]) {
            Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.currentStep].label3.caption = 'In Progress';
            Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.currentStep].label3.classname = 'label-inprogress';
            Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.classname = 'icon-v-inprogress';
            Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.iconclass = 'wi wi-spinner fa-spin icon-v-inprogress';
            //Prefab.Widgets.stvStepDetailsList1.getWidgets('label3', Prefab.currentStep)[0].caption = 'InProgress';
            Prefab.Variables.JSCallServiceVariable.setInput("JsonNode", Prefab.Variables.stvStepDetails.dataSet[Prefab.currentStep]);
            Prefab.Variables.JSCallServiceVariable.invoke();
        }
        else if (Prefab.viewport != 'Mobile' && Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.currentStep)._currentItemWidgets) {
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.currentStep)._currentItemWidgets.label3.caption = 'In Progress';
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.currentStep)._currentItemWidgets.label3.class = 'label-inprogress';
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.currentStep)._currentItemWidgets.stepIcon.iconclass = 'wi wi-spinner icon-v-inprogress fa-spin';
            //Prefab.Widgets.stvStepDetailsList1.getWidgets('label3', Prefab.currentStep)[0].caption = 'InProgress';
            Prefab.Variables.JSCallServiceVariable.setInput("JsonNode", Prefab.Variables.stvStepDetails.dataSet[Prefab.currentStep]);
            Prefab.Variables.JSCallServiceVariable.invoke();
        }
    }, 1000);

    //callService();
};*/


Prefab.stvStepDetailsList1Select = function (widget, $data) {
    debugger;
    setTimeout(() => {
        //const stepList = Prefab?.Widgets?.stvStepDetailsList1;
        const currentStep = Prefab.currentStep;
        const apiCount = Prefab.apiCount;
        const dataSet = Prefab.Variables.stvStepDetails.dataSet;
        const isMobile = Prefab?.viewport === 'Mobile';

        if (isMobile &&
            stepList?.itemWidgets?.[currentStep] &&
            stepList?.itemWidgets?.[apiCount] &&
            dataSet?.[currentStep] &&
            Prefab?.Variables?.JSCallServiceVariable) {

            stepList.itemWidgets[currentStep]?.label3 && (stepList.itemWidgets[currentStep].label3.caption = 'In Progress');
            stepList.itemWidgets[currentStep]?.label3 && (stepList.itemWidgets[currentStep].label3.classname = 'label-inprogress');

            stepList.itemWidgets[apiCount]?.stepIcon && (stepList.itemWidgets[apiCount].stepIcon.classname = 'icon-v-inprogress');
            stepList.itemWidgets[apiCount]?.stepIcon && (stepList.itemWidgets[apiCount].stepIcon.iconclass = 'wi wi-spinner fa-spin icon-v-inprogress');

            Prefab.Variables.JSCallServiceVariable.setInput("JsonNode", dataSet[currentStep]);
            Prefab.Variables.JSCallServiceVariable.invoke();
        }
        else if (
            !isMobile &&
            typeof Prefab.Widgets.stvStepDetailsList1.getListItemByIndex === 'function' &&
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(currentStep)._currentItemWidgets &&
            Prefab.Variables.stvStepDetails.dataSet[currentStep] &&
            Prefab?.Variables?.JSCallServiceVariable
        ) {
            const widgets = Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(currentStep)._currentItemWidgets;

            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(currentStep)._currentItemWidgets.label3.caption = 'In Progress';
            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(currentStep)._currentItemWidgets.label3.class = 'label-inprogress';

            Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(currentStep)._currentItemWidgets.stepIcon.iconclass = 'wi wi-spinner icon-v-inprogress fa-spin';

            Prefab.Variables.JSCallServiceVariable.setInput("JsonNode", Prefab.Variables.stvStepDetails.dataSet[currentStep]);
            Prefab.Variables.JSCallServiceVariable.invoke();
        }
    }, 1000);
};


Prefab.JSCallServiceVariableonError = function (variable, data) {
    //error case
    if (Prefab.viewport == 'Mobile') {
        Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].label3.caption = 'Failed';
        Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].label3.classname = 'label-error';
        Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].errorLabel.caption = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;
        Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].errorLabel.classname = 'f-xxs';
        Prefab.errormessage = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;
        // Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].errorLabel.show = true;
        Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.iconclass = 'wi wi-exclamation-circle icon-v-error';
        Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepIcon.classname = "icon-v-error";
        Prefab.Widgets.stvStepDetailsList1.itemWidgets[Prefab.apiCount].stepTitle.classname = 'text-danger f-sm';
        Prefab.onError(Prefab.apiCount, Prefab.errormessage);
    }
    else {
        Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.label3.caption = 'Failed';
        Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.label3.class = 'label-error';
        Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.caption = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;;
        Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.classname = 'label-error';
        Prefab.errormessage = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;
        Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.stepIcon.iconclass = 'wi wi-exclamation-circle icon-v-error';
        Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.errorLabel.caption = Prefab.Variables.stvStepDetails.dataSet[Prefab.apiCount].errormessage;
        Prefab.Widgets.stvStepDetailsList1.getListItemByIndex(Prefab.apiCount)._currentItemWidgets.errorLabel.classname = 'f-xxs';
        Prefab.onError(Prefab.apiCount, Prefab.errormessage);
    }
};


/*
 * this method is used to set the i18n value
 */
Prefab.seti18n = function (labelNameValuePair) {
    if (!Prefab.Viewport.isMobileType && Prefab.App.getDependency('i18nService').prefabLocale && Prefab.App.getDependency('i18nService').prefabLocale.get('Secure_Auth')) {
        labelNameValuePair.forEach(function (item) {
            Prefab.App.getDependency('i18nService').prefabLocale.get('Secure_Auth')[item.key] = item.value;
        });
    }
    else if (Prefab.Viewport.isMobileType && Prefab.App.appConfig.appLocale.prefabMessages['Secure_Auth']) {
        labelNameValuePair.forEach(function (item) {
            Prefab.App.appConfig.appLocale.prefabMessages['Secure_Auth'][item.key] = item.value;
        });
    }
};


/*
 * Set the Number Step Values
 */
Prefab.setnumberstepproperties = function () {
    Prefab.setNumberStepProperties();
};


/*
 * Set Sim Swap Step Values
 */
Prefab.setsimswapstepproperties = function () {
    Prefab.setSimSwapStepProperties();
};


/*
 * Set Location Step Properties
 */
Prefab.setlocationstepproperties = function () {
    Prefab.setLocationStepProperties();
};// Prefab.JSCallServiceVariableonError = function (variable, data) {

// };
