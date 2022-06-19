import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private formUrl = 'https://formspree.io/f/xbjwbbll';
  private headers = new HttpHeaders({ 'content-type': 'application/json' })

  constructor(private httpClient: HttpClient) { }

  /**
   * Post method to send the form data to the email we set in formspree
   * @param contact form data to be process
   */
  sendEmail(contact: any): Observable<any> {

    let url = "http://formspree.io/my@email.com";

    // RIGHT
    const data = {
      name: contact.name,
      email: contact.email,
      message: contact.message
    }

    return this.httpClient.post(url, data, {

    })
    
  }

  private handleError<T>(operation = 'operation', result?: T){
    return(error: any): Observable<T> =>{
      //We can stream this log to an platform like CloudWatch
      console.error(error);
  
      //Let our app keep running
      return of(result as T);
    }
  }
}
