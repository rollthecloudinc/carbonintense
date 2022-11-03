import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EntityCollectionService, EntityServices } from "@ngrx/data";
import { filter, map, Observable, tap } from "rxjs";
import { RegionalLineChartRegion } from "../../models/regional-line-chart";
@Component({
  selector: "rtc-ci-regional-grid-chart",
  styleUrls: [ "regional-line-chart.scss" ],
  templateUrl: "regional-line-chart.html"
})
export class RegionalLineChartComponent implements OnInit {

  private regionsService: EntityCollectionService<RegionalLineChartRegion>;

  multi: any[];
  view = undefined;

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Rating';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  regions$: Observable<Array<RegionalLineChartRegion>>;

  constructor(
    private route: ActivatedRoute,
    es: EntityServices
  ) {
    this.regionsService = es.getEntityCollectionService('RegionalLineChartRegion');
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(p => p.get('date')),
      filter(dt => dt !== undefined),
      tap(value => {
        const startDate = { value: /*'2022-10-30'*/ `${value}T00:00:00.000Z` };
        const endDate = { value: /*'2022-10-30'*/ `${value}T23:59:59.000Z` };
        // NOTE: open search adaptor expects json value
        const qs = `start_date=${JSON.stringify(startDate)}&end_date=${JSON.stringify(endDate)}`;
        this.regions$ = this.regionsService.getWithQuery(qs).pipe(
          tap(regions => console.log('region entities', regions))
        );
      })
    ).subscribe();
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}