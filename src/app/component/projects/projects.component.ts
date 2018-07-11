import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import {Project} from '../../model/project';
import {Bug} from '../../model/bug';

import {QadashboardService} from '../../service/qadashboard.service';
import { WeeklyStatus } from '../../model/weekly-status';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectList: Project[] = [];
  bugId: string;
  statusId: string;
  bugVal: Bug;
  statusVal: WeeklyStatus;
  constructor(private qadashboardService: QadashboardService) { }
  @ViewChild('content') public contentModal;
  public name: string;

  show(value: string) {
      this.name = value;
      this.contentModal.show();
  }

  ngOnInit() {
    const x = this.qadashboardService.getProjects();
    x.snapshotChanges().subscribe(item => {
      this.projectList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.projectList.push(y as Project);
      });
    });
  }
  clickTest() {
    alert('test');
  }
  onClick() {
    const project = new Project();
    project.bugs = [];
    project.ca = [];
    project.caCount = 0;
    project.cba = [];
    project.cbaCount = 0;
    project.projectAbbr = 'TST';
    project.projectName = 'test';
    project.testCases = [];
    project.testCasesCount = 0;
    project.weeklyStatus = [];
    this.qadashboardService.insertProject(project);
  }
  onBugClick() {
    const bug = new Bug();
    bug.created = new Date(Date.now());
    bug.createdBy = 'me';
    bug.description = 'Test Bug';
    bug.status = 'Open';
    bug.url = 'https://www.google.com/';
    this.bugId = this.qadashboardService.insertBug(this.projectList[0].$key, bug);
    // this.projectList[0].$key
  }
  onWeeklyStatusClick() {
    const status = new WeeklyStatus();
    status.week = '12';
    status.cbaCount = 0;
    status.ca = [];
    status.created = new Date(Date.now());
    status.createdBy = 'me';
    this.statusId = this.qadashboardService.insertWeeklyStatus(this.projectList[0].$key, status);
  }
  getStatus() {
    const status = this.qadashboardService.getStatus(this.projectList[0].$key, this.statusId);
    status.snapshotChanges().subscribe(item => {
      const y = item.payload.toJSON();
        y['$key'] = item.key;
       this.statusVal = y as WeeklyStatus;
    });
  }
  updateStatus() {
   this.statusVal.created = new Date(Date.now());
   this.statusVal.createdBy = 'me again';
    this.qadashboardService.updateWeeklyStatus(this.projectList[0].$key, this.statusVal.$key, this.statusVal);
  }
  updateBug() {
    const bug = new Bug();
    bug.created = new Date(Date.now());
    bug.createdBy = 'me';
    bug.description = 'Test Bug';
    bug.status = 'Open';
    bug.url = 'https://www.facebook.com/';
    this.qadashboardService.updateBug(this.projectList[0].$key, this.bugId, bug);
  }
  deleteBug() {
    this.qadashboardService.removeBug(this.projectList[0].$key, this.bugId);
  }
  getBug() {
    const bug = this.qadashboardService.getBug(this.projectList[0].$key, this.bugId);
    bug.snapshotChanges().subscribe(item => {
      const y = item.payload.toJSON();
        y['$key'] = item.key;
       this.bugVal = y as Bug;
    });
  }
}
