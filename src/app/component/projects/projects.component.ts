import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import {Project} from '../../model/project';
import {Bug} from '../../model/bug';

import {QadashboardService} from '../../service/qadashboard.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectList: Project[] = [];
  bugId: string;
  constructor(private qadashboardService: QadashboardService) { }

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
}
