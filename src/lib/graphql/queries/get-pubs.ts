import { gql } from '@apollo/client/core';

export const getPubs = gql`
	query GetPubs {
		pubs {
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
