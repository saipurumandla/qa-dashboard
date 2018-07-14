import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Project} from '../model/project';
import {Bug} from '../model/bug';
import {WeeklyStatus} from '../model/weekly-status';
import {ProjectList} from '../model/project-list';
import { User } from '../model/user';

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
    this.projectList = this.firebase.list('projects');
    const id  = this.projectList.push({
      projectName : project.projectName,
      projectAbbr : project.projectAbbr,
      testCases : project.testCases,
      ca : project.ca,
      cba : project.cba,
      bugs : project.bugs,
      weeklyStatus : project.weeklyStatus,
      users : project.users
    });
    const list = new ProjectList();
    list.projectkey = id.key;
    list.projectname = project.projectName;
    list.caCount = project.ca.length;
    list.cbaCount = project.cba.length;
    list.testCasesCount = project.testCases.length;
    this.insertProjectList(list);
    return id.key;
  }
  deleteProject($key: string) {
    if (this.projectList  == null) {
      this.getProjects();
     }
    this.projectList.remove($key).catch(error => this.handleError(error));
    this.deleteProjectList($key);
  }
  updateProjects(project: Project) {
    if (this.projectList  == null) {
      this.getProjects();
     }
    this.projectList.update(project.$key,
    {
      projectName : project.projectName,
      projectAbbr : project.projectAbbr,
      testCases : project.testCases,
      ca : project.ca,
      cba : project.cba,
      bugs : project.bugs,
      weeklyStatus : project.weeklyStatus,
      users : project.users
    }).catch(error => this.handleError(error));
    const list = new ProjectList();
    list.projectkey = project.$key;
    list.projectname = project.projectName;
    this.updateProjectList(project.$key, list);
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
  insertProjectList(project: ProjectList) {
    const fireList = this.firebase.list('projectslist');
    return fireList.push(JSON.parse(JSON.stringify(project)));
  }
  updateProjectList($key: string, project: ProjectList) {
    let key: string = null;
    const fireList = this.firebase.list('projectslist');
    fireList.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const y = element.payload.toJSON();
        if (y['projectkey'] === $key) {
          key = element.key;
        }
      });
    });
    fireList.update(key, JSON.parse(JSON.stringify(project))).catch(error => this.handleError(error));
  }
  getProjectList() {
    return this.firebase.list('projectslist');
  }
  deleteProjectList($key) {
    let key: string = null;
    this.getProjectList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const y = element.payload.toJSON();
        if (y['projectkey'] === $key) {
          key = element.key;
        }
      });
    });
    if (key != null) {
      const projectList = this.firebase.list('projectslist');
      projectList.remove(key).catch(error => this.handleError(error));
    }
  }
  insertUser(projectkey: string, user: User) {
    delete user['$key'];
    const fireObject = this.firebase.list('projects/' + projectkey + '/users');
    return fireObject.push(JSON.parse(JSON.stringify(user))).key;
  }
  updateUser(projectkey: string, $key: string, user: User) {
    delete user['$key'];
    const fireObject = this.firebase.list('projects/' + projectkey + '/users');
    fireObject.update($key,
      JSON.parse(JSON.stringify(status))).catch(error => this.handleError(error));
  }
  removeUser(projectkey: string, $key: string) {
    const fireObject = this.firebase.list('projects/' + projectkey + '/users');
    fireObject.remove($key).catch(error => this.handleError(error));
  }
  getUser(projectkey: string, $key: string) {
    const fireObject = this.firebase.object('projects/' + projectkey + '/users/' + $key);
    return fireObject;
  }
  private handleError(error) {
    console.log(error);
  }
}
