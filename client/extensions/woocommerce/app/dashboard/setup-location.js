/**
 * External dependencies
 */
import { localize } from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';

/**
 * Internal dependencies
 */
import BusinessAddress from 'woocommerce/components/business-address';

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

class SetupLocation extends Component {
	static propTypes = {
		site: PropTypes.shape( {
			ID: PropTypes.number.isRequired,
		} ),
	};

	state = {
		businessAddress: {
			name: '',
			address: '',
			address2: '',
			city: '',
			state: '',
			countryCode: '',
			postalcode: '',
			allowedCountries: [ ],
		}
	}

	onFocus = ( /* event */ ) => {
	}

	render = () => {
		return (
			<div className="dashboard__setup-location">
				<BusinessAddress
					onChange={ this.onChange }
					onFocus={ this.onFocus }
					value={ this.state.businessAddress }
				/>
			</div>
		);
	}
}

export default localize( SetupLocation );
