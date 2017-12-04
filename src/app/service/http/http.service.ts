import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpService {

    basicUrl: String;
    constructor(public http: Http) {
      this.basicUrl='http://127.0.0.1:6801';
    }

    public getPapersList(page: string,size: string):Observable<Comment[]>{
    	let headers = new Headers();
        headers.append("Accept", "application/json");
    	let params = new URLSearchParams();
    	params.set('page', page);
    	params.set('size', size);
    	let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(this.basicUrl+'/v1/papers',options)
            .map((res: Response) => res.json())
    }

       public addPaper(author: string,title: string, content: string):Observable<Comment[]>{
       	let body = {
    			'author' : author,
    			'paper': content,
    			'title': title
			};
    	let headers = new Headers();
        headers.append("Accept", "application/json");    
    	let options = new RequestOptions({ headers: headers});
        return this.http.post(this.basicUrl+'/v1/papers',body,options)
            .map((res: Response) => res.json())
    }
}