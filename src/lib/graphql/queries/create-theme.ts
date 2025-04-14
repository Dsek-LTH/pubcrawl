import { gql } from '@apollo/client/core';

export const createTheme = gql`
	mutation CreateTheme($themeId: String!, $color: String!, $logo: String!, $displayName: String!) {
		insertIntoThemesSingle(
			values: { themeId: $themeId, color: $color, logo: $logo, displayName: $displayName }
		) {
			id
			themeId
			displayName
			logo
			color
		}
	}
`;
