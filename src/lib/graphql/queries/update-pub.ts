import { gql } from '@apollo/client/core';

export const updatePub = gql`
	mutation UpdatePub($pub: PubsUpdateInput!, $oldPubId: String!) {
		updatePubs(set: $pub, where: { pubId: { eq: $oldPubId } }) {
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
