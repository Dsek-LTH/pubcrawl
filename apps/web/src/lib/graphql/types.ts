import client from '$lib/graphql/apollo-client';
import type {
	ApolloQueryResult,
	ObservableQuery,
	WatchQueryOptions,
	MutationOptions,
	SubscriptionOptions
} from '@apollo/client';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type DecrementPubOccupancyValues = {
	decrement: Scalars['Int']['input'];
};

export type DecrementPubOccupancyWhere = {
	pubId: Scalars['String']['input'];
};

export type IncrementPubOccupancyValues = {
	increment: Scalars['Int']['input'];
};

export type IncrementPubOccupancyWhere = {
	pubId: Scalars['String']['input'];
};

export type InnerOrder = {
	direction: OrderDirection;
	/** Priority of current field */
	priority: Scalars['Int']['input'];
};

export type Mutation = {
	__typename?: 'Mutation';
	decrementPubOccupancy?: Maybe<Array<PubsItem>>;
	deleteFromPubs: Array<PubsItem>;
	incrementPubOccupancy?: Maybe<Array<PubsItem>>;
	insertIntoPubs: Array<PubsItem>;
	insertIntoPubsSingle?: Maybe<PubsItem>;
	regeneratePubKeys?: Maybe<Array<PubsItem>>;
	updatePubs: Array<PubsItem>;
};

export type MutationDecrementPubOccupancyArgs = {
	values: DecrementPubOccupancyValues;
	where: DecrementPubOccupancyWhere;
};

export type MutationDeleteFromPubsArgs = {
	where?: InputMaybe<PubsFilters>;
};

export type MutationIncrementPubOccupancyArgs = {
	values: IncrementPubOccupancyValues;
	where: IncrementPubOccupancyWhere;
};

export type MutationInsertIntoPubsArgs = {
	values: Array<PubsInsertInput>;
};

export type MutationInsertIntoPubsSingleArgs = {
	values: PubsInsertInput;
};

export type MutationRegeneratePubKeysArgs = {
	input: Array<RegeneratePubKeysInput>;
};

export type MutationUpdatePubsArgs = {
	set: PubsUpdateInput;
	where?: InputMaybe<PubsFilters>;
};

/** Order by direction */
export enum OrderDirection {
	/** Ascending order */
	Asc = 'asc',
	/** Descending order */
	Desc = 'desc'
}

