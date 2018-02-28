import { Injectable } from '@angular/core';
import { MenuItem } from './../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';
import { NotificationsService } from '../../shared/messages/notifications.service';

@Injectable()
export class ShoppingCartService {

    constructor(private notificationService: NotificationsService){ }

    items: CartItem[] = [];

    clear(){
        this.items = [];
    }

    addItem(item: MenuItem){
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);

        if(foundItem){
            this.increaseQty(foundItem);
        } else {
            this.items.push(new CartItem(item));
        }

        this.notificationService.notify(`Você adicionou ${item.name} ao carrinho!`)
    }

    increaseQty(item: CartItem){
        item.quantity += 1;
    }

    decreaseQty(item: CartItem){
        item.quantity -= 1;
        if(item.quantity === 0){
            this.removeItem(item);
        }
    }

    removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Você removeu ${item.menuItem.name} do carrinho!`)
    }

    total(): number{
        return this.items.map(item => item.value()).reduce((prev, value) => prev + value, 0);
    }
    
}