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
  constructor(private qadashboardService: QadashboardService) { }

  ngOnInit() {
    if (this.testcase.$key == null) {
      this.testcase.status = 1;
    }
  }
  onSubmit() {
    if (this.testcase.$key == null) {
      this.qadashboardService.insertTestCase(this.projectkey, this.testcase);
      const res = this.qadashboardService.getProjectList(this.projectkey) as ProjectList;
      res.testCasesCount = res.testCasesCount == null ? 1 : res.testCasesCount + 1;
      this.qadashboardService.updateProjectList(this.projectkey, res);
    } else {
      this.qadashboardService.updateTestCase(this.projectkey, this.testcase.$key, this.testcase);
    }
  }
  Delete() {
    if (this.testcase.$key != null) {
      this.qadashboardService.removeTestCase(this.projectkey, this.testcase.$key);
      const res = this.qadashboardService.getProjectList(this.projectkey) as ProjectList;
      res.testCasesCount = res.testCasesCount == null || res.testCasesCount === 0 ? 0 : res.testCasesCount - 1;
      this.qadashboardService.updateProjectList(this.projectkey, res);
    }
  }
}

