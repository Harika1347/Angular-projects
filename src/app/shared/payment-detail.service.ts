import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  url : string=environment.apiBaseUrl+'/api/PaymentDetail'
  list:PaymentDetail[]= [];
  formData: PaymentDetail= new PaymentDetail();
  formSubmitted:boolean=false;

  constructor(private http : HttpClient) { }

  refreshList(){
    this.http.get(this.url).subscribe({
      next:res=>{
        this.list=res as PaymentDetail[]
      },
      error:err=>{console.log(err)}
    })

  }
    
  postPaymentdetails(){
    console.log(this.formData)
    return this.http.post(this.url+'/PostPaymentDetail',this.formData)
  }

  putPaymentdetails(){
    console.log(this.formData)
    return this.http.put(this.url+'/UpdatePayment/'+this.formData.paymentId,this.formData)
  }

  deletePaymentDetails(id:number)
  {
    console.log(this.url+'/DeletePayment/'+id)
    return this.http.delete(this.url+'/DeletePayment/'+id)
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formSubmitted=false;
    this.formData=new PaymentDetail()
  }
}
