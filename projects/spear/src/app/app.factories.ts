import { CrudAdaptorPlugin, CrudAdaptorPluginManager, CrudCollectionOperationInput, CrudOperationInput, CrudOperationResponse } from "@rollthecloudinc/crud"
import { map, of, switchMap } from 'rxjs';
import { RegionalLineChartRegion } from "./models/regional-line-chart";

export const gridCarbonIntensitiesByRegionCrudAdaptorPluginFactory = (manager: CrudAdaptorPluginManager) => {
  return new CrudAdaptorPlugin<string>({
    id: "grid_carbon_intensities_by_region",
    title: "grid_carbon_intensities_by_region",
    create: ({ object, identity, params, parentObject }: CrudOperationInput) => of({ success: false }),
    update: ({ object, identity, params, parentObject }: CrudOperationInput) => of({ success: false }),
    delete: ({ }: CrudOperationInput) => of<CrudOperationResponse>({ success: false }),
    read: ({ }: CrudOperationInput) => of<CrudOperationResponse>({ success: false }),
    query: ({ rule, params }: CrudCollectionOperationInput) => of({ entities: [], success: false }).pipe(
      switchMap(() =>  manager.getPlugin('aws_opensearch_template')),
      switchMap(p => p.query({ rule, params, identity: undefined })),
      map(({ entities }) => ({ entities: entities[0].aggregations.regions.buckets.map(b => new RegionalLineChartRegion(b)), success: true }))
    )
  });
};