/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */

 // Concept
 // The address component accepts via a prop the initial address (as a blob)
 // that it should display
 //
 // The address component also accepts as a prop a list of allowed Countries
 // and an optional message to display below the country selector
 //
 // The address component also accepts a flag of whether to have a name
 // field too and the label for it. If given, it will be the first field
 // displayed, before the street address field
 //
 // The component also accepts an onFocus that fires each time the
 // user moves into a different field. The onFocus includes the
 // entire address as a blob (not just the changed field)
 //
 // The component also accepts an onChange that fires as the user
 // edits the fields. The onChange includes the entire address
 // as a blob.

class AddressView extends Component {
	static propTypes = {
		address: PropTypes.shape( {
			name: PropTypes.string.isRequired,
			street: PropTypes.string.isRequired,
			street2: PropTypes.string,
			city: PropTypes.string.isRequired,
			state: PropTypes.string,
			country: PropTypes.string.isRequired,
			postcode: PropTypes.string,
		} ),
		allowedCountries: PropTypes.arrayOf( PropTypes.string ),
		isEditable: PropTypes.bool,
		nameLabel: PropTypes.string,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
	};

	constructor( props ) {
		super( props );
	}

	edit() {
		//TODO: Add edit functionality
		return false;
	}

	renderEditable = () => {

	}

	renderStatic = () => {
		const { name, street, street2, city, state, postcode, country } = this.props.address;
		return (
			<div>
				<div className="address-view__address address-view__address-static">
					<p className="address-view__address-name">
						{ name }
					</p>
					<p>
						{ street }
					</p>
					( street2 && <p>{ street2 }</p> )
					<p>
						{ city }
						( state && { state } )
						( postcode && { postcode } )
					</p>
					<p>
						{ country }
					</p>
				</div>
			</div>
		);
	}

	render = () => {
		return (
			<div>
				<div className="address-view__address">
					<p className="address-view__address-name">
						{ this.props.address.name }
					</p>
					<p>{ this.props.address.street }</p>
					<p>{ this.props.address.city }</p>
					<p>{ this.props.address.country }</p>
				</div>
			</div>
		);
	}
}

export default AddressView;
