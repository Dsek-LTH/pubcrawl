import { gql } from '@apollo/client/core';

export const removeTheme = gql`
	mutation RemoveTheme($themeId: String!) {
		deleteFromThemes(where: {themeId: {eq: $themeId}}) {
			id
			themeId
			displayName
			logo
			color
		}
	}
`