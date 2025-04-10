import { gql } from '@apollo/client/core';

export const decrementPubOccupancy = gql`
    mutation DecrementPubOccupancy($pubId: String!, $decrement: Int!) {
        decrementPubOccupancy(where: {pubId: $pubId}, values: {decrement: $decrement}) {
            id
            pubId
            occupancy
            capacity
            queueStatus
            isActive
            themeId
        }
    }
`