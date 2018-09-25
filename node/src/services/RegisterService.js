let service = new Object

let users = []

service.register = async (fingerprintID, arithmosMitroou) => {
    console.log('whattt')
    if (users.indexOf(fingerprintID) === -1) {
		users.push(fingerprintID)
		console.log("New user registered")
        console.log(users)
		}
	else {
        console.log("User already exists")
        throw "User already exists"
		}
}
module.exports = service