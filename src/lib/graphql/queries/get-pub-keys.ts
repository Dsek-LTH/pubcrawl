import { gql } from '@apollo/client/core';

export const getPubKeys = gql`
	query GetPubKeys {
		pubKeys {
			id
			key
			pubId
		}
	}
`;
