import React from 'react';
import Api from './Api';
import {secret} from '../Config';
export default class GitServices {
  static SearchRepositories(name,offset,limit){
    let Bearer = "Bearer "+secret;
    // return fetch("https://api.github.com/search/repositories?q="+name+"&per_page="+limit+"&page="+offset)
    //   .then(response => response.json());
    let headers = {"Content-Type": "application/json"};
      headers["Authorization"] = Bearer;
    return Api.get("/search/repositories?q="+name+"&per_page="+limit+"&page="+offset,headers).then(response => response.json());;
  }
  // static getRepository(full_name) {
  //   let Bearer = "Bearer "+secret;
  //   return Api.get("/repos/"+full_name,Bearer);
  // }
  static getRepository(id) {
    let Bearer = "Bearer "+secret;
    let headers = {"Content-Type": "application/json"};
      headers["Authorization"] = Bearer;
    // return fetch("https://api.github.com/repositories/"+id)
    //   .then(response => response.json());
    return Api.get("/repositories/"+id,headers).then(response => response.json());
  }
  static getCommits(full_name,limit){
    console.log("commits"+full_name)
    let Bearer = "Bearer "+secret;
    let headers = {"Content-Type": "application/json"};
      headers["Authorization"] = Bearer;
    return Api.get("/repos/"+full_name+"/commits?per_page="+limit,headers).then(response => response.json());
  }
  static getContributors(full_name,offset,limit){
    console.log(full_name+" "+offset+"  GitServices");
    let Bearer = "Bearer "+secret;
    let headers = {"Content-Type": "application/json"};
      headers["Authorization"] = Bearer;
    return Api.get("/repos/"+full_name+"/contributors?"+"&per_page="+limit+"&page="+offset,headers).then(response => response.json());
  }
}
