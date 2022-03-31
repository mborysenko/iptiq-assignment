/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Status } from '../models/Status';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Returns list of statuses.
     * @returns Status A list of statuses.
     * @throws ApiError
     */
    public static getStatuses(): CancelablePromise<Array<Status>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/statuses/',
            errors: {
                404: `Statuses haven't been found`,
            },
        });
    }

    /**
     * Creates new doodle.
     * @param data
     * @returns any Doodle that has just been created.
     * @throws ApiError
     */
    public static createDoodle(
        data?: {
            title: string;
            body?: string;
            userId: string;
            categoryId: string;
            statusId: string;
        },
    ): CancelablePromise<{
        id: string;
        name?: string;
        body?: string;
        userId?: string;
        categoryId?: string;
        statusId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/doodle/',
            body: data,
        });
    }

    /**
     * Returns list of doodles by status id.
     * @param statusId
     * @returns any A list of doodles that match the requested status.
     * @throws ApiError
     */
    public static getDoodles(
        statusId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/doodles/{statusId}',
            path: {
                'statusId': statusId,
            },
            errors: {
                404: `Doodle with specified ID hasn't been found`,
            },
        });
    }

    /**
     * Updates doodle by id.
     * @param statusId
     * @param data
     * @returns any A doodle that has been updated.
     * @throws ApiError
     */
    public static updateDoodle(
        statusId: string,
        data?: {
            title?: string;
            body?: string;
            userId?: string;
            categoryId?: string;
            statusId?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/doodle/{doodleId}',
            path: {
                'statusId': statusId,
            },
            body: data,
            errors: {
                404: `Doodle with specified ID hasn't been found`,
            },
        });
    }

    /**
     * Deletes doodle by id.
     * @param doodleId
     * @returns any ID of the doodle that has been deleted.
     * @throws ApiError
     */
    public static deleteDoodle(
        doodleId: string,
    ): CancelablePromise<{
        removed: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/doodle/{doodleId}',
            path: {
                'doodleId': doodleId,
            },
            errors: {
                404: `Doodle with specified ID hasn't been found`,
            },
        });
    }

}