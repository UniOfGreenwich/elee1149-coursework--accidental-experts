function getStandardRequestHeaders() {
    return new Headers({ 'Content-Type': 'application/json' });
}

export async function retrieveJobs() {
    let url =
        origin + '/elee1149-coursework--accidental-experts/Tests/jobs.json';
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
    export async function retrieveAccountInfo() {
        let url =
            origin + '/elee1149-coursework--accidental-experts/Tests/seeker-info.json';
        let requestConfig = {
            method: 'GET',
            headers: getStandardRequestHeaders(),
        };
        try {
            return await fetch(url, requestConfig).then((response) =>
                response.json()
            );
        } catch (error) {
            console.log(error)
            //navigate to error page
        }
    }
