import { gql } from '@apollo/client/core';

export const getThemes = gql`
	query GetThemes {
		themes {
			color
			displayName
			id
			logo
			themeId
		}
	}
`;
