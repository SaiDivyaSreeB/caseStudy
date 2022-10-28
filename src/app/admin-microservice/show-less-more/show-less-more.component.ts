import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-show-less-more',
  templateUrl: './show-less-more.component.html',
  styleUrls: ['./show-less-more.component.css']
})
export class ShowLessMoreComponent implements OnInit {
  @Input() text: string="";
  @Input() wordLimit: number=0;
  showMore:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }


}
