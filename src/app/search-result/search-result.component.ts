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
  results: Result[] = [
    {
      title: 'test', 
      icon: 'tag',
      click: () => console.log("test")
    },
    {
      title: 'funny', 
      icon: 'tag'
    },
    {
      title: 'asdasdasjdklasdj', 
      img: 'https://pixe.la/profile/img/nogravatar.png'
    }
  ]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.results = data['results']
      console.log(this.results)
    })
  }

}
