import { Component, OnInit,Input} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
   totalqty;
   
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit() {
  this.productService.currentMessage.subscribe(data=>this.totalqty=data);
       
  }

  

}