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
import { ITheme } from 'src/interfaces/theme';

@Component({
  selector: 'app-chart',
  template: `
    <highcharts-chart
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      (chartInstance)="onChartInstance($event)"
      style="width: 100%; height: 100%; display: block"
    ></highcharts-chart>
  `,
})
export class ChartComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() options!: IHighchartsOptions;
  @Input() theme!: ITheme;

  @Output() onBubbleClick = new EventEmitter<string>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  chart!: Highcharts.Chart;

  onChartInstance(chart: Highcharts.Chart) {
    this.chart = chart;
    this.updateChartBackground();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['theme']?.currentValue && this.chart) {
      this.updateChartBackground();
    }
    if (changes['options']?.currentValue) {
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
          headerFormat: '',
          pointFormatter: function () {
            return `${this.name}`;
          },
          shared: true,
        },
      };
      this.chartOptions = newChartOptions;
    }
  }

  ngOnInit(): void {}

  private updateChartBackground() {
    this.chart.update({
      chart: {
        backgroundColor: this.theme.background,
      },
      plotOptions: {
        packedbubble: {
          color: this.theme.secondary,
          dataLabels: {
            color: this.theme.bubbleTextColor,
          },
        },
      },
    });
  }
}
