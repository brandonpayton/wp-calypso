/**
 * External Dependencies
 */
import React, { PropTypes, Component } from 'react';
import { noop } from 'lodash';
import classNames from 'classnames';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Tooltip from 'components/tooltip';

class DatePickerDay extends Component {
	static propTypes = {
		date: PropTypes.object.isRequired,
		events: PropTypes.array
	};

	static defaultProps = {
		showTooltip: false
	};

	state = {
		showTooltip: false,
	}

	isPastDay( date ) {
		const today = this.props.moment().set( {
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0
		} );

		date = date || this.props.date;
		return ( +today - 1 ) >= +date;
	}

	showTooltip = () => {
		if ( ! this.props.events.length ) {
			return;
		}

		this.setState( { showTooltip: true } );
	}

	hideTooltip = () => {
		this.setState( { showTooltip: false } );
	}

	renderTooltip() {
		if ( ! this.state.showTooltip ) {
			return;
		}

		const label = this.props.translate(
				'%(posts)d post',
				'%(posts)d posts', {
					count: this.props.events.length,
					args: {
						posts: this.props.events.length
					}
				}
			);

		return (
			<Tooltip
				context={ this.refs.dayTarget }
				isVisible={ this.state.showTooltip }
				onClose={ noop }
			>
				<span>{ label }</span>
				<hr className="date-picker__division" />
				<ul>
					{
						this.props.events.map( function( event ) {
							return <li key={ event.id }>{ event.title }</li>;
						} )
					}
				</ul>
			</Tooltip>
		);
	}

	render() {
		const classes = { 'date-picker__day': true };
		let i = 0;
		let dayEvent;

		classes[ 'is-selected' ] = this.props.selected === true;
		classes[ 'past-day' ] = this.isPastDay() === true;

		if ( this.props.events.length ) {
			classes[ 'date-picker__day_event' ] = true;

			for ( i; i < this.props.events.length; i++ ) {
				dayEvent = this.props.events[ i ];

				if ( dayEvent.type &&
					( ! classes[ 'date-picker__day_event_' + dayEvent.type ] ) ) {
					classes[ 'date-picker__day_event_' + dayEvent.type ] = true;
				}
			}
		}

		return (
			<div
				ref="dayTarget"
				className={ classNames( classes ) }
				onMouseEnter={ this.showTooltip }
				onMouseLeave={ this.hideTooltip }
			>
				<span
					key={ 'selected-' + ( this.props.date.getTime() / 1000 | 0 ) }
					className="date-picker__day-selected">
				</span>
				<span className="date-picker__day-text">
					{ this.props.date.getDate() }
				</span>

				{ this.renderTooltip() }
			</div>
		);
	}
}

export default localize( DatePickerDay );

