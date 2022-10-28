import { Component, OnInit,HostListener} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerauthService } from 'src/app/services/customerauth.service';
import Swal from 'sweetalert2';
import { Car } from './CarInfo';
import { OrderInfo } from './OrderInfo';
import{HttpClient}from'@angular/common/http';
declare var Razorpay:any;
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})

export class PlaceOrderComponent implements OnInit {
  packs:any=[];
  washpack:any;//washpackName
  pack:any;//washpack object
  washpackCost:any;
  mail:any;
  x:Car={
    id:0,
    name:"",
    model:""
  }
  order:OrderInfo={
    userEmailId:"",
    washerName:"",
    washpack:"",
    phoneNo:0,
    areapincode:"", 
    cars:this.x,
    addon:"",
     }
     form={
      name:"",
      cost:0,
      mail:"",
      phone:0

     }
     data:any;
     
  orderPlaced:any;
  message:any;
  status:any;
  orderId:any;
  washpackId:any;
  orderForm = new FormGroup({
   
    email:new FormControl('',[Validators.required,Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    name:new FormControl('',Validators.nullValidator),
    Washpack:new FormControl('',Validators.required),
    phone:new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}$')]),
    address:new FormControl('',Validators.required),
    carname:new FormControl('',[Validators.required]),
    model:new FormControl('',Validators.required),
    anyaddon:new FormControl('',Validators.nullValidator)
    
  })
  // get f(){
  //   return this.orderForm.controls;
  // }
  role:any;
  constructor(private http :HttpClient,private customer:CustomerService,private customerAuth:CustomerauthService, private route:ActivatedRoute) {
    //this.washpack="";
   this.role=this.customerAuth.getRole();
    this.mail=this.customerAuth.getCustomerEmail();
   this.order.userEmailId=this.mail;
    this.washpackId=(this.route.snapshot.paramMap.get('id') as String);
    console.log(this.washpackId);
    this.customer.getWashpackById(this.washpackId).subscribe((waspack)=>{
      this.pack=waspack;
      console.log(this.pack);
      console.log("------------------");
      console.log(this.pack.name);
        this.washpack=this.pack.name;
        console.log(this.washpack);
    });
    
   }

  ngOnInit(): void {
    this.customer.getPacks().subscribe((packs)=>{
      this.packs=packs;
    }
    )

  }
//   confirm(){
//    // console.log(this.washpack.cost);
//     this.order.washpack=this.washpack;
//     console.log(this.order.washpack);
//     console.log(this.washpack);
//     console.log(this.order);
    
// }
    paymentId: string="";
    error:string="";

options = {
  "key": "",
  "amount": "", 
  "name": "Coding World",
  "description": "Web Development",
  "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
  "order_id":"",
  "handler": function (response:any){
    var event = new CustomEvent("payment.success", 
      {
        detail: response,
        bubbles: true,
        cancelable: true
      }
    );	  
    window.dispatchEvent(event);
  }
  ,
  "prefill": {
  "name": "",
  "email": "",
  "contact": ""
  },
  "notes": {
  "address": ""
  },
  "theme": {
  "color": "#3399cc"
  }
  };

confirm():void{
  console.log(this.washpack.cost);
    this.order.washpack=this.washpack;
    console.log(this.order.washpack);
    console.log(this.washpack);
    console.log(this.order);
    this.form.name=String(this.customerAuth.getCustomerName());
    //order:email;phoneno

    this.customer.getWashpackCost(this.washpack).subscribe((cost)=>{
      console.log("----------------inside get cost------------------");
      console.log(cost);
      this.washpackCost=cost;
      this.form.cost=this.washpackCost;
      console.log(this.form.cost);
      this.form.mail=String(this.order.userEmailId);
      this.form.phone=this.order.phoneNo;
      console.log(this.form);
      this.customer.addOrder(this.form).subscribe(data=>{
        console.log(data);
        this.data=data;
        console.log(this.data);
        console.log(this.data.secretId);
        this.options.key=this.data.secretId;
        console.log(this.options.key);
        this.options.order_id=this.data.razorpayOrderId;
        console.log(this.options.order_id);
        this.options.amount=this.data.applicationFee;
        console.log(this.options.amount);
        this.options.prefill.name=this.form.name;
        console.log(this.options.prefill.name);
        this.options.prefill.email=this.form.mail;
        console.log(this.options.prefill.email);
        this.options.prefill.contact=String(this.form.phone);
        this.options.image="";
        var rz =new Razorpay(this.options);
        rz.open();
      

      });
    });
      
   

}

         
  done(){
    
      Swal.fire({
        title: 'Place Order?',
        text: "Your order will be confirmed",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Done!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirm();
        }
      })
    
  }

  @HostListener('window:payment.success', ['$event']) 
  onPaymentSuccess(event:any): void {
     console.log(event.detail);
     this.customer.saveOrder(this.order).subscribe((order)=>{
      console.log(order);
      Swal.fire({
        title: 'payment successful',
        // text: "Your order will be confirmed",
        icon: 'success',
        // showCancelButton: true,
        // confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        // confirmButtonText: 'Done!'
      })
     });
     
  }
 


}
