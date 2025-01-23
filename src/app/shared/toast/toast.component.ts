import {Component, inject} from '@angular/core';
import {ToastService} from "../../core/services/toast.service";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',

})
export class ToastComponent {

  private toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  removeToast(id: number): void {
    this.toastService.remove(id);
  }
}
