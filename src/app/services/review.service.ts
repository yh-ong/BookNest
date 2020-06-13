import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Review } from '../models/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  serverURL: string = "http://localhost:3000/";

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  saveReview(review: Review): Observable<Review> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Review>(this.serverURL + "review", review, httpOptions);
  }

  appendReview(id: string, review: Review) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Review>(this.serverURL + "review/" + id, review, httpOptions);
  }

  getReview(id: String) {
    return this.http.get<Review>(this.serverURL + "review/" + id);
  }

  createReview(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
      .collection("")
      .add(data)
      .then(res => {}, err => reject(err))
    });
  }
}
