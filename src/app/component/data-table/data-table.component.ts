import { Component, OnInit, Input } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
const now = new Date();
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  // @Input('data')

  @Input('tabledata')tabledata: any;
  @Input('perPage')perPage: number;
  @Input('extended')extended: boolean;
  @Input('resetfilter')resetfilter: boolean;
  edit: boolean;
  delete: boolean;
  data: any;
  alwaysNull = null;
  selectedCol = -1;
  searchedId = -1;
  sort: any[];
  selectedPage = 1;
  boxVal = 1;
  boxPercent = '30px';
  pageList: any[] = [];
  pages = 0;
  recordInPage: any[] = [];
  model: NgbDateStruct;
  date: {year: number, month: number};

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  constructor() { }

  ngOnInit() {
    this.edit = true;
    this.delete = true;
    this.setOptionDefaults();
    this.data = JSON.parse(JSON.stringify(this.tabledata));
    this.sort = new Array(this.data.header.length);
    this.recordInPage = new Array(this.data.data.length);
    this.sort.fill(false);
    this.pages =  Math.ceil(this.data.data.length / this.perPage);
    this.pageList = new Array(this.pages).fill(0).map(function (x, i) { return i + 1; });
    this.pagination();

  }
  pagination() {
    this.pages =  Math.ceil(this.data.data.length / this.perPage);
    this.pageList = new Array(this.pages).fill(0).map(function (x, i) { return i + 1; });
    if (this.selectedPage > this.pages) {
      this.selectedPage = this.pages;
    } else if (this.selectedPage === 0) {
      this.selectedPage = 1;
    }
    this.recordInPage = [];
    this.boxVal = this.selectedPage;
    for (let _i = this.perPage * (this.selectedPage - 1); this.recordInPage.length < this.perPage && _i < this.data.data.length; _i++) {
      this.recordInPage.push(_i);
    }
  }
  changePage(pageNumber: number) {
    if (pageNumber <= 0) {
      pageNumber = 1;
    } else if (pageNumber > this.pages) {
      pageNumber = this.pages;
    }
    this.selectedPage = pageNumber;
    this.pagination();
  }
  changePageNumber(pageNumber: number) {
    let len = (pageNumber).toString().length;
    len = 20 + (10 * len);
    this.boxPercent = len.toString() + 'px';
  }
  focusOut(pageNumber: number) {
    if (pageNumber <= 0) {
      console.log(pageNumber);
      pageNumber = 1;
    } else if (pageNumber > this.pages) {
      pageNumber = this.pages;
    }
    this.selectedPage = pageNumber;
    this.boxVal = this.selectedPage;
    let len = (this.selectedPage).toString().length;
    len = 20 + (10 * len);
    this.boxPercent = len.toString() + 'px';
    this.pagination();
  }
  formatDate(date: any, format: string, id: number) {
    date = date.month.toString() + '/' + date.day.toString() + '/' + date.year.toString();
    this.data.header[id].search.value = moment(new Date(date)).format(format);
    this.search();
  }
  sortData(i: number, toggle: boolean) {
    this.selectedCol = i;
    if (toggle === false) {
      this.sort[i] = !this.sort[i];
    }
    const order = this.sort[i];
    this.sort.fill(false);
    if (!order) {
      this.data.data.sort(function (a, b) {return a[i] > b[i]; });
    } else {
    this.data.data.sort(function (a, b) {return a[i] < b[i]; });
    }
    this.sort[i] = !order;
  }
  search() {
    this.data.data = [];
    this.tabledata.data.forEach(element => {
      if (this.searchdata(element)) {
        this.data.data.push(JSON.parse(JSON.stringify(element)));
      }
    });
    this.sortData(this.selectedCol, false);
    this.pagination();
  }
  searchdata(a: any[]) {

    let res = true;
    for (let _i = 0; _i < this.data.header.length; _i++) {
        if (this.data.header[_i].search.value != null && this.data.header[_i].search.value !== '' &&
        this.data.header[_i].search.value !== 'N$ll') {
         res = res && a[_i].toString().includes(this.data.header[_i].search.value);
        }
    }
    return res;
  }
  setOptionDefaults() {
    this.tabledata.header.forEach(element => {
        if (element.searchable && element.search.type === 'options') {
          element.search.value = 'N$ll';
        }
    });
  }
  reset() {
    this.data.header = JSON.parse(JSON.stringify(this.tabledata.header));
    this.search();
  }
}
