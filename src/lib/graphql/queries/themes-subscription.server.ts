import { gql } from '@apollo/client/core';

export const themesSubscription = gql`
	subscription ThemesSubscription {
		themesSubscription {
			color
			displayName
			id
			logo
			themeId
		}
	}
`;
