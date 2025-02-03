import InvalidQueryParamError from '../../error/InvalidQueryParamsError.js'
import { exceptionResponse } from '../../util/responseUtils.js'

const queryHasUnallowedKeyParams = async (query) => {
	const allowedParams = ['filter', 'sort', 'select', 'skip', 'limit']

	const invalidParams = Object.keys(query).filter((param) => !allowedParams.includes(param))
	if (invalidParams.length > 0) {
		throw new InvalidQueryParamError(`Invalid query parameters: ${invalidParams}`)
	}
}

const queryHasUnallowedValueParams = (parsedQuery, unallowedValues) =>
	unallowedValues.some((field) => Object.prototype.hasOwnProperty.call(parsedQuery, field))

const validateFilter = async (filter) => {
	const parsedParam = JSON.parse(filter || '{}')
	const unallowedParams = ['password', 'role']

	if (queryHasUnallowedValueParams(parsedParam, unallowedParams)) {
		throw new InvalidQueryParamError('Invalid filter parameters')
	}
}

const validateSort = async (sort) => {
	const parsedParam = JSON.parse(sort || '{}')
	const unallowedParams = ['password', 'role']

	if (queryHasUnallowedValueParams(parsedParam, unallowedParams)) {
		throw new InvalidQueryParamError('Invalid sort parameters')
	}
}

const validateSelect = async (select) => {
	const parsedParam = JSON.parse(select || '{}')
	const unallowedParams = ['password', 'role']

	if (queryHasUnallowedValueParams(parsedParam, unallowedParams)) {
		throw new InvalidQueryParamError('Invalid select parameters')
	}
}

const validateSkip = async (skip) => {
	if (skip && Number.isNaN(Number(skip))) {
		throw new InvalidQueryParamError('Invalid skip parameter: must be a number')
	}
}

const validateLimit = async (limit) => {
	if (limit && Number.isNaN(Number(limit))) {
		throw new InvalidQueryParamError('Invalid limit parameter: must be a number')
	}
}

const findAllUsersQueryValidator = async (req, res, next) => {
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

export default findAllUsersQueryValidator
