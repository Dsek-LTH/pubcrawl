import { gql } from '@apollo/client/core';

export const incrementPubOccupancy = gql`
	mutation IncrementPubOccupancy($pubId: String!, $increment: Int!) {
		incrementPubOccupancy(where: { pubId: $pubId }, values: { increment: $increment }) {
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
