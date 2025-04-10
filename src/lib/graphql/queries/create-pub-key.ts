import { gql } from '@apollo/client/core';

export const createPubKey = gql`
	mutation CreatePubKey($pubKey: String!, $pubId: String!) {
		insertIntoPubKeys(values: {key: $pubKey, pubId: $pubId}) {
			pubId
			key
			id
		}
	}
`