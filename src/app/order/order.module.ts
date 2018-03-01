import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { OrderComponent } from './order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveOrderGuard } from './leave-order.guard';

const ROUTES: Routes = [
  { path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard] }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent
  ]
})
export class OrderModule { }
