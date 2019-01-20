import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  query: string
  result = [];
  flag=0
  search() {
    this.flag=0
    if(this.query == '')
      this.query = undefined
    this.searchService.getSearchResults(this.query).subscribe(d => {this.result = d;
      console.log(this.result)  
    if(d.length) {
      this.flag = 1
    }
    else
    {
      this.flag=0
    }

    
    });
    
  }

  getProfile(i){
    this.searchService.getProfile(this.result[i].userName).subscribe(d => console.log(d));
  }
}