export type PubsCapacityFilters = {
	OR?: InputMaybe<Array<PubsCapacityfiltersOr>>;
	eq?: InputMaybe<Scalars['Int']['input']>;
	gt?: InputMaybe<Scalars['Int']['input']>;
	gte?: InputMaybe<Scalars['Int']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Int']['input']>;
	lte?: InputMaybe<Scalars['Int']['input']>;
	ne?: InputMaybe<Scalars['Int']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsCapacityfiltersOr = {
	eq?: InputMaybe<Scalars['Int']['input']>;
	gt?: InputMaybe<Scalars['Int']['input']>;
	gte?: InputMaybe<Scalars['Int']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Int']['input']>;
	lte?: InputMaybe<Scalars['Int']['input']>;
	ne?: InputMaybe<Scalars['Int']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsColorFilters = {
	OR?: InputMaybe<Array<PubsColorfiltersOr>>;
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsColorfiltersOr = {
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsDisplayNameFilters = {
	OR?: InputMaybe<Array<PubsDisplayNamefiltersOr>>;
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsDisplayNamefiltersOr = {
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsFilters = {
	OR?: InputMaybe<Array<PubsFiltersOr>>;
	capacity?: InputMaybe<PubsCapacityFilters>;
	color?: InputMaybe<PubsColorFilters>;
	displayName?: InputMaybe<PubsDisplayNameFilters>;
	id?: InputMaybe<PubsIdFilters>;
	isActive?: InputMaybe<PubsIsActiveFilters>;
	isOpen?: InputMaybe<PubsIsOpenFilters>;
	logo?: InputMaybe<PubsLogoFilters>;
	occupancy?: InputMaybe<PubsOccupancyFilters>;
	pubId?: InputMaybe<PubsPubIdFilters>;
	pubKey?: InputMaybe<PubsPubKeyFilters>;
	queueStatus?: InputMaybe<PubsQueueStatusFilters>;
};

export type PubsFiltersOr = {
	capacity?: InputMaybe<PubsCapacityFilters>;
	color?: InputMaybe<PubsColorFilters>;
	displayName?: InputMaybe<PubsDisplayNameFilters>;
	id?: InputMaybe<PubsIdFilters>;
	isActive?: InputMaybe<PubsIsActiveFilters>;
	isOpen?: InputMaybe<PubsIsOpenFilters>;
	logo?: InputMaybe<PubsLogoFilters>;
	occupancy?: InputMaybe<PubsOccupancyFilters>;
	pubId?: InputMaybe<PubsPubIdFilters>;
	pubKey?: InputMaybe<PubsPubKeyFilters>;
	queueStatus?: InputMaybe<PubsQueueStatusFilters>;
};

export type PubsIdFilters = {
	OR?: InputMaybe<Array<PubsIdfiltersOr>>;
	eq?: InputMaybe<Scalars['Int']['input']>;
	gt?: InputMaybe<Scalars['Int']['input']>;
	gte?: InputMaybe<Scalars['Int']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Int']['input']>;
	lte?: InputMaybe<Scalars['Int']['input']>;
	ne?: InputMaybe<Scalars['Int']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsIdfiltersOr = {
	eq?: InputMaybe<Scalars['Int']['input']>;
	gt?: InputMaybe<Scalars['Int']['input']>;
	gte?: InputMaybe<Scalars['Int']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Int']['input']>;
	lte?: InputMaybe<Scalars['Int']['input']>;
	ne?: InputMaybe<Scalars['Int']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsInsertInput = {
	capacity: Scalars['Int']['input'];
	color: Scalars['String']['input'];
	displayName: Scalars['String']['input'];
	id?: InputMaybe<Scalars['Int']['input']>;
	isActive: Scalars['Boolean']['input'];
	isOpen: Scalars['Boolean']['input'];
	logo: Scalars['String']['input'];
	occupancy: Scalars['Int']['input'];
	pubId: Scalars['String']['input'];
	pubKey: Scalars['String']['input'];
	queueStatus: Scalars['Int']['input'];
};

export type PubsIsActiveFilters = {
	OR?: InputMaybe<Array<PubsIsActivefiltersOr>>;
	eq?: InputMaybe<Scalars['Boolean']['input']>;
	gt?: InputMaybe<Scalars['Boolean']['input']>;
	gte?: InputMaybe<Scalars['Boolean']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Boolean']['input']>;
	lte?: InputMaybe<Scalars['Boolean']['input']>;
	ne?: InputMaybe<Scalars['Boolean']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsIsActivefiltersOr = {
	eq?: InputMaybe<Scalars['Boolean']['input']>;
	gt?: InputMaybe<Scalars['Boolean']['input']>;
	gte?: InputMaybe<Scalars['Boolean']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Boolean']['input']>;
	lte?: InputMaybe<Scalars['Boolean']['input']>;
	ne?: InputMaybe<Scalars['Boolean']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsIsOpenFilters = {
	OR?: InputMaybe<Array<PubsIsOpenfiltersOr>>;
	eq?: InputMaybe<Scalars['Boolean']['input']>;
	gt?: InputMaybe<Scalars['Boolean']['input']>;
	gte?: InputMaybe<Scalars['Boolean']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Boolean']['input']>;
	lte?: InputMaybe<Scalars['Boolean']['input']>;
	ne?: InputMaybe<Scalars['Boolean']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsIsOpenfiltersOr = {
	eq?: InputMaybe<Scalars['Boolean']['input']>;
	gt?: InputMaybe<Scalars['Boolean']['input']>;
	gte?: InputMaybe<Scalars['Boolean']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Boolean']['input']>;
	lte?: InputMaybe<Scalars['Boolean']['input']>;
	ne?: InputMaybe<Scalars['Boolean']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsItem = {
	__typename?: 'PubsItem';
	capacity: Scalars['Int']['output'];
	color: Scalars['String']['output'];
	displayName: Scalars['String']['output'];
	id: Scalars['Int']['output'];
	isActive: Scalars['Boolean']['output'];
	isOpen: Scalars['Boolean']['output'];
	logo: Scalars['String']['output'];
	occupancy: Scalars['Int']['output'];
	pubId: Scalars['String']['output'];
	pubKey: Scalars['String']['output'];
	queueStatus: Scalars['Int']['output'];
};

export type PubsLogoFilters = {
	OR?: InputMaybe<Array<PubsLogofiltersOr>>;
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsLogofiltersOr = {
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsOccupancyFilters = {
	OR?: InputMaybe<Array<PubsOccupancyfiltersOr>>;
	eq?: InputMaybe<Scalars['Int']['input']>;
	gt?: InputMaybe<Scalars['Int']['input']>;
	gte?: InputMaybe<Scalars['Int']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Int']['input']>;
	lte?: InputMaybe<Scalars['Int']['input']>;
	ne?: InputMaybe<Scalars['Int']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsOccupancyfiltersOr = {
	eq?: InputMaybe<Scalars['Int']['input']>;
	gt?: InputMaybe<Scalars['Int']['input']>;
	gte?: InputMaybe<Scalars['Int']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Int']['input']>;
	lte?: InputMaybe<Scalars['Int']['input']>;
	ne?: InputMaybe<Scalars['Int']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsOrderBy = {
	capacity?: InputMaybe<InnerOrder>;
	color?: InputMaybe<InnerOrder>;
	displayName?: InputMaybe<InnerOrder>;
	id?: InputMaybe<InnerOrder>;
	isActive?: InputMaybe<InnerOrder>;
	isOpen?: InputMaybe<InnerOrder>;
	logo?: InputMaybe<InnerOrder>;
	occupancy?: InputMaybe<InnerOrder>;
	pubId?: InputMaybe<InnerOrder>;
	pubKey?: InputMaybe<InnerOrder>;
	queueStatus?: InputMaybe<InnerOrder>;
};

export type PubsPubIdFilters = {
	OR?: InputMaybe<Array<PubsPubIdfiltersOr>>;
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsPubIdfiltersOr = {
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsPubKeyFilters = {
	OR?: InputMaybe<Array<PubsPubKeyfiltersOr>>;
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsPubKeyfiltersOr = {
	eq?: InputMaybe<Scalars['String']['input']>;
	gt?: InputMaybe<Scalars['String']['input']>;
	gte?: InputMaybe<Scalars['String']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['String']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['String']['input']>;
	lte?: InputMaybe<Scalars['String']['input']>;
	ne?: InputMaybe<Scalars['String']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['String']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsQueueStatusFilters = {
	OR?: InputMaybe<Array<PubsQueueStatusfiltersOr>>;
	eq?: InputMaybe<Scalars['Int']['input']>;
	gt?: InputMaybe<Scalars['Int']['input']>;
	gte?: InputMaybe<Scalars['Int']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Int']['input']>;
	lte?: InputMaybe<Scalars['Int']['input']>;
	ne?: InputMaybe<Scalars['Int']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsQueueStatusfiltersOr = {
	eq?: InputMaybe<Scalars['Int']['input']>;
	gt?: InputMaybe<Scalars['Int']['input']>;
	gte?: InputMaybe<Scalars['Int']['input']>;
	ilike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	inArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
	isNull?: InputMaybe<Scalars['Boolean']['input']>;
	like?: InputMaybe<Scalars['String']['input']>;
	lt?: InputMaybe<Scalars['Int']['input']>;
	lte?: InputMaybe<Scalars['Int']['input']>;
	ne?: InputMaybe<Scalars['Int']['input']>;
	notIlike?: InputMaybe<Scalars['String']['input']>;
	/** Array<undefined> */
	notInArray?: InputMaybe<Array<Scalars['Int']['input']>>;
	notLike?: InputMaybe<Scalars['String']['input']>;
};

export type PubsSelectItem = {
	__typename?: 'PubsSelectItem';
	capacity: Scalars['Int']['output'];
	color: Scalars['String']['output'];
	displayName: Scalars['String']['output'];
	id: Scalars['Int']['output'];
	isActive: Scalars['Boolean']['output'];
	isOpen: Scalars['Boolean']['output'];
	logo: Scalars['String']['output'];
	occupancy: Scalars['Int']['output'];
	pubId: Scalars['String']['output'];
	pubKey: Scalars['String']['output'];
	queueStatus: Scalars['Int']['output'];
};

export type PubsUpdateInput = {
	capacity?: InputMaybe<Scalars['Int']['input']>;
	color?: InputMaybe<Scalars['String']['input']>;
	displayName?: InputMaybe<Scalars['String']['input']>;
	id?: InputMaybe<Scalars['Int']['input']>;
	isActive?: InputMaybe<Scalars['Boolean']['input']>;
	isOpen?: InputMaybe<Scalars['Boolean']['input']>;
	logo?: InputMaybe<Scalars['String']['input']>;
	occupancy?: InputMaybe<Scalars['Int']['input']>;
	pubId?: InputMaybe<Scalars['String']['input']>;
	pubKey?: InputMaybe<Scalars['String']['input']>;
	queueStatus?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
	__typename?: 'Query';
	pubs: Array<PubsSelectItem>;
	pubsSingle?: Maybe<PubsSelectItem>;
};

export type QueryPubsArgs = {
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<PubsOrderBy>;
	where?: InputMaybe<PubsFilters>;
};

export type QueryPubsSingleArgs = {
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<PubsOrderBy>;
	where?: InputMaybe<PubsFilters>;
};

export type RegeneratePubKeysInput = {
	value: RegeneratePubKeysValue;
	where: RegeneratePubKeysWhere;
};

export type RegeneratePubKeysValue = {
	pubKey: Scalars['String']['input'];
};

export type RegeneratePubKeysWhere = {
	pubId: Scalars['String']['input'];
};

export type Subscription = {
	__typename?: 'Subscription';
	pubsSubscription?: Maybe<Array<PubsItem>>;
};

export type CreatePubMutationVariables = Exact<{
	capacity: Scalars['Int']['input'];
	isActive: Scalars['Boolean']['input'];
	occupancy: Scalars['Int']['input'];
	pubId: Scalars['String']['input'];
	pubKey: Scalars['String']['input'];
	queueStatus: Scalars['Int']['input'];
	displayName: Scalars['String']['input'];
	logo: Scalars['String']['input'];
	color: Scalars['String']['input'];
	isOpen: Scalars['Boolean']['input'];
}>;

export type CreatePubMutation = {
	__typename?: 'Mutation';
	insertIntoPubs: Array<{
		__typename?: 'PubsItem';
		capacity: number;
		id: number;
		isActive: boolean;
		occupancy: number;
		pubId: string;
		pubKey: string;
		queueStatus: number;
		displayName: string;
		logo: string;
		color: string;
		isOpen: boolean;
	}>;
};

export type DecrementPubOccupancyMutationVariables = Exact<{
	pubId: Scalars['String']['input'];
	decrement: Scalars['Int']['input'];
}>;

export type DecrementPubOccupancyMutation = {
	__typename?: 'Mutation';
	decrementPubOccupancy?: Array<{
		__typename?: 'PubsItem';
		id: number;
		pubId: string;
		occupancy: number;
		capacity: number;
		queueStatus: number;
		isActive: boolean;
		displayName: string;
		logo: string;
		color: string;
		isOpen: boolean;
	}> | null;
};

export type IncrementPubOccupancyMutationVariables = Exact<{
	pubId: Scalars['String']['input'];
	increment: Scalars['Int']['input'];
}>;

export type IncrementPubOccupancyMutation = {
	__typename?: 'Mutation';
	incrementPubOccupancy?: Array<{
		__typename?: 'PubsItem';
		id: number;
		pubId: string;
		occupancy: number;
		capacity: number;
		queueStatus: number;
		isActive: boolean;
		displayName: string;
		logo: string;
		color: string;
		isOpen: boolean;
	}> | null;
};

export type RegeneratePubKeysMutationVariables = Exact<{
	input: Array<RegeneratePubKeysInput> | RegeneratePubKeysInput;
}>;

export type RegeneratePubKeysMutation = {
	__typename?: 'Mutation';
	regeneratePubKeys?: Array<{
		__typename?: 'PubsItem';
		id: number;
		pubId: string;
		pubKey: string;
	}> | null;
};

export type RemovePubMutationVariables = Exact<{
	pubId: Scalars['String']['input'];
}>;

export type RemovePubMutation = {
	__typename?: 'Mutation';
	deleteFromPubs: Array<{
		__typename?: 'PubsItem';
		id: number;
		pubId: string;
		pubKey: string;
		occupancy: number;
		capacity: number;
		queueStatus: number;
		isActive: boolean;
		displayName: string;
		logo: string;
		color: string;
		isOpen: boolean;
	}>;
};

export type UpdatePubMutationVariables = Exact<{
	pub: PubsUpdateInput;
	oldPubId: Scalars['String']['input'];
}>;

export type UpdatePubMutation = {
	__typename?: 'Mutation';
	updatePubs: Array<{
		__typename?: 'PubsItem';
		id: number;
		pubId: string;
		pubKey: string;
		occupancy: number;
		capacity: number;
		queueStatus: number;
		isActive: boolean;
		displayName: string;
		logo: string;
		color: string;
		isOpen: boolean;
	}>;
};

export type GetPubKeysQueryVariables = Exact<{ [key: string]: never }>;

export type GetPubKeysQuery = {
	__typename?: 'Query';
	pubs: Array<{ __typename?: 'PubsSelectItem'; pubKey: string; pubId: string }>;
};

export type GetPubsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPubsQuery = {
	__typename?: 'Query';
	pubs: Array<{
		__typename?: 'PubsSelectItem';
		capacity: number;
		id: number;
		isActive: boolean;
		occupancy: number;
		pubId: string;
		queueStatus: number;
		displayName: string;
		logo: string;
		color: string;
		isOpen: boolean;
	}>;
};

export type PubKeysSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type PubKeysSubscriptionSubscription = {
	__typename?: 'Subscription';
	pubsSubscription?: Array<{ __typename?: 'PubsItem'; pubId: string; pubKey: string }> | null;
};

export type PubsSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type PubsSubscriptionSubscription = {
	__typename?: 'Subscription';
	pubsSubscription?: Array<{
		__typename?: 'PubsItem';
		capacity: number;
		id: number;
		isActive: boolean;
		occupancy: number;
		pubId: string;
		queueStatus: number;
		displayName: string;
		logo: string;
		color: string;
		isOpen: boolean;
	}> | null;
};

export const CreatePubDoc = gql`
	mutation CreatePub(
		$capacity: Int!
		$isActive: Boolean!
		$occupancy: Int!
		$pubId: String!
		$pubKey: String!
		$queueStatus: Int!
		$displayName: String!
		$logo: String!
		$color: String!
		$isOpen: Boolean!
	) {
		insertIntoPubs(
			values: {
				capacity: $capacity
				isActive: $isActive
				occupancy: $occupancy
				pubId: $pubId
				pubKey: $pubKey
				queueStatus: $queueStatus
				displayName: $displayName
				logo: $logo
				color: $color
				isOpen: $isOpen
			}
		) {
			capacity
			id
			isActive
			occupancy
			pubId
			pubKey
			queueStatus
			displayName
			logo
			color
			isOpen
		}
	}
`;
export const DecrementPubOccupancyDoc = gql`
	mutation DecrementPubOccupancy($pubId: String!, $decrement: Int!) {
		decrementPubOccupancy(where: { pubId: $pubId }, values: { decrement: $decrement }) {
			id
			pubId
			occupancy
			capacity
			queueStatus
			isActive
			displayName
			logo
			color
			isOpen
		}
	}
`;
export const IncrementPubOccupancyDoc = gql`
	mutation IncrementPubOccupancy($pubId: String!, $increment: Int!) {
		incrementPubOccupancy(where: { pubId: $pubId }, values: { increment: $increment }) {
			id
			pubId
			occupancy
			capacity
			queueStatus
			isActive
			displayName
			logo
			color
			isOpen
		}
	}
`;
export const RegeneratePubKeysDoc = gql`
	mutation RegeneratePubKeys($input: [RegeneratePubKeysInput!]!) {
		regeneratePubKeys(input: $input) {
			id
			pubId
			pubKey
		}
	}
`;
export const RemovePubDoc = gql`
	mutation RemovePub($pubId: String!) {
		deleteFromPubs(where: { pubId: { eq: $pubId } }) {
			id
			pubId
			pubKey
			occupancy
			capacity
			queueStatus
			isActive
			displayName
			logo
			color
			isOpen
		}
	}
`;
export const UpdatePubDoc = gql`
	mutation UpdatePub($pub: PubsUpdateInput!, $oldPubId: String!) {
		updatePubs(set: $pub, where: { pubId: { eq: $oldPubId } }) {
			id
			pubId
			pubKey
			occupancy
			capacity
			queueStatus
			isActive
			displayName
			logo
			color
			isOpen
		}
	}
`;
export const GetPubKeysDoc = gql`
	query GetPubKeys {
		pubs {
			pubKey
			pubId
		}
	}
`;
export const GetPubsDoc = gql`
	query GetPubs {
		pubs {
			capacity
			id
			isActive
			occupancy
			pubId
			queueStatus
			displayName
			logo
			color
			isOpen
		}
	}
`;
export const PubKeysSubscriptionDoc = gql`
	subscription PubKeysSubscription {
		pubsSubscription {
			pubId
			pubKey
		}
	}
`;
export const PubsSubscriptionDoc = gql`
	subscription PubsSubscription {
		pubsSubscription {
			capacity
			id
			isActive
			occupancy
			pubId
			queueStatus
			displayName
			logo
			color
			isOpen
		}
	}
`;
export const CreatePub = (
	options: Omit<MutationOptions<any, CreatePubMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CreatePubMutation, CreatePubMutationVariables>({
		mutation: CreatePubDoc,
		...options
	});
	return m;
};
export const DecrementPubOccupancy = (
	options: Omit<MutationOptions<any, DecrementPubOccupancyMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<DecrementPubOccupancyMutation, DecrementPubOccupancyMutationVariables>({
		mutation: DecrementPubOccupancyDoc,
		...options
	});
	return m;
};
export const IncrementPubOccupancy = (
	options: Omit<MutationOptions<any, IncrementPubOccupancyMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<IncrementPubOccupancyMutation, IncrementPubOccupancyMutationVariables>({
		mutation: IncrementPubOccupancyDoc,
		...options
	});
	return m;
};
export const RegeneratePubKeys = (
	options: Omit<MutationOptions<any, RegeneratePubKeysMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<RegeneratePubKeysMutation, RegeneratePubKeysMutationVariables>({
		mutation: RegeneratePubKeysDoc,
		...options
	});
	return m;
};
export const RemovePub = (
	options: Omit<MutationOptions<any, RemovePubMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<RemovePubMutation, RemovePubMutationVariables>({
		mutation: RemovePubDoc,
		...options
	});
	return m;
};
export const UpdatePub = (
	options: Omit<MutationOptions<any, UpdatePubMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<UpdatePubMutation, UpdatePubMutationVariables>({
		mutation: UpdatePubDoc,
		...options
	});
	return m;
};
export const GetPubKeys = (
	options: Omit<WatchQueryOptions<GetPubKeysQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<GetPubKeysQuery> & {
		query: ObservableQuery<GetPubKeysQuery, GetPubKeysQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: GetPubKeysDoc,
		...options
	});
	var result = readable<
		ApolloQueryResult<GetPubKeysQuery> & {
			query: ObservableQuery<GetPubKeysQuery, GetPubKeysQueryVariables>;
		}
	>({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
		q.subscribe((v: any) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const GetPubs = (
	options: Omit<WatchQueryOptions<GetPubsQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<GetPubsQuery> & {
		query: ObservableQuery<GetPubsQuery, GetPubsQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: GetPubsDoc,
		...options
	});
	var result = readable<
		ApolloQueryResult<GetPubsQuery> & {
			query: ObservableQuery<GetPubsQuery, GetPubsQueryVariables>;
		}
	>({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
		q.subscribe((v: any) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const PubKeysSubscription = (
	options: Omit<SubscriptionOptions<PubKeysSubscriptionSubscriptionVariables>, 'query'>
) => {
	const q = client.subscribe<
		PubKeysSubscriptionSubscription,
		PubKeysSubscriptionSubscriptionVariables
	>({
		query: PubKeysSubscriptionDoc,
		...options
	});
	return q;
};
export const PubsSubscription = (
	options: Omit<SubscriptionOptions<PubsSubscriptionSubscriptionVariables>, 'query'>
) => {
	const q = client.subscribe<PubsSubscriptionSubscription, PubsSubscriptionSubscriptionVariables>({
		query: PubsSubscriptionDoc,
		...options
	});
	return q;
};
