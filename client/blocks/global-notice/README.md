Global Notice
===========

These components are used to display global notices.
`GlobalNotice` is a generic component that calls a function passed as props on mount and unmount.
`InfoNotice` connects `GlobalNotice` to the store using the `infoNotice` and `removeNotice` redux action.

#### How to use the container:

```js
import { InfoNotice } from 'blocks/global-notice';

render() {
	return (
		<div>
			{ this.state.processing && <InfoNotice text={ this.props.translate( 'Proccessing…' ) } /> }
		</div>
	);
}
```

#### Props

* `text`: The text that will be displayed while the notice is visible
