import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'sa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  result:string = '';
  constructor(private homeService: HomeService) {}
  async ngOnInit(): Promise<void> {
    await this.fetchDataObj();
  }
  async fetchDataObj() {
    this.result = await this.homeService.fetchDataObj();
  }
}
