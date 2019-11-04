import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss']
})
export class ViewcartComponent implements OnInit {
  CartDetails;
  productId;
  Cart:any[]=[];
  total;
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit() {
    this.CartDetails = JSON.parse(localStorage.getItem('cart'));
    this.getCartDetails();
    

    
  }


  getCartDetails(){
    this.CartDetails.forEach(x => {
    
      this.productId=JSON.parse(x).productId;
      this.productService.getSingleProduct(this.productId).subscribe(data=>{
       this.Cart.push(data["data"]);
       for(var i of this.Cart){
         
         i.qty = JSON.parse(x).qty
         this.total = JSON.parse(x).qty * i.price;
         console.log(this.total);
         console.log(this.Cart);
         
       }
       
       
        
       
      })
    
        });
  }

}
