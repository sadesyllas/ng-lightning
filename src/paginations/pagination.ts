import {Component, EventEmitter, Input, Output, OnChanges, ChangeDetectionStrategy} from 'angular2/core';

@Component({
  selector: 'ngl-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="slds-button-group" role="group">
      <button class="slds-button slds-button--neutral" [disabled]="!hasPrevious()" (click)="goto(current - 1)">Previous</button>
      <button *ngFor="#pageNumber of pages" class="slds-button slds-button--neutral" [class.slds-button--brand]="pageNumber === current" (click)="goto(pageNumber)">
          {{pageNumber}}
      </button>
      <button class="slds-button slds-button--neutral" [disabled]="!hasNext()" (click)="goto(current + 1)">Next</button>
    </div>
  `,
})
export class NglPagination implements OnChanges {

  pages: number[] = [];

  @Input('page') current: number | string;
  @Output() pageChange = new EventEmitter();

  @Input() total: number | string;
  @Input() perPage: number | string = 10;
  @Input() limit: number | string = 0;

  private totalPages: number;

  hasPrevious() {
    return this.current > 1;
  }

  hasNext() {
    return this.current < this.totalPages;
  }

  goto(page: number) {
    if (page === this.current) return;

    this.current = page;
    this.pageChange.emit(this.current);
  }

  ngOnChanges() {
    this.totalPages = Math.ceil(+this.total / +this.perPage);

    const { start, end } = this.limits();

    this.pages = Array.apply(null, {length: end - start + 1}).map((value: any, index: number) => start + index);

    if (this.current > this.totalPages) {
      this.goto(this.totalPages);
    } else if (!this.current && this.totalPages > 0) {
      this.goto(1);
    }
  }

  /**
   * Calculate first and last visible page numbers
   */
  private limits() {
    let start = 1, end = this.totalPages;

    if (this.limit < 1) return {start, end};

    // Current page is displayed in the middle of the visible ones
    start = Math.max(+this.current - Math.floor(+this.limit / 2), 1);
    end = start + +this.limit - 1;

    // Adjust if limit is exceeded
    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(end - +this.limit + 1, 1);
    }

    return {start, end};
  }

}
