import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ProductService } from '../services/product.service';
import { WindowRef } from '../windowref';
import { Product } from '.././components/cart';
import { Item } from '../components/item';


var Razorpay:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products = [];
  tags:string[]=[];
  totalqty:number=0;


  private items:Item[]=[];
  private total:number = 0;
  
  constructor(
    private productService:ProductService,
    private winRef:WindowRef
  ) { }

  rzp1:any;
  // options = {
  //   'key':'rzp_test_ei7r9hIcPT14MZ' ,
  //   'amount': '2000', // 2000 paise = INR 20
  //   'name': 'Merchant Name',
  //   'description': 'Purchase Description',
  //   'image': '/your_logo.png',
  //   'handler': function(response) {
  //       alert(response.razorpay_payment_id);
  //   },
  //   'prefill': {
  //       'name': 'Harshil Mathur',
  //       'email': 'harshil@razorpay.com'
  //   },
  //   'notes': {
  //       'address': 'Hello World'
  //   },
  //   'theme': {
  //       'color': '#F37254'
  //   }
  // };
  


 
   private getSelectedIndex(id:string){
    
    for(var i=0;i<this.products.length;i++){
       if(this.products[i].productId ==id){
        
      
         return i;
        
       }

    }
    
   }


   private find(id:string){
    
    
       return this.products[this.getSelectedIndex(id)];
       
  
   }


  ngOnInit() {
    this.products = this.productService.Products;
    
    this.tags.push(localStorage.getItem('tags'));
  

    this.productService.getAllproducts(this.tags).subscribe(data=>{
                  this.products= data["data"];
                
    })
    
  

  }

  // openRazorpayCheckout() {

  //   this.rzp1 = new Razorpay(this.options);
    
  //   this.rzp1.open();
  //   // let options = {
  //   //   key: "rzp_test_ei7r9hIcPT14MZ",
  //   //   amount: 100,    
  //   //   name: "Engyd",        
  //   //   description: "Purchase Description",
  //   //   prefill: { 
  //   //     name: "Santosh Sahal",
  //   //     email: "sahal737@gmail.com"
  //   //   },
  //   //   notes: {
  //   //     address: "Hello World"
  //   //   },
  //   //   theme: {
  //   //     color: "green"
  //   //   },
  //   //   handler: this.paymentResponseHander.bind(this)
  //   // }

  //   // let rzp = new Razorpay(options);
  //   // rzp.open();
  // }
  // paymentResponseHander(response) {
  //   alert(response.razorpay_payment_id)
  // }

  onCart(id){
    let productId = id;
    if(productId){
    let productDetails= this.find(productId);
    let item ={
      productId:productDetails.productId,
      qty:1
    };
    

  if(localStorage.getItem('cart')==null){
    let cart:any = [];
    cart.push(JSON.stringify(item));
    this.totalqty++;
    localStorage.setItem('cart',JSON.stringify(cart));

  }else{
    let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) {
						let item = JSON.parse(cart[i]);
						if (item.productId == id) {
							index = i;
              break;
              
  }
}
if (index == -1) {
  cart.push(JSON.stringify(item));
  this.totalqty++;
  localStorage.setItem('cart', JSON.stringify(cart));
} else {
  let item: Item = JSON.parse(cart[index]);
  item.qty += 1;
  this.totalqty +=1;
  cart[index] = JSON.stringify(item);
  localStorage.setItem("cart", JSON.stringify(cart));
           }
        }       
    }
   this.productService.changeMessage(this.totalqty)  

  }
  
}