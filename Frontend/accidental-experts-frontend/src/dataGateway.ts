function getStandardRequestHeaders() {
    return new Headers({ Accept: 'application/json' });
}

export async function retrieveJobs() {
    let url = 'https://backend-744513217594.europe-west1.run.app/jobs';
    let requestConfig = {
        method: 'GET',
        headers: getStandardRequestHeaders(),
    };
    try {
        return await fetch(url, requestConfig).then((response) =>
            response.json()
        );
    } catch (error) {
        //TODO
    }
}
export async function retrieveAccountInfo(userID) {
    let url = `https://backend-744513217594.europe-west1.run.app/accountInfo/${userID}`;
    let requestConfig = {
        method: 'GET',
        headers: getStandardRequestHeaders(),
    };
    try {
        console.log('hello');
        return await fetch(url, requestConfig).then((response) =>
            response.json()
        );
    } catch (error) {
        console.log(error);
        //navigate to error page
    }
}

export async function authenticate(password: string, email: string) {
    let url =
        'https://backend-744513217594.europe-west1.run.app/users/authenticate';
    let requestConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            password: password,
            email: email,
        }),
    };
    try {
        return await fetch(url, requestConfig).then((response) =>
            response.json()
        );
    } catch (error) {
        console.log(error);
        //navigate to error page
    }
}

export async function registerNewUser(
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    userType: string
) {
    let url = 'https://backend-744513217594.europe-west1.run.app/users';
    let requestConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            userType: userType,
        }),
    };
    try {
        return await fetch(url, requestConfig).then((response) =>
            response.json()
        );
    } catch (error) {
        //TODO
    }
}
