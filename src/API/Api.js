import React from 'react';
import {RootUrl} from '../Config';
import axios from 'axios';
export default class Api {
  static Url = RootUrl;


  static getUrl()
  {
    return this.Url;
  }
  static get(url,prams)
  {
    return axios.get(this.Url+url, { headers: prams });
  }
  static post(url,data,headers)
  {
    return axios.post(this.Url+url, data,{ headers: headers });
  }
  static delete(url,id,headers)
  {
    return axios.delete(this.Url+url,{params: {id: id}},{ headers: headers });
  }
  static put(url,data,headers)
  {
    return axios.put(this.Url+url, data,{ headers: headers });
  }

}
