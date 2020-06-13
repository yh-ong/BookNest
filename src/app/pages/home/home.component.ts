import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Search } from 'src/app/models/search';
import { expand } from '../../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ expand() ]
})
export class HomeComponent implements OnInit {

  items: any;
  searchGroup: FormGroup;
  search: Search;

  formErrors = {
    'author': '',
    'isbn': '',
  };
  validationMessages = {
    'author': {
      'pattern': 'Only alphabet are allowed',
    },
    'isbn': {
      'pattern': 'Only number are allowed',
      'maxlength': 'ISBN cannot be more than 13 characters long.'
    }
  };

  constructor(private bookService: BookService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bookService.getBook().subscribe(res => {
      this.items = res['items'];
    });

    this.searchForm();
  }

  searchForm() {
    this.searchGroup = this.formBuilder.group({
      author: [null, Validators.pattern("^[a-zA-Z]*$") ], 
      title: [null, Validators.pattern("^[a-zA-Z]*$") ],
      isbn: [null, [Validators.pattern("^[0-9]*$"), Validators.maxLength(13)] ]
    });

    this.searchGroup.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  searchBook() {
    this.search = this.searchGroup.value;
    let author = this.search.author;
    let title = this.search.title;
    let isbn = this.search.isbn;

    if (author != null || title != null || isbn != null) {
      author = null ? '' : author;
      title = null ? '' : title;
      isbn = null ? '' : isbn;

      this.bookService.getBookSearch(author, title, isbn).subscribe(res => {
        this.items = res['items'];
      }, err => {
        console.log("Failed", err);
      });
    }
  }

  onValueChanged(data?: any) {
    if (!this.searchGroup) { return; }
    const form = this.searchGroup;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
