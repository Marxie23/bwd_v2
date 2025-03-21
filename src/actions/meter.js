import { SET_METER } from "./types";

import MeterService from '../services/meter.service'

export const getMeter = (currentUserID) => (dispatch) => {
    return MeterService.getMeter(currentUserID).then(
        (response) => {
            dispatch({
                type: SET_METER,
                payload: response.data.meter
            });
            return response.data
        },
        (error) => {
            return error
        }
    );
}