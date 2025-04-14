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
	deleteFromPubKeys: Array<PubKeysItem>;
	deleteFromPubs: Array<PubsItem>;
	deleteFromThemes: Array<ThemesItem>;
	incrementPubOccupancy?: Maybe<Array<PubsItem>>;
	insertIntoPubKeys: Array<PubKeysItem>;
	insertIntoPubKeysSingle?: Maybe<PubKeysItem>;
	insertIntoPubs: Array<PubsItem>;
	insertIntoPubsSingle?: Maybe<PubsItem>;
	insertIntoThemes: Array<ThemesItem>;
	insertIntoThemesSingle?: Maybe<ThemesItem>;
	regeneratePubKeys?: Maybe<Array<PubKeysItem>>;
	updatePubKeys: Array<PubKeysItem>;
	updatePubs: Array<PubsItem>;
	updateThemes: Array<ThemesItem>;
};

export type MutationDecrementPubOccupancyArgs = {
	values: DecrementPubOccupancyValues;
	where: DecrementPubOccupancyWhere;
};

export type MutationDeleteFromPubKeysArgs = {
	where?: InputMaybe<PubKeysFilters>;
};

export type MutationDeleteFromPubsArgs = {
	where?: InputMaybe<PubsFilters>;
};

export type MutationDeleteFromThemesArgs = {
	where?: InputMaybe<ThemesFilters>;
};

export type MutationIncrementPubOccupancyArgs = {
	values: IncrementPubOccupancyValues;
	where: IncrementPubOccupancyWhere;
};

export type MutationInsertIntoPubKeysArgs = {
	values: Array<PubKeysInsertInput>;
};

export type MutationInsertIntoPubKeysSingleArgs = {
	values: PubKeysInsertInput;
};

export type MutationInsertIntoPubsArgs = {
	values: Array<PubsInsertInput>;
};

export type MutationInsertIntoPubsSingleArgs = {
	values: PubsInsertInput;
};

export type MutationInsertIntoThemesArgs = {
	values: Array<ThemesInsertInput>;
};

export type MutationInsertIntoThemesSingleArgs = {
	values: ThemesInsertInput;
};

export type MutationRegeneratePubKeysArgs = {
	input: Array<RegeneratePubKeysInput>;
};

export type MutationUpdatePubKeysArgs = {
	set: PubKeysUpdateInput;
	where?: InputMaybe<PubKeysFilters>;
};

export type MutationUpdatePubsArgs = {
	set: PubsUpdateInput;
	where?: InputMaybe<PubsFilters>;
};

export type MutationUpdateThemesArgs = {
	set: ThemesUpdateInput;
	where?: InputMaybe<ThemesFilters>;
};

/** Order by direction */
export enum OrderDirection {
	/** Ascending order */
	Asc = 'asc',
	/** Descending order */
	Desc = 'desc'
}

export type PubKeysFilters = {
	OR?: InputMaybe<Array<PubKeysFiltersOr>>;
	id?: InputMaybe<PubKeysIdFilters>;
	key?: InputMaybe<PubKeysKeyFilters>;
	pubId?: InputMaybe<PubKeysPubIdFilters>;
};

export type PubKeysFiltersOr = {
	id?: InputMaybe<PubKeysIdFilters>;
	key?: InputMaybe<PubKeysKeyFilters>;
	pubId?: InputMaybe<PubKeysPubIdFilters>;
};

