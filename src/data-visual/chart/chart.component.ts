import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';
more(Highcharts);

import { IHighchartsOptions } from 'src/interfaces/charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() options!: IHighchartsOptions;

  @Output() onBubbleClick = new EventEmitter<string>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'].currentValue) {
      const options = changes['options'].currentValue;
      const newChartOptions: Highcharts.Options = {
        title: options.title,
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            data: options.series.data,
            type: 'packedbubble',
            label: {
              enabled: false,
            },
          },
        ],
        plotOptions: {
          packedbubble: {
            ...options.plotOptions.packedbubble,
            events: {
              click: (e: any) => {
                this.onBubbleClick.emit(e.point.name);
              },
            },
          },
        },
        tooltip: {
          formatter: function () {
            return `${this.key}`;
          },
          shared: true,
        },
      };
      this.chartOptions = newChartOptions;
    }
  }

  ngOnInit(): void {}
}
