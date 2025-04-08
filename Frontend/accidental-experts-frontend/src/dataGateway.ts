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
    let url = 'https://backend-744513217594.europe-west1.run.app/accountInfo/' + userID;
  
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

export async function applyForJob(jobID: number, userID: string) {

    const applicationData = {
        job_id: jobID,
        user_id: parseInt(userID, 10),
        applicationStatus: "applied",
    };
    const url = 'https://backend-744513217594.europe-west1.run.app/applications';
    const requestConfig = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(applicationData)
    };
    try {
        const response = await fetch(url, requestConfig);
        if (!response.ok) {
            alert("Sorry, your application could not be submitted. Please try again later.");
            return null;
        }
        const responseData = await response.json();
        alert("You have successfully applied for this job!");
        return responseData;
    } catch (error) {
        alert("Sorry, there was an error submitting your application. Please try again later.");
        return null;
    }
}

export async function saveInformation(userID: string, firstname: string, lastname: string, email: string) {

    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email
    };
    const url = 'https://backend-744513217594.europe-west1.run.app/users/' + userID;
    const requestConfig = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    };
    try {
        const response = await fetch(url, requestConfig);
        if (!response.ok) {
            alert("Sorry, your information could not be saved. Please try again later.");
            return null;
        }
        const responseData = await response.json();
        alert("You have successfully updated your information!");
        return responseData;
    } catch (error) {
        alert("Sorry, there was an error submitting your information. Please try again later.");
        return null;
    }
}