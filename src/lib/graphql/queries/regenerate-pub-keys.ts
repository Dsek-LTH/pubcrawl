import { gql } from '@apollo/client/core';

export const regeneratePubKeys = gql`
	mutation RegeneratePubKeys($input: [RegeneratePubKeysInput!]!) {
		regeneratePubKeys(input: $input) {
			id
			pubId
			key
		}
	}
`;
