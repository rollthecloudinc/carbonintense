import { CrudEntityMetadataMap } from '@rollthecloudinc/crud';
import { PanelsSettings } from '@rollthecloudinc/panels';
import { RegionalLineChartRegion } from './models/regional-line-chart';

export const entityMetadataFactory = (panelsSettings: PanelsSettings): CrudEntityMetadataMap => {
  return {
    RegionalLineChartRegion: {
      selectId: (m: RegionalLineChartRegion) => m.key,
      entityName: ' RegionalLineChartRegion',
      crud: {
        grid_carbon_intensities_by_region: {
          ops: ['query'],
          params: {
            id: 'energy_grid_carbon_intensities_by_region_search_template',
            index: 'energy-grid-carbon-intensity-001',
            hits: false,
            source: false,
            domain: panelsSettings.openSearchDomain,
            region: 'us-east-1'
          }
        }
      }
    }
  }
};