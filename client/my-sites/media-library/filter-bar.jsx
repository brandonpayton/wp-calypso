/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import {
	includes,
	noop,
	identity
} from 'lodash';

/**
 * Internal dependencies
 */
import SectionNav from 'components/section-nav';
import SectionNavTabs from 'components/section-nav/tabs';
import Search from 'components/search';
import TrackComponentView from 'lib/analytics/track-component-view';
import PlanStorage from 'blocks/plan-storage';
import FilterItem from './filter-item';
import TitleItem from './title-item';

export class MediaLibraryFilterBar extends Component {
	static propTypes = {
		basePath: React.PropTypes.string,
		enabledFilters: React.PropTypes.arrayOf( React.PropTypes.string ),
		filter: React.PropTypes.string,
		filterRequiresUpgrade: React.PropTypes.bool,
		search: React.PropTypes.string,
		source: React.PropTypes.string,
		site: React.PropTypes.object,
		onFilterChange: React.PropTypes.func,
		onSearch: React.PropTypes.func,
		translate: React.PropTypes.func
	};

	static defaultProps ={
		filter: '',
		basePath: '/media',
		onFilterChange: noop,
		onSearch: noop,
		translate: identity,
		source: '',
	};

	getSearchPlaceholderText() {
		const { filter, translate } = this.props;
		switch ( filter ) {
			case 'images':
				return translate( 'Search images…' );
			case 'audio':
				return translate( 'Search audio files…' );
			case 'videos':
				return translate( 'Search videos…' );
			case 'documents':
				return translate( 'Search documents…' );
			default:
				return translate( 'Search all media…' );
		}
	}

	getFilterLabel( filter ) {
		const { translate } = this.props;

		switch ( filter ) {
			case 'images':
				return translate( 'Images', { comment: 'Filter label for media list' } );
			case 'audio':
				return translate( 'Audio', { comment: 'Filter label for media list' } );
			case 'videos':
				return translate( 'Videos', { comment: 'Filter label for media list' } );
			case 'documents':
				return translate( 'Documents', { comment: 'Filter label for media list' } );
			default:
				return translate( 'All', { comment: 'Filter label for media list' } );
		}
	}

	isFilterDisabled( filter ) {
		const { enabledFilters } = this.props;
		return enabledFilters && ( ! filter.length || ! includes( enabledFilters, filter ) );
	}

	changeFilter = filter => {
		this.props.onFilterChange( filter );
	};

	renderSectionTitle() {
		const { translate } = this.props;

		if ( this.props.source === 'google_photos' ) {
			return <TitleItem>{ translate( 'Photos from Google' ) }</TitleItem>;
		}

		return null;
	}

	renderTabItems() {
		if ( this.props.source !== '' ) {
			return null;
		}

		const tabs = [ '', 'images', 'documents', 'videos', 'audio' ];

		return (
			<SectionNavTabs>
				{
					tabs.map( filter =>
						<FilterItem
							key={ 'filter-tab-' + filter }
							value={ filter }
							selected={ this.props.filter === filter }
							onChange={ this.changeFilter }
							disabled={ this.isFilterDisabled( filter ) }
						>
							{ this.getFilterLabel( filter ) }
						</FilterItem>
					)
				}
			</SectionNavTabs>
		);
	}

	renderSearchSection() {
		if ( this.props.filterRequiresUpgrade ) {
			return null;
		}

		return (
			<Search
				analyticsGroup="Media"
				pinned
				fitsContainer
				onSearch={ this.props.onSearch }
				initialValue={ this.props.search }
				placeholder={ this.getSearchPlaceholderText() }
				delaySearch={ true } />
		);
	}

	renderPlanStorage() {
		const eventName = 'calypso_upgrade_nudge_impression';
		const eventProperties = { cta_name: 'plan-media-storage' };
		return (
			<PlanStorage siteId={ this.props.site.ID }>
				<TrackComponentView eventName={ eventName } eventProperties={ eventProperties } />
			</PlanStorage>
		);
	}

	render() {
		return (
			<div className="media-library__filter-bar">
				<SectionNav selectedText={ this.getFilterLabel( this.props.filter ) } hasSearch={ true }>
					{ this.renderSectionTitle() }
					{ this.renderTabItems() }
					{ this.renderSearchSection() }
				</SectionNav>

				{ this.renderPlanStorage() }
			</div>
		);
	}
}

export default localize( MediaLibraryFilterBar );
