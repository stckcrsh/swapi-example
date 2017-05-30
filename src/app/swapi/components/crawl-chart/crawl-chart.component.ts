import { Renderer2, ElementRef } from '@angular/core';
import { Component, AfterViewChecked, Input, OnDestroy, OnInit } from '@angular/core';

import * as c3 from 'c3';

@Component({
	selector: 'sw-crawl-chart',
	templateUrl: './crawl-chart.component.html',
	styleUrls: ['./crawl-chart.component.scss']
})
export class CrawlChartComponent implements AfterViewChecked, OnDestroy, OnInit {

	@Input()
	public set data(value: any) {
		this.chart.load(value);

		this.chart.flush();
	}

	public chart: any;

	constructor(private renderer: Renderer2, private elRef: ElementRef) {
		this.chart = c3.generate({
			data: {
				columns: [],
				type: 'bar'
			},
			bar: {
				width: {
					ratio: 0.5
				}
			}
		});
	}

	public ngOnInit() {
		this.renderer.appendChild(this.elRef.nativeElement, this.chart.element);
	}

	public ngAfterViewChecked() {
		this.chart.flush();
	}

	public ngOnDestroy() {
		this.renderer.removeChild(this.elRef.nativeElement, this.chart.element);
	}

}
