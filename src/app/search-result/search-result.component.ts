import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

export interface Result {
  title: string
  icon?: string
  img?: string
  click?: () => void
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  results: Result[] = []

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.results = data['results']
    })
  }

}
