import { Component, OnInit } from '@angular/core';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { Bookmark } from '../../models/bookmark';
import { expand } from '../../animations/app.animation';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
  animations: [ expand() ]
})
export class BookmarkComponent implements OnInit {

  bookmarkItems: any;

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    this.getBookmarkList();
  }

  getBookmarkList() {
    /* this.bookmarkService.getBookmark().subscribe(res => {
      this.bookmarkItems = res;
      console.log(res);
    }, err => {
      console.log(err);
    }); */
    this.bookmarkService.displayBookmark()
    .subscribe(res => {
      this.bookmarkItems = res.map(e => {
        return {
          id: e.payload.doc.id,
          bookID: e.payload.doc.data()['bookID'],
          bookTitle: e.payload.doc.data()['bookTitle'],
          bookSubtitle: e.payload.doc.data()['bookSubtitle'],
          bookImage: e.payload.doc.data()['bookImage'],
        };
      })
    }, err => {
      console.log(err);
    });
  }

  removeBookmark(id: string) {
    // this.bookmarkService.removeBookmark(id).subscribe(res => {
    //   this.getBookmarkList();
    // }, err => {
    //   console.log("failed");
    // })

    this.bookmarkService.delBookmark(id);
  }

}
