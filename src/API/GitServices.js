import React from 'react';
import Api from './Api';
import {secret} from '../Config';
export default class GitServices {
  static SearchRepositories(name,offset,limit){
    let Bearer = "Bearer "+secret;
    return Api.get("/search/repositories?q="+name+"&per_page="+limit+"&page="+offset,{Authorization: Bearer});
  }
  // static getRepository(full_name) {
  //   let Bearer = "Bearer "+secret;
  //   return Api.get("/repos/"+full_name,Bearer);
  // }
  static getRepository(id) {
    console.log("wtf"+id)
    let Bearer = "Bearer "+secret;
    return Api.get("/repositories/"+id,{Authorization: Bearer});
  }
  static getCommits(full_name,limit){
    let Bearer = "Bearer "+secret;
    return Api.get("/repos/"+full_name+"/commits?per_page="+limit,{Authorization: Bearer});
  }
  static getContributors(full_name,offset,limit){
    let Bearer = "Bearer "+secret;
    return Api.get("/repos/"+full_name+"/contributors?"+"&per_page="+limit+"&page="+offset,{Authorization: Bearer});
  }
}