export type PubKeysIdFilters = {
	OR?: InputMaybe<Array<PubKeysIdfiltersOr>>;
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

export type PubKeysIdfiltersOr = {
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

export type PubKeysInsertInput = {
	id?: InputMaybe<Scalars['Int']['input']>;
	key: Scalars['String']['input'];
	pubId: Scalars['String']['input'];
};

export type PubKeysItem = {
	__typename?: 'PubKeysItem';
	id: Scalars['Int']['output'];
	key: Scalars['String']['output'];
	pubId: Scalars['String']['output'];
};

export type PubKeysKeyFilters = {
	OR?: InputMaybe<Array<PubKeysKeyfiltersOr>>;
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

export type PubKeysKeyfiltersOr = {
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

export type PubKeysOrderBy = {
	id?: InputMaybe<InnerOrder>;
	key?: InputMaybe<InnerOrder>;
	pubId?: InputMaybe<InnerOrder>;
};

export type PubKeysPubIdFilters = {
	OR?: InputMaybe<Array<PubKeysPubIdfiltersOr>>;
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

export type PubKeysPubIdfiltersOr = {
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

export type PubKeysPubRelation = {
	__typename?: 'PubKeysPubRelation';
	capacity: Scalars['Int']['output'];
	id: Scalars['Int']['output'];
	isActive: Scalars['Boolean']['output'];
	occupancy: Scalars['Int']['output'];
	pubId: Scalars['String']['output'];
	queueStatus: Scalars['Int']['output'];
	theme?: Maybe<PubKeysPubRelationThemeRelation>;
	themeId: Scalars['String']['output'];
};

export type PubKeysPubRelationThemeArgs = {
	where?: InputMaybe<ThemesFilters>;
};

export type PubKeysPubRelationThemeRelation = {
	__typename?: 'PubKeysPubRelationThemeRelation';
	color: Scalars['String']['output'];
	displayName: Scalars['String']['output'];
	id: Scalars['Int']['output'];
	logo: Scalars['String']['output'];
	pubs: Array<PubKeysPubRelationThemeRelationPubsRelation>;
	themeId: Scalars['String']['output'];
};

export type PubKeysPubRelationThemeRelationPubsArgs = {
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<PubsOrderBy>;
	where?: InputMaybe<PubsFilters>;
};

export type PubKeysPubRelationThemeRelationPubsRelation = {
	__typename?: 'PubKeysPubRelationThemeRelationPubsRelation';
	capacity: Scalars['Int']['output'];
	id: Scalars['Int']['output'];
	isActive: Scalars['Boolean']['output'];
	occupancy: Scalars['Int']['output'];
	pubId: Scalars['String']['output'];
	queueStatus: Scalars['Int']['output'];
	themeId: Scalars['String']['output'];
};

export type PubKeysSelectItem = {
	__typename?: 'PubKeysSelectItem';
	id: Scalars['Int']['output'];
	key: Scalars['String']['output'];
	pub?: Maybe<PubKeysPubRelation>;
	pubId: Scalars['String']['output'];
};

export type PubKeysSelectItemPubArgs = {
	where?: InputMaybe<PubsFilters>;
};

export type PubKeysUpdateInput = {
	id?: InputMaybe<Scalars['Int']['input']>;
	key?: InputMaybe<Scalars['String']['input']>;
	pubId?: InputMaybe<Scalars['String']['input']>;
};

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

export type PubsFilters = {
	OR?: InputMaybe<Array<PubsFiltersOr>>;
	capacity?: InputMaybe<PubsCapacityFilters>;
	id?: InputMaybe<PubsIdFilters>;
	isActive?: InputMaybe<PubsIsActiveFilters>;
	occupancy?: InputMaybe<PubsOccupancyFilters>;
	pubId?: InputMaybe<PubsPubIdFilters>;
	queueStatus?: InputMaybe<PubsQueueStatusFilters>;
	themeId?: InputMaybe<PubsThemeIdFilters>;
};

export type PubsFiltersOr = {
	capacity?: InputMaybe<PubsCapacityFilters>;
	id?: InputMaybe<PubsIdFilters>;
	isActive?: InputMaybe<PubsIsActiveFilters>;
	occupancy?: InputMaybe<PubsOccupancyFilters>;
	pubId?: InputMaybe<PubsPubIdFilters>;
	queueStatus?: InputMaybe<PubsQueueStatusFilters>;
	themeId?: InputMaybe<PubsThemeIdFilters>;
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
	id?: InputMaybe<Scalars['Int']['input']>;
	isActive: Scalars['Boolean']['input'];
	occupancy: Scalars['Int']['input'];
	pubId: Scalars['String']['input'];
	queueStatus: Scalars['Int']['input'];
	themeId: Scalars['String']['input'];
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

export type PubsItem = {
	__typename?: 'PubsItem';
	capacity: Scalars['Int']['output'];
	id: Scalars['Int']['output'];
	isActive: Scalars['Boolean']['output'];
	occupancy: Scalars['Int']['output'];
	pubId: Scalars['String']['output'];
	queueStatus: Scalars['Int']['output'];
	themeId: Scalars['String']['output'];
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
	id?: InputMaybe<InnerOrder>;
	isActive?: InputMaybe<InnerOrder>;
	occupancy?: InputMaybe<InnerOrder>;
	pubId?: InputMaybe<InnerOrder>;
	queueStatus?: InputMaybe<InnerOrder>;
	themeId?: InputMaybe<InnerOrder>;
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
	id: Scalars['Int']['output'];
	isActive: Scalars['Boolean']['output'];
	occupancy: Scalars['Int']['output'];
	pubId: Scalars['String']['output'];
	queueStatus: Scalars['Int']['output'];
	theme?: Maybe<PubsThemeRelation>;
	themeId: Scalars['String']['output'];
};

export type PubsSelectItemThemeArgs = {
	where?: InputMaybe<ThemesFilters>;
};

export type PubsThemeIdFilters = {
	OR?: InputMaybe<Array<PubsThemeIdfiltersOr>>;
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

export type PubsThemeIdfiltersOr = {
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

export type PubsThemeRelation = {
	__typename?: 'PubsThemeRelation';
	color: Scalars['String']['output'];
	displayName: Scalars['String']['output'];
	id: Scalars['Int']['output'];
	logo: Scalars['String']['output'];
	pubs: Array<PubsThemeRelationPubsRelation>;
	themeId: Scalars['String']['output'];
};

export type PubsThemeRelationPubsArgs = {
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<PubsOrderBy>;
	where?: InputMaybe<PubsFilters>;
};

export type PubsThemeRelationPubsRelation = {
	__typename?: 'PubsThemeRelationPubsRelation';
	capacity: Scalars['Int']['output'];
	id: Scalars['Int']['output'];
	isActive: Scalars['Boolean']['output'];
	occupancy: Scalars['Int']['output'];
	pubId: Scalars['String']['output'];
	queueStatus: Scalars['Int']['output'];
	themeId: Scalars['String']['output'];
};

export type PubsUpdateInput = {
	capacity?: InputMaybe<Scalars['Int']['input']>;
	id?: InputMaybe<Scalars['Int']['input']>;
	isActive?: InputMaybe<Scalars['Boolean']['input']>;
	occupancy?: InputMaybe<Scalars['Int']['input']>;
	pubId?: InputMaybe<Scalars['String']['input']>;
	queueStatus?: InputMaybe<Scalars['Int']['input']>;
	themeId?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
	__typename?: 'Query';
	pubKeys: Array<PubKeysSelectItem>;
	pubKeysSingle?: Maybe<PubKeysSelectItem>;
	pubs: Array<PubsSelectItem>;
	pubsSingle?: Maybe<PubsSelectItem>;
	themes: Array<ThemesSelectItem>;
	themesSingle?: Maybe<ThemesSelectItem>;
};

export type QueryPubKeysArgs = {
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<PubKeysOrderBy>;
	where?: InputMaybe<PubKeysFilters>;
};

export type QueryPubKeysSingleArgs = {
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<PubKeysOrderBy>;
	where?: InputMaybe<PubKeysFilters>;
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

export type QueryThemesArgs = {
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<ThemesOrderBy>;
	where?: InputMaybe<ThemesFilters>;
};

export type QueryThemesSingleArgs = {
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<ThemesOrderBy>;
	where?: InputMaybe<ThemesFilters>;
};

export type RegeneratePubKeysInput = {
	value: RegeneratePubKeysValue;
	where: RegeneratePubKeysWhere;
};

export type RegeneratePubKeysValue = {
	pubKey: Scalars['String']['input'];
};

export type RegeneratePubKeysWhere = {
	id: Scalars['Int']['input'];
};

export type Subscription = {
	__typename?: 'Subscription';
	pubKeysSubscription?: Maybe<Array<PubKeysItem>>;
	pubsSubscription?: Maybe<Array<PubsItem>>;
	themesSubscription?: Maybe<Array<ThemesItem>>;
};

export type ThemesColorFilters = {
	OR?: InputMaybe<Array<ThemesColorfiltersOr>>;
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

export type ThemesColorfiltersOr = {
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

export type ThemesDisplayNameFilters = {
	OR?: InputMaybe<Array<ThemesDisplayNamefiltersOr>>;
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

export type ThemesDisplayNamefiltersOr = {
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

export type ThemesFilters = {
	OR?: InputMaybe<Array<ThemesFiltersOr>>;
	color?: InputMaybe<ThemesColorFilters>;
	displayName?: InputMaybe<ThemesDisplayNameFilters>;
	id?: InputMaybe<ThemesIdFilters>;
	logo?: InputMaybe<ThemesLogoFilters>;
	themeId?: InputMaybe<ThemesThemeIdFilters>;
};

export type ThemesFiltersOr = {
	color?: InputMaybe<ThemesColorFilters>;
	displayName?: InputMaybe<ThemesDisplayNameFilters>;
	id?: InputMaybe<ThemesIdFilters>;
	logo?: InputMaybe<ThemesLogoFilters>;
	themeId?: InputMaybe<ThemesThemeIdFilters>;
};

export type ThemesIdFilters = {
	OR?: InputMaybe<Array<ThemesIdfiltersOr>>;
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

export type ThemesIdfiltersOr = {
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

export type ThemesInsertInput = {
	color: Scalars['String']['input'];
	displayName: Scalars['String']['input'];
	id?: InputMaybe<Scalars['Int']['input']>;
	logo: Scalars['String']['input'];
	themeId: Scalars['String']['input'];
};

export type ThemesItem = {
	__typename?: 'ThemesItem';
	color: Scalars['String']['output'];
	displayName: Scalars['String']['output'];
	id: Scalars['Int']['output'];
	logo: Scalars['String']['output'];
	themeId: Scalars['String']['output'];
};

export type ThemesLogoFilters = {
	OR?: InputMaybe<Array<ThemesLogofiltersOr>>;
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

export type ThemesLogofiltersOr = {
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

export type ThemesOrderBy = {
	color?: InputMaybe<InnerOrder>;
	displayName?: InputMaybe<InnerOrder>;
	id?: InputMaybe<InnerOrder>;
	logo?: InputMaybe<InnerOrder>;
	themeId?: InputMaybe<InnerOrder>;
};

export type ThemesPubsRelation = {
	__typename?: 'ThemesPubsRelation';
	capacity: Scalars['Int']['output'];
	id: Scalars['Int']['output'];
	isActive: Scalars['Boolean']['output'];
	occupancy: Scalars['Int']['output'];
	pubId: Scalars['String']['output'];
	queueStatus: Scalars['Int']['output'];
	theme?: Maybe<ThemesPubsRelationThemeRelation>;
	themeId: Scalars['String']['output'];
};

export type ThemesPubsRelationThemeArgs = {
	where?: InputMaybe<ThemesFilters>;
};

export type ThemesPubsRelationThemeRelation = {
	__typename?: 'ThemesPubsRelationThemeRelation';
	color: Scalars['String']['output'];
	displayName: Scalars['String']['output'];
	id: Scalars['Int']['output'];
	logo: Scalars['String']['output'];
	themeId: Scalars['String']['output'];
};

export type ThemesSelectItem = {
	__typename?: 'ThemesSelectItem';
	color: Scalars['String']['output'];
	displayName: Scalars['String']['output'];
	id: Scalars['Int']['output'];
	logo: Scalars['String']['output'];
	pubs: Array<ThemesPubsRelation>;
	themeId: Scalars['String']['output'];
};

export type ThemesSelectItemPubsArgs = {
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	orderBy?: InputMaybe<PubsOrderBy>;
	where?: InputMaybe<PubsFilters>;
};

export type ThemesThemeIdFilters = {
	OR?: InputMaybe<Array<ThemesThemeIdfiltersOr>>;
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

export type ThemesThemeIdfiltersOr = {
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

export type ThemesUpdateInput = {
	color?: InputMaybe<Scalars['String']['input']>;
	displayName?: InputMaybe<Scalars['String']['input']>;
	id?: InputMaybe<Scalars['Int']['input']>;
	logo?: InputMaybe<Scalars['String']['input']>;
	themeId?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePubMutationVariables = Exact<{
	capacity: Scalars['Int']['input'];
	isActive: Scalars['Boolean']['input'];
	occupancy: Scalars['Int']['input'];
	pubId: Scalars['String']['input'];
	queueStatus: Scalars['Int']['input'];
	themeId: Scalars['String']['input'];
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
		queueStatus: number;
		themeId: string;
	}>;
};

export type CreatePubKeyMutationVariables = Exact<{
	pubKey: Scalars['String']['input'];
	pubId: Scalars['String']['input'];
}>;

export type CreatePubKeyMutation = {
	__typename?: 'Mutation';
	insertIntoPubKeys: Array<{ __typename?: 'PubKeysItem'; pubId: string; key: string; id: number }>;
};

export type CreateThemeMutationVariables = Exact<{
	themeId: Scalars['String']['input'];
	color: Scalars['String']['input'];
	logo: Scalars['String']['input'];
	displayName: Scalars['String']['input'];
}>;

export type CreateThemeMutation = {
	__typename?: 'Mutation';
	insertIntoThemesSingle?: {
		__typename?: 'ThemesItem';
		id: number;
		themeId: string;
		displayName: string;
		logo: string;
		color: string;
	} | null;
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
		themeId: string;
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
		themeId: string;
	}> | null;
};

export type RegeneratePubKeysMutationVariables = Exact<{
	input: Array<RegeneratePubKeysInput> | RegeneratePubKeysInput;
}>;

export type RegeneratePubKeysMutation = {
	__typename?: 'Mutation';
	regeneratePubKeys?: Array<{
		__typename?: 'PubKeysItem';
		id: number;
		pubId: string;
		key: string;
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
		occupancy: number;
		capacity: number;
		queueStatus: number;
		isActive: boolean;
		themeId: string;
	}>;
};

export type RemovePubKeyMutationVariables = Exact<{
	pubKey: Scalars['String']['input'];
}>;

export type RemovePubKeyMutation = {
	__typename?: 'Mutation';
	deleteFromPubKeys: Array<{ __typename?: 'PubKeysItem'; id: number; pubId: string; key: string }>;
};

export type RemoveThemeMutationVariables = Exact<{
	themeId: Scalars['String']['input'];
}>;

export type RemoveThemeMutation = {
	__typename?: 'Mutation';
	deleteFromThemes: Array<{
		__typename?: 'ThemesItem';
		id: number;
		themeId: string;
		displayName: string;
		logo: string;
		color: string;
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
		occupancy: number;
		capacity: number;
		queueStatus: number;
		isActive: boolean;
		themeId: string;
	}>;
};

export type UpdatePubKeyMutationVariables = Exact<{
	pubKey: Scalars['String']['input'];
	oldPubKey: Scalars['String']['input'];
}>;

export type UpdatePubKeyMutation = {
	__typename?: 'Mutation';
	updatePubKeys: Array<{ __typename?: 'PubKeysItem'; pubId: string; key: string; id: number }>;
};

export type UpdateThemeMutationVariables = Exact<{
	theme: ThemesUpdateInput;
	oldThemeId: Scalars['String']['input'];
}>;

export type UpdateThemeMutation = {
	__typename?: 'Mutation';
	updateThemes: Array<{
		__typename?: 'ThemesItem';
		id: number;
		themeId: string;
		displayName: string;
		logo: string;
		color: string;
	}>;
};

export type GetPubKeysQueryVariables = Exact<{ [key: string]: never }>;

export type GetPubKeysQuery = {
	__typename?: 'Query';
	pubKeys: Array<{ __typename?: 'PubKeysSelectItem'; id: number; key: string; pubId: string }>;
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
		themeId: string;
	}>;
};

export type GetThemesQueryVariables = Exact<{ [key: string]: never }>;

export type GetThemesQuery = {
	__typename?: 'Query';
	themes: Array<{
		__typename?: 'ThemesSelectItem';
		color: string;
		displayName: string;
		id: number;
		logo: string;
		themeId: string;
	}>;
};

export type PubKeysSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type PubKeysSubscriptionSubscription = {
	__typename?: 'Subscription';
	pubKeysSubscription?: Array<{
		__typename?: 'PubKeysItem';
		id: number;
		key: string;
		pubId: string;
	}> | null;
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
		themeId: string;
	}> | null;
};

export type ThemesSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ThemesSubscriptionSubscription = {
	__typename?: 'Subscription';
	themesSubscription?: Array<{
		__typename?: 'ThemesItem';
		color: string;
		displayName: string;
		id: number;
		logo: string;
		themeId: string;
	}> | null;
};

export const CreatePubDoc = gql`
	mutation CreatePub(
		$capacity: Int!
		$isActive: Boolean!
		$occupancy: Int!
		$pubId: String!
		$queueStatus: Int!
		$themeId: String!
	) {
		insertIntoPubs(
			values: {
				capacity: $capacity
				isActive: $isActive
				occupancy: $occupancy
				pubId: $pubId
				queueStatus: $queueStatus
				themeId: $themeId
			}
		) {
			capacity
			id
			isActive
			occupancy
			pubId
			queueStatus
			themeId
		}
	}
`;
export const CreatePubKeyDoc = gql`
	mutation CreatePubKey($pubKey: String!, $pubId: String!) {
		insertIntoPubKeys(values: { key: $pubKey, pubId: $pubId }) {
			pubId
			key
			id
		}
	}
`;
export const CreateThemeDoc = gql`
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
export const DecrementPubOccupancyDoc = gql`
	mutation DecrementPubOccupancy($pubId: String!, $decrement: Int!) {
		decrementPubOccupancy(where: { pubId: $pubId }, values: { decrement: $decrement }) {
			id
			pubId
			occupancy
			capacity
			queueStatus
			isActive
			themeId
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
			themeId
		}
	}
`;
export const RegeneratePubKeysDoc = gql`
	mutation RegeneratePubKeys($input: [RegeneratePubKeysInput!]!) {
		regeneratePubKeys(input: $input) {
			id
			pubId
			key
		}
	}
`;
export const RemovePubDoc = gql`
	mutation RemovePub($pubId: String!) {
		deleteFromPubs(where: { pubId: { eq: $pubId } }) {
			id
			pubId
			occupancy
			capacity
			queueStatus
			isActive
			themeId
		}
	}
`;
export const RemovePubKeyDoc = gql`
	mutation RemovePubKey($pubKey: String!) {
		deleteFromPubKeys(where: { key: { eq: $pubKey } }) {
			id
			pubId
			key
		}
	}
`;
export const RemoveThemeDoc = gql`
	mutation RemoveTheme($themeId: String!) {
		deleteFromThemes(where: { themeId: { eq: $themeId } }) {
			id
			themeId
			displayName
			logo
			color
		}
	}
`;
export const UpdatePubDoc = gql`
	mutation UpdatePub($pub: PubsUpdateInput!, $oldPubId: String!) {
		updatePubs(set: $pub, where: { pubId: { eq: $oldPubId } }) {
			id
			pubId
			occupancy
			capacity
			queueStatus
			isActive
			themeId
		}
	}
`;
export const UpdatePubKeyDoc = gql`
	mutation UpdatePubKey($pubKey: String!, $oldPubKey: String!) {
		updatePubKeys(set: { key: $pubKey }, where: { key: { eq: $oldPubKey } }) {
			pubId
			key
			id
		}
	}
`;
export const UpdateThemeDoc = gql`
	mutation UpdateTheme($theme: ThemesUpdateInput!, $oldThemeId: String!) {
		updateThemes(set: $theme, where: { themeId: { eq: $oldThemeId } }) {
			id
			themeId
			displayName
			logo
			color
		}
	}
`;
export const GetPubKeysDoc = gql`
	query GetPubKeys {
		pubKeys {
			id
			key
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
			themeId
		}
	}
`;
export const GetThemesDoc = gql`
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
export const PubKeysSubscriptionDoc = gql`
	subscription PubKeysSubscription {
		pubKeysSubscription {
			id
			key
			pubId
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
			themeId
		}
	}
`;
export const ThemesSubscriptionDoc = gql`
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
export const CreatePub = (
	options: Omit<MutationOptions<any, CreatePubMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CreatePubMutation, CreatePubMutationVariables>({
		mutation: CreatePubDoc,
		...options
	});
	return m;
};
export const CreatePubKey = (
	options: Omit<MutationOptions<any, CreatePubKeyMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CreatePubKeyMutation, CreatePubKeyMutationVariables>({
		mutation: CreatePubKeyDoc,
		...options
	});
	return m;
};
export const CreateTheme = (
	options: Omit<MutationOptions<any, CreateThemeMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CreateThemeMutation, CreateThemeMutationVariables>({
		mutation: CreateThemeDoc,
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
export const RemovePubKey = (
	options: Omit<MutationOptions<any, RemovePubKeyMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<RemovePubKeyMutation, RemovePubKeyMutationVariables>({
		mutation: RemovePubKeyDoc,
		...options
	});
	return m;
};
export const RemoveTheme = (
	options: Omit<MutationOptions<any, RemoveThemeMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<RemoveThemeMutation, RemoveThemeMutationVariables>({
		mutation: RemoveThemeDoc,
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
export const UpdatePubKey = (
	options: Omit<MutationOptions<any, UpdatePubKeyMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<UpdatePubKeyMutation, UpdatePubKeyMutationVariables>({
		mutation: UpdatePubKeyDoc,
		...options
	});
	return m;
};
export const UpdateTheme = (
	options: Omit<MutationOptions<any, UpdateThemeMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<UpdateThemeMutation, UpdateThemeMutationVariables>({
		mutation: UpdateThemeDoc,
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

export const GetThemes = (
	options: Omit<WatchQueryOptions<GetThemesQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<GetThemesQuery> & {
		query: ObservableQuery<GetThemesQuery, GetThemesQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: GetThemesDoc,
		...options
	});
	var result = readable<
		ApolloQueryResult<GetThemesQuery> & {
			query: ObservableQuery<GetThemesQuery, GetThemesQueryVariables>;
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
export const ThemesSubscription = (
	options: Omit<SubscriptionOptions<ThemesSubscriptionSubscriptionVariables>, 'query'>
) => {
	const q = client.subscribe<
		ThemesSubscriptionSubscription,
		ThemesSubscriptionSubscriptionVariables
	>({
		query: ThemesSubscriptionDoc,
		...options
	});
	return q;
};
