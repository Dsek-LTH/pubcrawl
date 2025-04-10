import { gql } from '@apollo/client/core';

export const createPub = gql`
    mutation CreatePub($capacity: Int!, $isActive: Boolean!, $occupancy: Int!, $pubId: String!, $queueStatus: Int!, $themeId: String!) {
        insertIntoPubs(values: {
            capacity: $capacity
            isActive: $isActive
            occupancy: $occupancy
            pubId: $pubId
            queueStatus: $queueStatus
            themeId: $themeId
        }) {
            capacity
            id
            isActive
            occupancy
            pubId
            queueStatus
            themeId
        }
    }
`