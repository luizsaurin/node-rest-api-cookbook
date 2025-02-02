import { NextFunction, Request, Response } from 'express'
import { ParsedQs } from 'qs'
import { InvalidQueryParamError } from '../error/InvalidQueryParamsError'
import { exceptionResponse } from '../util/responseUtils'

export const findAllUsersQueryValidator = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await queryHasUnallowedKeyParams(req.query)

		const { filter, sort, select, skip, limit } = req.query

		await Promise.all([
			validateFilter(filter),
			validateSort(sort),
			validateSelect(select),
			validateSkip(skip),
			validateLimit(limit)
		])

		next()
	} catch (error) {
		exceptionResponse(res, error)
	}
}

const queryHasUnallowedKeyParams = async (query: object) => {
	const allowedParams = ['filter', 'sort', 'select', 'skip', 'limit']

	const invalidParams = Object.keys(query).filter((param) => !allowedParams.includes(param))
	if (invalidParams.length > 0) {
		throw new InvalidQueryParamError(`Invalid query parameters: ${invalidParams}`)
	}
}

const validateFilter = async (filter: string | ParsedQs | (string | ParsedQs)[] | undefined) => {
	const parsedParam = JSON.parse((filter as string) || '{}')
	const unallowedParams = ['password', 'role']

	if (queryHasUnallowedValueParams(parsedParam, unallowedParams)) {
		throw new InvalidQueryParamError('Invalid filter parameters')
	}
}

const validateSort = async (sort: string | ParsedQs | (string | ParsedQs)[] | undefined) => {
	const parsedParam = JSON.parse((sort as string) || '{}')
	const unallowedParams = ['password', 'role']

	if (queryHasUnallowedValueParams(parsedParam, unallowedParams)) {
		throw new InvalidQueryParamError('Invalid sort parameters')
	}
}

const validateSelect = async (select: string | ParsedQs | (string | ParsedQs)[] | undefined) => {
	const parsedParam = JSON.parse((select as string) || '{}')
	const unallowedParams = ['password', 'role']

	if (queryHasUnallowedValueParams(parsedParam, unallowedParams)) {
		throw new InvalidQueryParamError('Invalid select parameters')
	}
}

const validateSkip = async (skip: string | ParsedQs | (string | ParsedQs)[] | undefined) => {
	if (skip && isNaN(Number(skip))) {
		throw new InvalidQueryParamError('Invalid skip parameter: must be a number')
	}
}

const validateLimit = async (limit: string | ParsedQs | (string | ParsedQs)[] | undefined) => {
	if (limit && isNaN(Number(limit))) {
		throw new InvalidQueryParamError('Invalid limit parameter: must be a number')
	}
}

const queryHasUnallowedValueParams = (parsedQuery: object, unallowedValues: string[]) => {
	return unallowedValues.some((field) => {
		return Object.prototype.hasOwnProperty.call(parsedQuery, field)
	})
}
