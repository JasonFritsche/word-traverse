import {
  IHighchartsOptions,
  IHighchartsPackedBubbleSeries,
} from 'src/interfaces/charts';

export class HichchartsOptions implements IHighchartsOptions {
  constructor(seriesData: IHighchartsPackedBubbleSeries) {
    this.series = seriesData;
  }

  chart = {
    type: 'packedbubble',
    height: '100%',
  };

  title = {
    text: 'here i am testing this out',
  };

  tooltip = {
    useHTML: true,
    pointFormat: '<b>{point.name}, {point.value}</b>',
  };

  plotOptions = {
    packedbubble: {
      minSize: '20%',
      maxSize: '90%',
      zMin: 0,
      zMax: 1000,
      layoutAlgorithm: {
        splitSeries: false,
        gravitationalConstant: 0.02,
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        filter: {
          property: 'y',
          operator: '>',
          value: 800,
        },
        style: {
          color: 'black',
          textOutline: 'none',
          fontWeight: 'normal',
        },
      },
    },
  };
  series!: IHighchartsPackedBubbleSeries;
}
