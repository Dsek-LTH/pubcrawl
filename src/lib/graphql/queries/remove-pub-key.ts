import { gql } from '@apollo/client/core';

export const removePubKey = gql`
	mutation RemovePubKey($pubKey: String!) {
		deleteFromPubKeys(where: { key: { eq: $pubKey } }) {
			id
			pubId
			key
		}
	}
`;
