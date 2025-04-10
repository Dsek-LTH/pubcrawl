import { gql } from '@apollo/client/core';

export const updatePubKey = gql`
	mutation UpdatePubKey($pubKey: String!, $oldPubKey: String!) {
			updatePubKeys(set: {key: $pubKey}, where: {key: {eq: $oldPubKey}}) {
					pubId
					key
					id
			}
  }
`