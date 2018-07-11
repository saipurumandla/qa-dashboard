import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Project} from '../model/project';
import {Bug} from '../model/bug';
import {WeeklyStatus} from '../model/weekly-status';

@Injectable()
export class QadashboardService {
  projectList: AngularFireList<any>;
  projectObject: AngularFireObject<any>;
  constructor(private firebase: AngularFireDatabase) { }
  getProjects() {
    this.projectList = this.firebase.list('projects');
    return this.projectList;
  }
  insertProject(project: Project) {
    this.projectList.push({
      projectName : project.projectName,
      projectAbbr : project.projectAbbr,
      testCases : project.testCases,
      ca : project.ca,
      cba : project.cba,
      bugs : project.bugs,
      weeklyStatus : project.weeklyStatus,
      testCasesCount : project.testCasesCount,
      caCount : project.caCount,
      cbaCount : project.cbaCount
    });
  }
  deleteProject($key: string) {
    this.projectList.remove($key).catch(error => this.handleError(error));
  }
  updateProjects(project: Project) {
    this.projectList.update(project.$key,
    {
      projectName : project.projectName,
      projectAbbr : project.projectAbbr,
      testCases : project.testCases,
      ca : project.ca,
      cba : project.cba,
      bugs : project.bugs,
      weeklyStatus : project.weeklyStatus,
      testCasesCount : project.testCasesCount,
      caCount : project.caCount,
      cbaCount : project.cbaCount
    }).catch(error => this.handleError(error));
  }
  getProject($key: string) {
    return this.firebase.object('projects/' + $key);
  }
  /// Bug CRUD operations
  insertBug(projectkey: string, bug: Bug) {
    delete bug['$key'];
    const fireObject = this.firebase.list('projects/' + projectkey + '/bugs');
    return fireObject.push(JSON.parse(JSON.stringify(bug))).key;
  }
  updateBug(projectkey: string, $key: string, bug: Bug) {
    delete bug['$key'];
    const fireObject = this.firebase.list('projects/' + projectkey + '/bugs');
    fireObject.update($key,
      JSON.parse(JSON.stringify(bug))).catch(error => this.handleError(error));
  }
  removeBug(projectkey: string, $key: string) {
    const fireObject = this.firebase.list('projects/' + projectkey + '/bugs');
    fireObject.remove($key).catch(error => this.handleError(error));
  }
  getBug(projectkey: string, $key: string) {
    const fireObject = this.firebase.object('projects/' + projectkey + '/bugs/' + $key);
    return fireObject;
  }
  /// Bug CRUD operations end
  /// WeeklyStatus CRUD operations
  insertWeeklyStatus(projectkey: string, status: WeeklyStatus) {
    delete status['$key'];
    const fireObject = this.firebase.list('projects/' + projectkey + '/weeklystatuses');
    return fireObject.push(JSON.parse(JSON.stringify(status))).key;
  }
  updateWeeklyStatus(projectkey: string, $key: string, status: WeeklyStatus) {
    delete status['$key'];
    const fireObject = this.firebase.list('projects/' + projectkey + '/weeklystatuses');
    fireObject.update($key,
      JSON.parse(JSON.stringify(status))).catch(error => this.handleError(error));
  }
  removeWeeklyStatus(projectkey: string, $key: string) {
    const fireObject = this.firebase.list('projects/' + projectkey + '/weeklystatuses');
    fireObject.remove($key).catch(error => this.handleError(error));
  }
  getStatus(projectkey: string, $key: string) {
    const fireObject = this.firebase.object('projects/' + projectkey + '/weeklystatuses/' + $key);
    return fireObject;
  }
  /// WeeklyStatus CRUD operations end
  private handleError(error) {
    console.log(error);
  }
}
