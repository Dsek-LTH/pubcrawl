import { gql } from '@apollo/client/core';

export const removePub = gql`
	mutation RemovePub($pubId: String!) {
		deleteFromPubs(where: { pubId: { eq: $pubId } }) {
			id
			pubId
			occupancy
			capacity
			queueStatus
			isActive
			themeId
		}
	}
`;
