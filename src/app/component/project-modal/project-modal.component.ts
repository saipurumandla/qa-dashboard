import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Project} from '../../model/project';
import {QadashboardService} from '../../service/qadashboard.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {
@Input('project') project: Project;
@Input('content') content: any;
  constructor(private qadashboardService: QadashboardService) {
  }
  validatingForm: FormGroup;
  ngOnInit() {
  }
  onSubmit() {
    if (this.project.$key == null) {
      this.project.bugs = [];
      this.project.testCases = [];
      this.project.weeklyStatus = [];
      this.project.users = [];
    }
    console.log(this.project);
    const id = this.qadashboardService.insertProject(this.project);
    if (id != null) {
      console.log(id);
    } else {
      console.log('error');
    }
    this.project = new Project();
    this.content.hide();
  }
}
