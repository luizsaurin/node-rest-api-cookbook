import { Document, Query } from 'mongoose'
import { ParsedQs } from 'qs'
import { InvalidQueryParamError } from '../error/InvalidQueryParamsError'
import { IUser } from '../model/User'

/**
 * Query options class, destined to resolve query parameters for Model.find() queries
 */
export class QueryUtils {
	constructor(
		public query: Query<
			(Document<unknown, object, IUser> & IUser & Required<{ _id: string }>)[],
			Document<unknown, object, IUser> & IUser & Required<{ _id: string }>,
			object,
			IUser,
			'find',
			object
		>,
		public queryString: ParsedQs
	) {
		this.query = query
		this.queryString = queryString
		this.catchUnallowedParams(queryString)
	}

	private catchUnallowedParams(queryString: ParsedQs) {
		const allowedParams = [
			AllowedQueryParams.filter,
			AllowedQueryParams.sort,
			AllowedQueryParams.select,
			AllowedQueryParams.skip,
			AllowedQueryParams.limit
		]

		const queryParams = Object.keys(queryString)

		// Check if any query parameter is not allowed
		const invalidParams = queryParams.filter((param) => !allowedParams.includes(param as AllowedQueryParams))
		if (invalidParams.length > 0) {
			throw new InvalidQueryParamError('Invalid query parameters')
		}
	}

	private queryHasUnallowedParams(parsedQuery: object, excludedFields: string[]): boolean {
		return excludedFields.some((field) => {
			return Object.prototype.hasOwnProperty.call(parsedQuery, field)
		})
	}

	filter(): this {
		const { filter } = this.queryString

		const parsedFilter = JSON.parse((filter as string) || '{}')

		const unallowedParams = [UnallowedQueryParams.password, UnallowedQueryParams.role]

		const hasUnallowedParams = this.queryHasUnallowedParams(parsedFilter, unallowedParams)

		if (hasUnallowedParams) {
			throw new InvalidQueryParamError('Invalid filter parameters')
		}

		this.query.find(parsedFilter)

		return this
	}

	sort(): this {
		const { sort } = this.queryString

		// Default sort: createdAt: -1 (descending)
		const parsedSort = JSON.parse((sort as string) || '{"createdAt":-1}')

		const unallowedParams = [UnallowedQueryParams.password, UnallowedQueryParams.role]

		const hasUnallowedParams = this.queryHasUnallowedParams(parsedSort, unallowedParams)

		if (hasUnallowedParams) {
			throw new InvalidQueryParamError('Invalid sort parameters')
		}

		this.query.sort(parsedSort)

		return this
	}

	select(): this {
		const { select } = this.queryString

		// Default select exclusion: __v: 0
		const parsedSelect = JSON.parse((select as string) || '{"__v":0}')

		const unallowedParams = [UnallowedQueryParams.password, UnallowedQueryParams.role]

		const hasUnallowedParams = this.queryHasUnallowedParams(parsedSelect, unallowedParams)

		if (hasUnallowedParams) {
			throw new InvalidQueryParamError('Invalid select parameters')
		}

		this.query.select(parsedSelect)

		return this
	}

	skip(): this {
		const { skip } = this.queryString

		this.query.skip(parseInt(skip as string, 10) || 0)

		return this
	}

	limit(): this {
		const { limit } = this.queryString

		this.query.limit(parseInt(limit as string, 10) || 10)

		return this
	}
}

enum AllowedQueryParams {
	filter = 'filter',
	sort = 'sort',
	select = 'select',
	skip = 'skip',
	limit = 'limit'
}

enum UnallowedQueryParams {
	password = 'password',
	role = 'role'
}
