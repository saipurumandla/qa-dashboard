import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {QadashboardService} from '../../service/qadashboard.service';
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
  constructor(private qadashboardService: QadashboardService) { }

  ngOnInit() {
    if (this.bug.$key == null) {
      this.bug.status = 1;
    }
  }
  onSubmit() {
    if (this.bug.$key == null) {
      this.qadashboardService.insertBug(this.projectkey, this.bug);
      this.qadashboardService.getAllProjectList().snapshotChanges().subscribe(item => {
        item.forEach(element => {
          const y = element.payload.toJSON() as ProjectList;
          if (y['projectkey'] === this.projectkey) {
            y.bugCount =  y.bugCount == null ? 1 : y.bugCount + 1;
            this.qadashboardService.updateProjectList(element.key, y);
          }
        });
      });
      // res.bugCount =  res.bugCount == null ? 1 : res.bugCount + 1;
      // this.qadashboardService.updateProjectList(this.projectkey, res);
    } else {
      this.qadashboardService.updateBug(this.projectkey, this.bug.$key, this.bug);
    }
  }
  Delete() {
    if (this.bug.$key != null) {
      this.qadashboardService.removeBug(this.projectkey, this.bug.$key);
      const res = this.qadashboardService.getProjectList(this.projectkey) as ProjectList;
      res.bugCount =  res.bugCount == null || res.bugCount === 0 ? 0 : res.bugCount - 1;
      this.qadashboardService.updateProjectList(this.projectkey, res);
    }
  }
}
