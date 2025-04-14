import { gql } from '@apollo/client/core';

export const pubsSubscription = gql`
	subscription PubsSubscription {
		pubsSubscription {
			capacity
			id
			isActive
			occupancy
			pubId
			queueStatus
			themeId
		}
	}
`;
