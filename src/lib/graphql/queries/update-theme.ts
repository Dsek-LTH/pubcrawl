import { gql } from '@apollo/client/core';

export const updateTheme = gql`
	mutation UpdateTheme($theme: ThemesUpdateInput!, $oldThemeId: String!) {
			updateThemes(set: $theme, where: {themeId: {eq: $oldThemeId}}) {
					id
					themeId
					displayName
					logo
					color
      }
  }
`