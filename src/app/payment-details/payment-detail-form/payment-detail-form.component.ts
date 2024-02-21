import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrl: './payment-detail-form.component.css'
})
export class PaymentDetailFormComponent {
  constructor(public service:PaymentDetailService,private toastr:ToastrService)
  {

  }
  onSubmit(form: NgForm)
  {
    this.service.formSubmitted=true;
    if(form.valid)
    {
      if(this.service.formData.paymentId==0)
      {
        this.insertRecord(form)
      }
      else
      {
        this.updateRecord(form)
      }


    }
  }
  insertRecord(form:NgForm){
    this.service.postPaymentdetails()
    .subscribe({
      next:res=>{
        this.service.list=res as PaymentDetail[]
        this.service.resetForm(form);
        this.toastr.success('Inserted successfully','Payment Detail')
      },
      error: err=>{console.log(err)}
    })
  }
  updateRecord(form:NgForm){
    this.service.putPaymentdetails()
    .subscribe({
      next:res=>{
        this.service.list=res as PaymentDetail[]
        //this.service.resetForm(form);
        this.toastr.success('Updated successfully','Payment Detail')
      },
      error: err=>{console.log(err)}
    })
  }
    

}
