import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DeleteAlertService {
    deleteProduct = new BehaviorSubject<boolean>(null);
    deleteMessage = new BehaviorSubject<boolean>(null);
    deleteOrder = new BehaviorSubject<boolean>(null);

    deleteAlertProduct(newStatus) {
        this.deleteProduct.next(newStatus);
    }

    deleteAlertMessage(newStatus) {
        this.deleteMessage.next(newStatus);
    }

    deleteAlertOrder(newStatus) {
        this.deleteOrder.next(newStatus);
    }
    
    
}