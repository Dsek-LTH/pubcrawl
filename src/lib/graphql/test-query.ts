import { gql } from '@apollo/client/core';

export const testQuery = gql`
    query TestQuery {
        pubKeys {
            key
            pub {
                pubId
            }
        }
    }
`;
