/**
 * External dependencies
 */
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import ExternalLink from 'components/external-link';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormRadio from 'components/forms/form-radio';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import FormTextInput from 'components/forms/form-text-input';
import FormToggle from 'components/forms/form-toggle/compact';
import SectionHeader from 'components/section-header';

class JobListings extends Component {
	state = {
		job_manager_category_filter_type: 'any',
		job_manager_date_format: 'relative',
		job_manager_enable_categories: false,
		job_manager_enable_default_category_multiselect: false,
		job_manager_enable_types: true,
		job_manager_google_maps_api_key: '',
		job_manager_hide_expired: true,
		job_manager_hide_expired_content: true,
		job_manager_hide_filled_positions: false,
		job_manager_multi_job_type: false,
		job_manager_per_page: 10,
	};

	updateRadio = name => event => this.setState( { [ name ]: event.target.value } );

	updateTextInput = name => event => this.setState( { [ name ]: event.target.value } );

	updateToggle = name => () => this.setState( { [ name ]: ! this.state[ name ] } );

	render() {
		const { translate } = this.props;
		const {
			job_manager_category_filter_type,
			job_manager_date_format,
			job_manager_enable_categories,
			job_manager_enable_default_category_multiselect,
			job_manager_enable_types,
			job_manager_google_maps_api_key,
			job_manager_hide_expired,
			job_manager_hide_expired_content,
			job_manager_hide_filled_positions,
			job_manager_multi_job_type,
			job_manager_per_page,
		} = this.state;

		return (
			<div>
				<SectionHeader label={ translate( 'Listings' ) }>
					<Button compact primary>
						{ translate( 'Save Settings' ) }
					</Button>
				</SectionHeader>
				<Card>
					<form>
						<FormFieldset>
							<FormLabel htmlFor="job_manager_per_page">
								{ translate( 'Listings Per Page' ) }
							</FormLabel>
							<FormTextInput
								id="job_manager_per_page"
								min="0"
								onChange={ this.updateTextInput( 'job_manager_per_page' ) }
								step="1"
								type="number"
								value={ job_manager_per_page } />
							<FormSettingExplanation>
								{ translate( 'How many listings should be shown per page by default.' ) }
							</FormSettingExplanation>
						</FormFieldset>

						<FormFieldset>
							<FormToggle
								checked={ job_manager_hide_filled_positions }
								onChange={ this.updateToggle( 'job_manager_hide_filled_positions' ) }>
								{ translate( 'Hide filled positions' ) }
							</FormToggle>
							<FormSettingExplanation isIndented>
								{ translate( 'If enabled, filled positions will be hidden from archives.' ) }
							</FormSettingExplanation>

							<FormToggle
								checked={ job_manager_hide_expired }
								onChange={ this.updateToggle( 'job_manager_hide_expired' ) }>
								{ translate( 'Hide expired listings in job archive/search' ) }
							</FormToggle>
							<FormSettingExplanation isIndented>
								{ translate( 'If enabled, expired job listing is not searchable.' ) }
							</FormSettingExplanation>

							<FormToggle
								checked={ job_manager_hide_expired_content }
								onChange={ this.updateToggle( 'job_manager_hide_expired_content' ) }>
								{ translate( 'Hide expired listing content in single job listing (singular)' ) }
							</FormToggle>
							<FormSettingExplanation isIndented>
								{ translate( 'If enabled, the content within expired listings will be hidden. ' +
									'Otherwise, expired listings will be displayed as normal (without the application area).' ) }
							</FormSettingExplanation>
						</FormFieldset>
					</form>
				</Card>

				<SectionHeader label={ translate( 'Categories' ) }>
					<Button compact primary>
						{ translate( 'Save Settings' ) }
					</Button>
				</SectionHeader>
				<Card>
					<form>
						<FormFieldset>
							<FormToggle
								checked={ job_manager_enable_categories }
								onChange={ this.updateToggle( 'job_manager_enable_categories' ) }>
								{ translate( 'Enable categories for listings' ) }
							</FormToggle>
							<FormSettingExplanation isIndented>
								{ translate( 'Choose whether to enable categories. Categories must be setup by an ' +
									'admin to allow users to choose them during submission.' ) }
							</FormSettingExplanation>

							<FormToggle
								checked={ job_manager_enable_default_category_multiselect }
								onChange={ this.updateToggle( 'job_manager_enable_default_category_multiselect' ) }>
								{ translate( 'Enable category multiselect by default' ) }
							</FormToggle>
							<FormSettingExplanation isIndented>
								{ translate( 'If enabled, the category select box will default to a multiselect ' +
									'on the [jobs] shortcode.' ) }
							</FormSettingExplanation>
						</FormFieldset>

						<FormFieldset>
							<FormLabel>
								{ translate( 'Category Filter Type' ) }
							</FormLabel>
							<FormLabel>
								<FormRadio
									checked={ 'any' === job_manager_category_filter_type }
									name="job_manager_category_filter_type"
									onChange={ this.updateRadio( 'job_manager_category_filter_type' ) }
									value="any" />
								<span>
									{ translate( 'Jobs will be shown if within ANY selected category' ) }
								</span>
							</FormLabel>

							<FormLabel>
								<FormRadio
									checked={ 'all' === job_manager_category_filter_type }
									name="job_manager_category_filter_type"
									onChange={ this.updateRadio( 'job_manager_category_filter_type' ) }
									value="all" />
								<span>
									{ translate( 'Jobs will be shown if within ALL selected categories' ) }
								</span>
							</FormLabel>
							<FormSettingExplanation>
								{ translate( 'Determines the logic used to display jobs when selecting multiple categories.' ) }
							</FormSettingExplanation>
						</FormFieldset>
					</form>
				</Card>

				<SectionHeader label={ translate( 'Types' ) }></SectionHeader>
				<Card>
					<form>
						<FormFieldset>
							<FormToggle
								checked={ job_manager_enable_types }
								onChange={ this.updateToggle( 'job_manager_enable_types' ) }>
								{ translate( 'Enable types for listings' ) }
							</FormToggle>
							<FormSettingExplanation isIndented>
								{ translate( 'Choose whether to enable types. Types must be setup by an admin to ' +
									'allow users to choose them during submission.' ) }
							</FormSettingExplanation>

							<FormToggle
								checked={ job_manager_multi_job_type }
								onChange={ this.updateToggle( 'job_manager_multi_job_type' ) }>
								{ translate( 'Enable multiple types for listings' ) }
							</FormToggle>
							<FormSettingExplanation isIndented>
								{ translate( 'If enabled each job can have more than one type. The metabox on the ' +
									'post editor and the select box on the frontend job submission form are changed by this.' ) }
							</FormSettingExplanation>
						</FormFieldset>
					</form>
				</Card>

				<SectionHeader label={ translate( 'Date Format' ) }>
					<Button compact primary>
						{ translate( 'Save Settings' ) }
					</Button>
				</SectionHeader>
				<Card>
					<form>
						<FormFieldset>
							<FormLabel>
								<FormRadio
									checked={ 'relative' === job_manager_date_format }
									name="job_manager_date_format"
									onChange={ this.updateRadio( 'job_manager_date_format' ) }
									value="relative" />
								<span>
									{ translate( 'Relative to the current date (e.g., 1 day, 1 week, 1 month ago)' ) }
								</span>
							</FormLabel>

							<FormLabel>
								<FormRadio
									checked={ 'default' === job_manager_date_format }
									name="job_manager_date_format"
									onChange={ this.updateRadio( 'job_manager_date_format' ) }
									value="default" />
								<span>
									{ translate( 'Default date format as defined in Setttings' ) }
								</span>
							</FormLabel>
							<FormSettingExplanation>
								{ translate( 'Choose how you want the published date for jobs to be displayed on the front-end.' ) }
							</FormSettingExplanation>
						</FormFieldset>
					</form>
				</Card>

				<SectionHeader label={ translate( 'Google Maps API Key' ) }>
					<Button compact primary>
						{ translate( 'Save Settings' ) }
					</Button>
				</SectionHeader>
				<Card>
					<form>
						<FormFieldset>
							<FormTextInput
								onChange={ this.updateTextInput( 'job_manager_google_maps_api_key' ) }
								value={ job_manager_google_maps_api_key } />
							<FormSettingExplanation>
								{ translate(
									'Google requires an API key to retrieve location information for job listings. ' +
									'Acquire an API key from the {{a}}Google Maps API developer site{{/a}}.',
									{
										components: {
											a: (
												<ExternalLink
													icon={ true }
													target="_blank"
													href="https://developers.google.com/maps/documentation/geocoding/get-api-key"
												/>
											),
										}
									}
								) }
							</FormSettingExplanation>
						</FormFieldset>
					</form>
				</Card>
			</div>
		);
	}
}

export default localize( JobListings );
