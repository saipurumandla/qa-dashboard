import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import {Project} from '../../model/project';
import {Bug} from '../../model/bug';

import {QadashboardService} from '../../service/qadashboard.service';
import { WeeklyStatus } from '../../model/weekly-status';
import { element } from 'protractor';
import { ProjectList } from '../../model/project-list';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectList: Project[] = [];
  projectnames: any[] = [];
  project: Project = new Project();
  selectedProject = {name: 'Select Project', id: null};
  bugId: string;
  statusId: string;
  bugVal: Bug;
  statusVal: WeeklyStatus;
  constructor(private qadashboardService: QadashboardService) { }
  @ViewChild('content') public contentModal;
  public name: string;
  show() {
      this.contentModal.show();
  }

  ngOnInit() {
    this.loadProjects();
  }
  selectProject(project: any) {
    this.selectedProject = project;
    console.log(project);
  }
  selectHome() {
    this.selectedProject = {name: 'Select Project', id: null};
  }
  loadProjects() {
    const x = this.qadashboardService.getProjectList();
    x.snapshotChanges().subscribe(item => {
      item.forEach(ele => {
        const y = ele.payload.toJSON() as ProjectList;
        this.projectnames.push({
          name: y.projectname,
          id: y.projectkey
        });
      });
    });
  }





  //// Test Code
  onClick() {
    const project = new Project();
    project.bugs = [];
    project.ca = [];
    project.cba = [];
    project.projectAbbr = 'TST';
    project.projectName = 'test';
    project.testCases = [];
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
      this.statusVal = null;
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
