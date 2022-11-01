export class RegionalLineChartRegion {
  key: string;
  series: Array< RegionalLineChartTime> = [];
  name: string;
  private aggs: { buckets: RegionalLineChartTime[] }
  constructor(data: RegionalLineChartRegion) {
    if (data) {
      this.key = data.key;
      this.name = data.key;
      this.series = data.aggs.buckets.map(b => new RegionalLineChartTime(b));
    }
  }
}

export class RegionalLineChartTime {
  key: number;
  avgRating: number;
  minRating: number;
  maxRating: number;
  name: string;
  value: number;
  private key_as_string: string;
  private min_rating: { value: number };
  private max_rating: { value: number };
  private avg_rating: { value: number };
  constructor(data: RegionalLineChartTime) {
    if (data) {
      this.key = data.key;
      this.maxRating = Math.round(data.max_rating.value);
      this.minRating = Math.round(data.min_rating.value);
      this.avgRating = Math.round(data.avg_rating.value);
      this.name = data.key_as_string;
      this.value = Math.round(data.avg_rating.value);
    }
  }
}