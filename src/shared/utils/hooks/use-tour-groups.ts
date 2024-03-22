import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { ToursService } from 'shared/services/tours-service';
import {GetTourGroupsParams} from "shared/utils/types";

export const useTourGroups = (params: GetTourGroupsParams) => {
    return useQuery(
        [endpoints.tourGroup, params],
        async () => {
            const response = await ToursService.getTourGroups(params);
            return response.data;
        },
        {
            enabled: false,
        },
    );
};