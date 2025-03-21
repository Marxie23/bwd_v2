import { METER_READING, SET_METER_READING, SET_METER_READING_DATA, UPDATE_METER_READING } from "./types";

import MeterReadingService from '../services/meterReading.service'

export const createMeterReading = (periodStart, periodEnd, readingDate, presentReading, previousReading, consumption,meterId,customerId, amountDue, amountAfterDue, dueDate,currentUserID) => (dispatch) => {
    return MeterReadingService.createMeterReading(periodStart, periodEnd, readingDate, presentReading, previousReading,consumption, meterId,customerId, amountDue, amountAfterDue, dueDate,currentUserID).then(
        (response) => {
            dispatch({
                type: SET_METER_READING,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const getMeterReadingByDateAndMeterID = (year, month, meterId,currentUserID) => (dispatch) => {
    return MeterReadingService.getMeterReadingByDateAndMeterID(year,month,meterId,currentUserID).then(
        (response) => {
            dispatch({
                type: SET_METER_READING_DATA,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const getMeterReadingByDate = (year, month,currentUserID) => (dispatch) => {
    return MeterReadingService.getMeterReadingByDate(year, month,currentUserID).then(
        (response) => {
            dispatch({
                type: METER_READING,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}

export const updateMeterReadings = (id,periodStart, periodEnd, readingDate, presentReading, previousReading, consumption,meterId,customerId, amountDue, amountAfterDue, dueDate,currentUserID) => (dispatch) => {
    return MeterReadingService.updateMeterReadings(id,periodStart, periodEnd, readingDate, presentReading, previousReading,consumption, meterId,customerId, amountDue, amountAfterDue, dueDate,currentUserID).then(
        (response) => {
            dispatch({
                type: UPDATE_METER_READING,
                payload: response.data
            });
            return response
        },
        (error) => {
            return error
        }
    );
}