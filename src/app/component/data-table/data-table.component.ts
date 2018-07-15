import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  // @Input('data')
  data: any;
  extended: boolean;
  selectedCol = -1;
  sort: any[];
  perPage = 1;
  selectedPage = 1;
  boxVal = 1;
  boxPercent = '30px';
  pageList: any[] = [];
  pages = 0;
  recordInPage: any[] = [];

  constructor() { }

  ngOnInit() {
    this.extended = true;

    this.data = {
      header: [
        {
          name: 'Test',
          extended: false,
          sortable: true,
          searchable: true,
          search: {
            type: 'number'
          }
        },
        {
          name: 'Test 2',
          extended: false,
          sortable: true,
          searchable: true,
          search: {
            type: 'string'
          }
        },
        {
          name: 'Test 3',
          extended: false,
          sortable: true,
          searchable: true,
          search: {
            type: 'options',
            options: [
              {
                name: 'New',
                value: 'New'
              },
              {
                name: 'Closed',
                value: 'Closed'
              },
              {
                name: 'In-process',
                value: 'In-process'
              },
            ]
          }
        },
        {
          name: 'Test 4',
          extended: true,
          searchable: true,
          search: {
            type: 'date',
            format: 'mm/dd/yyyy'
          }
        }
      ],
      data: [
        [2, '25', 'kumar', 'reddy'],
        [1, '29', 'harin', 'kumar'],
        [3, '26', 'purumandla', 'harin']
      ]
    };
    this.sort = new Array(this.data.header.length);
    this.recordInPage = new Array(this.data.data.length);
    this.sort.fill(false);
    this.pages =  Math.ceil(this.data.data.length / this.perPage);
    this.pageList = new Array(this.pages).fill(0).map(function (x, i) { return i + 1; });
    this.pagination();

  }
  sortData(i: number) {
    this.selectedCol = i;
    const order = this.sort[i];
    this.sort.fill(false);
    if (!order) {
      this.data.data.sort(function (a, b) {return a[i] > b[i]; });
    } else {
    this.data.data.sort(function (a, b) {return a[i] < b[i]; });
    }
    this.sort[i] = !order;
  }
  pagination() {
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
}
