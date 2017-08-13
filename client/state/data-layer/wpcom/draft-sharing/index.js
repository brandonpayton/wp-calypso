/**
 * Internal dependencies
 */
import {
	POST_SHARE_A_DRAFT_REQUEST,
	POST_SHARE_A_DRAFT_ENABLE,
	POST_SHARE_A_DRAFT_DISABLE,
} from 'state/action-types';
import { addDraftSharing, setDraftSharingEnabled } from 'state/draft-sharing/actions';
import { http } from 'state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'state/data-layer/wpcom-http/utils';

function draftSharingPath( siteId, postId ) {
	return `/sites/${ siteId }/posts/${ postId }/draft-sharing`;
}

export const fetchDraftSharing = ( { dispatch }, { siteId, postId } ) => {
	dispatch( http( {
		method: 'GET',
		path: draftSharingPath( siteId, postId )
	} ) );
};
export const fetchDraftSharingSuccess = ( { dispatch }, { siteId, postId }, draftSharing ) => {
	// TODO: Validate response data
	dispatch( addDraftSharing( siteId, postId, draftSharing ) );
};
export const fetchDraftSharingFailure = ( { dispatch }, { siteId, postId } ) => {};

export const enableDraftSharing = ( { dispatch, getState }, { siteId, postId } ) => {
	dispatch( http( {
		method: 'PATCH',
		body: { isEnabled: true }
	} ) );
};
export const enableDraftSharingSuccess = ( { dispatch }, { siteId, postId }, responseData ) => {};
export const enableDraftSharingFailure = ( { dispatch } ) => {};

export const disableDraftSharing = ( { dispatch }, { siteId, postId } ) => {
	dispatch( http( {
		method: 'PATCH',
		body: { isEnabled: false }
	} ) );
};
export const disableDraftSharingSuccess = ( { dispatch }, { siteId, postId }, responseData ) => {};
export const disableDraftSharingFailure = ( { dispatch } ) => {};

export default {
	[ POST_SHARE_A_DRAFT_REQUEST ]: [
		dispatchRequest( fetchDraftSharing, fetchDraftSharingSuccess, fetchDraftSharingFailure ),
	],
	[ POST_SHARE_A_DRAFT_ENABLE ]: [
		dispatchRequest( enableDraftSharing, enableDraftSharingSuccess, enableDraftSharingFailure ),
	],
	[ POST_SHARE_A_DRAFT_DISABLE ]: [
		dispatchRequest( disableDraftSharing, disableDraftSharingSuccess, disableDraftSharingFailure ),
	],
};
