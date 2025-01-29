const userUpdatedResponse = (user) => ({
	id: user.id,
	firstName: user.firstName,
	lastName: user.lastName,
	email: user.email
})

export default userUpdatedResponse
