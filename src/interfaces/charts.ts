export interface IHighchartsOptions {
  chart: {
    type: string;
    height: string | number;
  };
  title: {
    text: string;
  };
  plotOptions: {
    packedbubble: {
      minSize: string | number;
      maxSize: string | number;
      zMin: number;
      zMax: number;
      cursor: string;
      layoutAlgorithm: {
        splitSeries: boolean;
        gravitationalConstant: number;
      };
      dataLabels: {
        enabled: boolean;
        format: string;
        filter: {
          property: string;
          operator: string;
          value: number;
        };
        style: {
          color: string;
          textOutline: string;
          fontWeight: string;
        };
      };
    };
  };
  series: IHighchartsPackedBubbleSeries;
}

export interface IHighchartsPackedBubbleSeriesValue {
  name: string;
  value: number;
}

export interface IHighchartsPackedBubbleSeries {
  data: IHighchartsPackedBubbleSeriesValue[];
}
