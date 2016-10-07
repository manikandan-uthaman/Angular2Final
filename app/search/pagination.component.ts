import {Component, Input, Output, EventEmitter} from '@angular/core';
import {OnChanges} from '@angular/core';

@Component({
	selector: 'pagination',
    template: `
    <nav>
        <ul class="pagination">
            <li [class.disabled]="currentPage == 1" class="pagination_link">
                <a (click)="previous()" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li [class.active]="currentPage == page" class="pagination_link" *ngFor="#page of pages" (click)="changePage(page)">
                <a>{{ page }}</a>
            </li>
            <li [class.disabled]="currentPage == pages.length" class="pagination_link">
                <a (click)="next()" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>  
`
})
export class PaginationComponent implements OnChanges {
    @Input() items = [];
	@Input('page-size') pageSize = 10;
    @Input() resultsCount = 0;
    @Input() currentPage=1; 
	@Output('page-changed') pageChanged = new EventEmitter();
	pages: any[];

	ngOnChanges(){
        // this.currentPage = 1;
		var pagesCount = Math.ceil(this.resultsCount / this.pageSize); 
		this.pages = [];
		for (var i = 1; i <= pagesCount; i++)
			this.pages.push(i);
	}

	changePage(page){
		this.currentPage = page; 
		this.pageChanged.emit(page);
	}

	previous(){
		if (this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	next(){
		if (this.currentPage == this.pages.length)
			return; 
		
		this.currentPage++;
        console.log("Inside Next: " + this.currentPage);
		this.pageChanged.emit(this.currentPage);
	}
} 