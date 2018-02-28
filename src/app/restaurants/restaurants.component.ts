import { Observable } from 'rxjs/Observable';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './restaurant/restaurant.model';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import 'rxjs/add/operator/switchmap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debouncetime'
import 'rxjs/add/operator/distinctuntilchanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/from'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  animations: [
    trigger('toogleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', [
        animate('250ms 0s ease-in-out')
      ]) 
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarraState = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
              .debounceTime(500)
              .distinctUntilChanged()
              .switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm).catch(error => Observable.from([])))
              .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants().subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearch(){
    this.searchBarraState = this.searchBarraState === 'hidden' ? 'visible' : 'hidden'
  }

}
