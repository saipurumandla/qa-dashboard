import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QadashboardService } from '../../service/qadashboard.service';
import { ProjectList } from '../../model/project-list';
import { TestCase } from '../../model/testcase';

@Component({
  selector: 'app-testcase-modal',
  templateUrl: './testcase-modal.component.html',
  styleUrls: ['./testcase-modal.component.css']
})
export class TestcaseModalComponent implements OnInit {
  @Input('testcase') testcase: TestCase;
  @Input('content') content: any;
  @Input('projectkey') projectkey: any;
  @Input('projectname') projectname: any;
  status = 0;
  constructor(private qadashboardService: QadashboardService) { }

  ngOnInit() {
    console.log(this.projectname);
    if (this.testcase.$key == null) {
      this.testcase.status = 1;
    } else {
      this.status = this.testcase.status;
    }
  }
  onSubmit() {
    if (this.testcase.$key == null) {
      this.qadashboardService.insertTestCase(this.projectkey, this.testcase);
      this.qadashboardService.updateProjectList(this.projectkey, this.GenerateBugProfile(1));
    } else {
      this.qadashboardService.updateTestCase(this.projectkey, this.testcase.$key, this.testcase);
      this.qadashboardService.updateProjectList(this.projectkey, this.GenerateBugProfile(2));
    }
    this.content.hide();
    this.testcase = new TestCase();
    this.testcase.status = 1;
  }
  Delete() {
    if (this.testcase.$key != null) {
      this.qadashboardService.removeTestCase(this.projectkey, this.testcase.$key);
      this.qadashboardService.updateProjectList(this.projectkey, this.GenerateBugProfile(3));
    }
    this.content.hide();
    this.testcase = new TestCase();
    this.testcase.status = 1;
  }
  GenerateBugProfile(mode: number) {
    const projectList = new ProjectList();
    projectList.projectkey = this.projectkey;
    projectList.projectname = this.projectname;
    projectList.bugCount = 0;
    projectList.caCount = 0;
    projectList.cbaCount = 0;
    projectList.cbCount = 0;
    projectList.ipbCount = 0;
    projectList.nbCount = 0;
    projectList.ntaCount = 0;
    projectList.testCasesCount = 0;
    projectList.rbCount = 0;
    projectList.rtaCount = 0;
    if (mode === 3) {
      if (this.status === 1) {
        projectList.ntaCount = -1;
        projectList.testCasesCount = -1;
      } else if (this.status === 2) {
        projectList.caCount = -1;
        projectList.testCasesCount = -1;
      } else if (this.status === 3) {
        projectList.cbaCount = -1;
        projectList.testCasesCount = -1;
      } else if (this.status === 4) {
        projectList.rtaCount = -1;
        projectList.testCasesCount = -1;
      }
    } else if (mode === 2) {
      if (Number(this.status) !== Number(this.testcase.status)) {
        if (this.status === 1) {
          projectList.ntaCount = -1;
          projectList.testCasesCount = -1;
        } else if (this.status === 2) {
          projectList.caCount = -1;
          projectList.testCasesCount = -1;
        } else if (this.status === 3) {
          projectList.caCount = -1;
          projectList.testCasesCount = -1;
        } else if (this.status === 4) {
          projectList.rtaCount = -1;
          projectList.testCasesCount = -1;
        }
        if (Number(this.testcase.status) === 1) {
          projectList.ntaCount = 1;
          projectList.testCasesCount = 1;
        } else if (Number(this.testcase.status) === 2) {
          projectList.caCount = 1;
          projectList.testCasesCount = 1;
        } else if (Number(this.testcase.status) === 3) {
          projectList.caCount = 1;
          projectList.testCasesCount = 1;
        } else if (Number(this.testcase.status) === 4) {
          projectList.rtaCount = 1;
          projectList.testCasesCount = 1;
        }
      }
    } else if (mode === 1) {
      if (Number(this.testcase.status) === 1) {
        projectList.ntaCount = 1;
        projectList.testCasesCount = 1;
      } else if (Number(this.testcase.status) === 2) {
        projectList.caCount = 1;
        projectList.testCasesCount = 1;
      } else if (Number(this.testcase.status) === 3) {
        projectList.caCount = 1;
        projectList.testCasesCount = 1;
      } else if (Number(this.testcase.status) === 4) {
        projectList.rtaCount = 1;
        projectList.testCasesCount = 1;
      }
    }
    return projectList;
  }
}

