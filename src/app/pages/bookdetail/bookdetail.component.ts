import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { Book } from '../../models/book';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.scss']
})
export class BookdetailComponent implements OnInit {

  bookItem: any;
  hideMessage: boolean = true;
  bookSaleLink: boolean = true;
  bookDescription: Text;
  bookmarkItem: any;
  commentItem: any;
  commentBookExist: boolean = false;
  inputComment: string;

  constructor(private route: ActivatedRoute, private bookService: BookService, private bookmarkService: BookmarkService, private reviewService: ReviewService ) { }

  ngOnInit(): void {
    this.getBookItem();
  }

  getBookItem() {
    this.route.params.subscribe(params => {
      this.bookService.getBookID(params['id']).subscribe(res => {
        this.bookItem = res;

        // this.getComment(this.bookItem.id);
        console.log(res);
        this.bookDescription = res.volumeInfo.description;

        this.bookmarkItem = {
          bookID: this.bookItem.id,
          bookTitle: this.bookItem.volumeInfo.title,
          bookSubtitle: this.bookItem.volumeInfo.subtitle,
          bookImage: this.bookItem.volumeInfo.imageLinks.thumbnail
        }
      });
    });
  }

  onSave() {
    /* this.bookmarkService.getBookmarkID(this.bookmarkItem.bookID).subscribe(res => {
      if (res.bookID == this.bookmarkItem.bookID) {
        console.log("Book existed");
      } else {
        this.bookmarkService.saveBookmark(this.bookmarkItem).subscribe(res => {
          this.hideMessage = false;
          setTimeout(() => {
            this.hideMessage = true;
          }, 2000);
        }, err => {
          console.log(err);
        });
      }
    }, err => {
      console.log("Failed");
    }); */

    if (this.bookmarkItem.bookSubtitle == null) {
      this.bookmarkItem.bookSubtitle = null;
    }

    this.bookmarkService.addBookmark(this.bookmarkItem)
    .then(res => {
      this.hideMessage = false;
      setTimeout(() => {
        this.hideMessage = true;
      }, 2000);
    }).catch(err => {
      console.log(err);
    });
  }

  postComment() {
    this.commentItem = {
      id: this.bookItem.id,
      comments: [
        {
          comment: this.inputComment,
          rate: '',
          date: new Date().toISOString()
        }
      ]
    };

    if (this.commentBookExist) {
      this.reviewService.appendReview(this.bookItem.id, this.commentItem);
    } else {
      this.reviewService.saveReview(this.commentItem).subscribe(res => {
        console.log("success");
      }, err => {
        console.log("failed", err);
      });
    }
  }

  getComment(id : string) {
    this.reviewService.getReview(id).subscribe(res => {
      this.commentItem = res.comments;
      this.commentBookExist = true;
    });
  }

  dateDiff(postedDate) {
    let endDate = new Date().getTime();
    let purchaseDate = new Date(postedDate).getTime();
    let diffMs = (purchaseDate - endDate); // milliseconds
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    return diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes";
  }

}
