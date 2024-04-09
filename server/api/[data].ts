import { MetricsData, MonitorData, StatsData, TimeData, TopEvData } from "~/utils/datas";
import { DataTypes } from "~/utils/enums";

export default defineEventHandler((event) => {
    const dataType = getRouterParam(event, 'data');
    let dataCount = event.req.headers['api-data-count'];
    if(dataType === DataTypes.metrics || dataType === DataTypes.monitor || dataType === DataTypes.stats || dataType === DataTypes.topevents || dataType === DataTypes.time) {
        let dataIs;

        switch (dataType) {
            case DataTypes.metrics:
                dataIs = MetricsData;
                break;
                
            case DataTypes.monitor:
                dataIs = MonitorData;
                break;
            
            case DataTypes.stats:
                dataIs = StatsData;
                break;
            
            case DataTypes.topevents:
                dataIs = TopEvData;
                break;

            case DataTypes.time:
                dataIs = TimeData;
                break;
        
            default:
                dataIs = StatsData;
                break;
        }

        if(!!dataCount && Array.isArray(dataIs) && dataIs.length && parseInt(String(dataCount)) < dataIs.length) {
            dataIs = dataIs.slice(0,  parseInt(String(dataCount)));
        }

        return dataIs;
        
    } else {
        event.res.statusCode = 404;
        return {
            error: true,
            message: 'Endpoint not found',
          }
    }
  })