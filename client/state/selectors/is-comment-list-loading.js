/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Returns true if we are currently loading site comments.
 *
 * @param  {Object}  state       Global state tree
 * @param  {Number}  siteId      The ID of the site we're querying
 * @param  {String}  status      The comment status
 * @return {?Boolean}            Whether Jumpstart is currently being deactivated
 */
export default function isCommentListLoading( state, siteId, status = 'unapproved' ) {
	return get( state, [ 'comments', 'isCommentListLoading', `${ siteId }-${ status }` ], false );
}
