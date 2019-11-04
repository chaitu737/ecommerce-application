import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  showspinner= false;
  alltags:string[];
  tags:string[]=[];
  removable = true;
  chips = new FormControl();

  @ViewChild('tagInput', {static: false}) tagInput: ElementRef<HTMLInputElement>;


  constructor(
    private productService:ProductService,
    private router:Router
  ) { }


  remove(tag: any){
    const index = this.tags.indexOf(tag);
    if(index>=0){
      this.tags.splice(index,1);
    }
  }

  show(){
    if(this.tags.length>0){
    
      return true
    }
    return false;
  }

  selected(tag){
    
     this.tags.push(tag);
    localStorage.setItem('tags', JSON.stringify(this.tags));
    




     this.tagInput.nativeElement.value = '';
     }

     onSubmit(){
       console.log(this.tags);
     this.productService.getAllproducts(JSON.stringify(this.tags)).subscribe(data=>{
       this.productService.Products = data["data"];
       
     })
      setTimeout(()=>{
        this.router.navigate(['/dashboard']);


      },2000)
      this.showspinner = true; 
     }

  ngOnInit() {        
    this.getags();
   
  }

  getags(){
    this.productService.getTags().subscribe(data=>{
      this.alltags = data["data"];
      
    }
    )}
  }

