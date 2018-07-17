import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {Project} from '../model/project';
import {Bug} from '../model/bug';
import {WeeklyStatus} from '../model/weekly-status';
import {ProjectList} from '../model/project-list';
import { User } from '../model/user';
import { TestCase } from '../model/testcase';

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
      bugs : project.bugs,
      weeklyStatus : project.weeklyStatus,
      users : project.users
    });
    const list = new ProjectList();
    list.projectkey = id.key;
    list.projectname = project.projectName;
    list.bugCount = 0;
    list.caCount = 0;
    list.cbaCount = 0;
    list.cbCount = 0;
    list.ipbCount = 0;
    list.nbCount = 0;
    list.ntaCount = 0;
    list.testCasesCount = 0;
    list.rbCount = 0;
    list.rtaCount = 0;
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
    /// Bug CRUD operations
    insertTestCase(projectkey: string, testcase: TestCase) {
      delete testcase['$key'];
      const fireObject = this.firebase.list('projects/' + projectkey + '/testcases');
      return fireObject.push(JSON.parse(JSON.stringify(testcase))).key;
    }
    updateTestCase(projectkey: string, $key: string, testcase: TestCase) {
      delete testcase['$key'];
      const fireObject = this.firebase.list('projects/' + projectkey + '/testcases');
      fireObject.update($key,
        JSON.parse(JSON.stringify(testcase))).catch(error => this.handleError(error));
    }
    removeTestCase(projectkey: string, $key: string) {
      const fireObject = this.firebase.list('projects/' + projectkey + '/testcases');
      fireObject.remove($key).catch(error => this.handleError(error));
    }
    getTestCase(projectkey: string, $key: string) {
      const fireObject = this.firebase.object('projects/' + projectkey + '/testcases/' + $key);
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
    const fireList = this.firebase.list('projectslist');
    this.getAllProjectList().snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const y = element.payload.toJSON() as ProjectList;
        if (y['projectkey'] === $key) {
          fireList.update(element.key, JSON.parse(JSON.stringify(this.MergeList(y, project)))).catch(error => this.handleError(error));
        }
      });
    });
  }
  getAllProjectList() {
    return this.firebase.list('projectslist');
  }
  deleteProjectList($key) {
    let key: string = null;
    this.getAllProjectList().snapshotChanges().subscribe(item => {
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
getProjectList($key) {
  let obj: any = null;
  this.getAllProjectList().snapshotChanges().subscribe(item => {
    item.forEach(element => {
      const y = element.payload.toJSON();
      if (y['projectkey'] === $key) {
        y['$key'] = element.key;
        obj = y;
        return obj;
      }
    });
  });
  return obj;
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
  private MergeList(oldList: ProjectList, newList: ProjectList) {
    oldList.projectname = newList.projectname ? newList.projectname : oldList.projectname;
    oldList.bugCount += newList.bugCount;
    oldList.caCount += newList.caCount;
    oldList.cbaCount += newList.cbaCount;
    oldList.cbCount += newList.cbCount;
    oldList.ipbCount += newList.ipbCount;
    oldList.nbCount += newList.nbCount;
    oldList.ntaCount += newList.ntaCount;
    oldList.testCasesCount += newList.testCasesCount;
    oldList.rbCount += newList.rbCount;
    oldList.rtaCount += newList.rtaCount;

    return oldList;
  }
}
