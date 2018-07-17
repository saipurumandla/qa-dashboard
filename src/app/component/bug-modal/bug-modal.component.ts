import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QadashboardService } from '../../service/qadashboard.service';
import { Bug } from '../../model/bug';
import { ProjectList } from '../../model/project-list';
@Component({
  selector: 'app-bug-modal',
  templateUrl: './bug-modal.component.html',
  styleUrls: ['./bug-modal.component.css']
})
export class BugModalComponent implements OnInit {
  @Input('bug') bug: Bug;
  @Input('content') content: any;
  @Input('projectkey') projectkey: any;
  @Input('projectname') projectname: any;
  status = 0;
  constructor(private qadashboardService: QadashboardService) { }

  ngOnInit() {
    console.log(this.projectname);
    if (this.bug.$key == null) {
      this.bug.status = 1;
    } else {
      this.status = this.bug.status;
    }
  }
  onSubmit() {
    if (this.bug.$key == null) {
      this.qadashboardService.insertBug(this.projectkey, this.bug);
     this.qadashboardService.updateProjectList(this.projectkey, this.GenerateBugProfile(1));
     console.log(this.bug.status);
    } else {
      this.qadashboardService.updateBug(this.projectkey, this.bug.$key, this.bug);
      this.qadashboardService.updateProjectList(this.projectkey, this.GenerateBugProfile(2));
    }
    this.content.hide();
    this.bug = new Bug();
    this.bug.status = 1;
  }
  Delete() {
    if (this.bug.$key != null) {
      this.qadashboardService.removeBug(this.projectkey, this.bug.$key);
      this.qadashboardService.updateProjectList(this.projectkey, this.GenerateBugProfile(3));
    }
    this.content.hide();
    this.bug = new Bug();
    this.bug.status = 1;
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
    projectList.rbCount = 0;
    projectList.rtaCount = 0;
    projectList.testCasesCount = 0;
    if (mode === 3) {
      if (this.status === 1) {
        projectList.nbCount = -1;
        projectList.bugCount = -1;
      } else if (this.status === 2) {
        projectList.ipbCount = -1;
        projectList.bugCount = -1;
      } else if (this.status === 3) {
        projectList.cbCount = -1;
        projectList.bugCount = -1;
      } else if (this.status === 4) {
        projectList.rbCount = -1;
        projectList.bugCount = -1;
      }
    } else if (mode === 2) {
      if (Number(this.status) !== Number(this.bug.status)) {
        if (this.status === 1) {
          projectList.nbCount = -1;
          projectList.bugCount = -1;
        } else if (this.status === 2) {
          projectList.ipbCount = -1;
          projectList.bugCount = -1;
        } else if (this.status === 3) {
          projectList.cbCount = -1;
          projectList.bugCount = -1;
        } else if (this.status === 4) {
          projectList.rbCount = -1;
          projectList.bugCount = -1;
        }
        if (Number(this.bug.status) === 1) {
          projectList.nbCount = 1;
          projectList.bugCount = 1;
        } else if (Number(this.bug.status) === 2) {
          projectList.ipbCount = 1;
          projectList.bugCount = 1;
        } else if (Number(this.bug.status) === 3) {
          projectList.cbCount = 1;
          projectList.bugCount = 1;
        } else if (Number(this.bug.status) === 4) {
          projectList.rbCount = 1;
          projectList.bugCount = 1;
        }
      }
    } else if (mode === 1) {
      if (Number(this.bug.status) === 1) {
        projectList.nbCount = 1;
        projectList.bugCount = 1;
      } else if (Number(this.bug.status) === 2) {
        projectList.ipbCount = 1;
        projectList.bugCount = 1;
      } else if (Number(this.bug.status) === 3) {
        projectList.cbCount = 1;
        projectList.bugCount = 1;
      } else if (Number(this.bug.status) === 4) {
        projectList.rbCount = 1;
        projectList.bugCount = 1;
      }
    }
    return projectList;
  }
}
