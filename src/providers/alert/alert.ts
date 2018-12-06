import { Injectable } from "@angular/core";
import { AlertController, ToastController, LoadingController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class AlertProvider {

    toast: any;
    spinner: any;
    basicAlert: any;
    isLogoutToast: boolean = false;

    constructor(private alertCtrl: AlertController, private translateService: TranslateService,
        private toastCtrl: ToastController, private loaderCtrl: LoadingController) {
    }

    displayBasicAlert(messageKey: string, title = "alert.basic-title", okBtn = "alert.ok") {
        return new Promise((resolve, reject) => {
            if (this.basicAlert != null) {
                this.basicAlert.dismiss().catch(() => { });
            }
            this.basicAlert = this.alertCtrl.create({
                enableBackdropDismiss: false,
            });

            this.translateService.get([messageKey, title, okBtn]).subscribe(
                value => {
                    this.basicAlert.setMessage(value[messageKey]);
                    this.basicAlert.setTitle(value[title]);
                    this.basicAlert.addButton({
                        text: value[okBtn],
                        handler: data => {
                            resolve(data);
                        }
                    });
                    this.basicAlert.present();
                }
            );
        });
    }

    dismissBasicAlert() {
        if (this.basicAlert != null) {
            this.basicAlert.dismiss().catch(() => { });
        }
    }

    displayConfirmAlert(alertObj: alertFields) {
        return new Promise((resolve, reject) => {
            this.translateService.get([alertObj.title, alertObj.message, alertObj.ok, alertObj.cancel]).subscribe(
                value => {
                    let alert = this.alertCtrl.create({
                        enableBackdropDismiss: false,
                        title: value[alertObj.title],
                        message: value[alertObj.message],
                        buttons: [{
                            text: value[alertObj.cancel],
                            role: "cancel"
                        }, {
                            text: value[alertObj.ok],
                            handler: data => {
                                resolve(data);
                            }
                        }]
                    });
                    alert.present();
                }
            );
        });
    }

    displayErrorToast(messageKey, isLogout = false) {

        if (!this.isLogoutToast) {
            this.closeToast();
        }

        this.translateService.get([messageKey, "alert.toast-close"]).subscribe(
            value => {
                let div = document.getElementById("tempForHTML");
                div.innerHTML = value[messageKey];
                this.toast = this.toastCtrl.create({
                    message: div.innerText,
                    position: 'top',
                    showCloseButton: true,
                    closeButtonText: value["alert.toast-close"],
                    cssClass: "errorToastClass"
                    // dismissOnPageChange: true
                });

                this.toast.onDidDismiss(() => {
                    this.isLogoutToast = false;
                });
                if (!this.isLogoutToast || !isLogout) {
                    if (this.toast != null) {
                        this.closeToast();
                    }
                    this.toast.present();
                }
                this.isLogoutToast = isLogout;
            }
        );
    }

    displayErrorToast2(messageKey1, messageKey2) {
        this.closeToast();
        this.translateService.get([messageKey1, messageKey2, "alert.toast-close"]).subscribe(
            value => {
                this.toast = this.toastCtrl.create({
                    message: value[messageKey1] + value[messageKey2],
                    position: 'top',
                    showCloseButton: true,
                    closeButtonText: value["alert.toast-close"],
                    cssClass: "errorToastClass",
                    dismissOnPageChange: true
                });
                this.toast.present();
            }
        );
    }

    closeToast() {
        if (this.toast != null) {
            this.toast.dismiss().catch(() => { });
            // this.toast = null;
        }
    }

    displayLoadingSpinner() {
        if (this.spinner == null) {
            this.spinner = this.loaderCtrl.create({
                spinner: "dots"
            });
            this.spinner.present();
        }
    }

    dismissLoadingSpinner() {
        try {
            this.spinner.dismiss().catch(() => { });
            this.spinner = null;
        }
        catch (e) { }
    }

    displayOptionAlert(alertObj: alertFields, optionObj: alertOption[], cssClass?: string) {
        return new Promise((resolve, reject) => {
            this.translateService.get([alertObj.title, alertObj.message, alertObj.ok, alertObj.cancel]).subscribe(
                value => {
                    let alert = this.alertCtrl.create({
                        enableBackdropDismiss: false,
                        title: value[alertObj.title],
                        inputs: optionObj,
                        cssClass: cssClass? cssClass: null,
                        buttons: [{
                            text: value[alertObj.cancel],
                            role: "cancel"
                        }, {
                            text: value[alertObj.ok],
                            handler: data => {
                                resolve(data);
                            }
                        }]
                    });
                    alert.present();
                }
            );
        });
    }
}

@Injectable()
export class alertFields {
    title: string;
    message: string;
    cancel: string;
    ok: string;
}

@Injectable()
export class alertOption {
    type: string;
    label: string;
    value: string;
    checked: boolean;
}