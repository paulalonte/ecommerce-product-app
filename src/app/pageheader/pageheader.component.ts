import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pageheader',
  templateUrl: './pageheader.component.html',
  styleUrls: ['./pageheader.component.scss']
})
export class PageheaderComponent implements OnInit {

  @Input() pageHeaderTitle:string;
  
  constructor() { }

  ngOnInit() {
  }

}
