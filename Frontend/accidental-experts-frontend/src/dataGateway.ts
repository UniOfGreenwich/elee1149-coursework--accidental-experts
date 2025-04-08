function getStandardRequestHeaders() {
    return new Headers({ Accept: 'application/json' });
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(6, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
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
        const response = await fetch(url, requestConfig); // Await the fetch call
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