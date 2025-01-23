import {Injectable, signal} from '@angular/core';
import {Toast} from "../interfaces/toast";

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  private toastSignal = signal<Toast[]>([]);
  toasts = this.toastSignal.asReadonly();
  private counter = 0;

  show(message: string, type: Toast['type'] = 'info', duration: number = 3000) {
    const id = this.counter++;
    const toast: Toast = { id, message, type, duration };

    this.toastSignal.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  remove(id: number) {
    this.toastSignal.update(toasts => toasts.filter(t => t.id !== id));
  }

  showSuccess(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  showError(message: string, duration?: number) {
    this.show(message, 'error', duration);
  }

  showWarning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  showInfo(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }
}
