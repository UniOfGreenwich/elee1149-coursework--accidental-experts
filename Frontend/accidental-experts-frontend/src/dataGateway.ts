function getStandardRequestHeaders() {
    return new Headers({'Content-Type': 'application/json'});
}

export async function retrieveJobs() {
    let url = "http://www.localhost:3000/Tests/jobs.json"
    let requestConfig = {
        method: 'GET',
        headers: getStandardRequestHeaders(),
    }
    try {
        return await fetch(url, requestConfig).then(response => response.json());
    } catch (error) {
        //TODO
    }
}