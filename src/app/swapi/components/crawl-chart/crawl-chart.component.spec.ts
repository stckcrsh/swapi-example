import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlChartComponent } from './crawl-chart.component';

describe('CrawlChartComponent', () => {
  let component: CrawlChartComponent;
  let fixture: ComponentFixture<CrawlChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
