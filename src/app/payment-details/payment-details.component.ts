import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  constructor(public paymentservice: PaymentDetailService,private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.paymentservice.refreshList();
  }

  populateForm(selectedRecord:PaymentDetail)
  {
    this.paymentservice.formData=Object.assign({},selectedRecord);
  }

  onDelete(id:number)
  {
    console.log("id is"+id)
    this.paymentservice.deletePaymentDetails(id)
    .subscribe({
      next:res=>{
        this.paymentservice.list=res as PaymentDetail[]
        this.toastr.error('Deleted successfully','Payment Detail')
      },
      error: err=>{console.log(err)}
    })
  }

}
