import { gql } from '@apollo/client/core';

export const pubKeysSubscription = gql`
	subscription PubKeysSubscription {
		pubKeysSubscription {
			id
			key
			pubId
		}
	}
`;
