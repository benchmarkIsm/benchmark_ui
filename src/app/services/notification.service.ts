import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Service for Toastr Notifications

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notifier: ToastrService) {}

  errorDissapear_timeout_ms = 5000;

  clearAll() {
    this.notifier.clear();
  }

  showErrorStatic(message: string, title: string, useHTML: boolean) {
    this.showError(message, title, useHTML, false);
  }

  showError(
    message: string,
    title: string,
    useHTML: boolean,
    closeButton: boolean = true,
    useTimeOut: boolean = false
  ) {
    var _timeout = 0;

    if (useTimeOut) _timeout = this.errorDissapear_timeout_ms;

    this.notifier.error(message, title, {
      closeButton: closeButton,
      enableHtml: useHTML,
      extendedTimeOut: 0,
      positionClass: 'toast-bottom-center',
      tapToDismiss: false,
      timeOut: _timeout,
    });
  }

  showInfo(message: string, title: string, useHTML: boolean) {
    this.notifier.info(message, title, {
      enableHtml: useHTML,
      positionClass: 'toast-bottom-center',
    });
  }

  showSuccess(message: string, title: string, useHTML: boolean) {
    this.notifier.success(message, title, {
      enableHtml: useHTML,
      positionClass: 'toast-bottom-center',
    });
  }

  showWarning(message: string, title: string, useHTML: boolean) {
    this.notifier.warning(message, title, {
      closeButton: true,
      enableHtml: useHTML,
      extendedTimeOut: 0,
      positionClass: 'toast-bottom-center',
      tapToDismiss: false,
      timeOut: 0,
    });
  }
}
