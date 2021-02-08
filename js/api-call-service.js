export class ApiCallService
{
    getApi(url, queryString = '') {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: 'get',
                url: url,
                data: queryString
            }).done(function (result) {
                resolve(result);
            }).fail(function (jqXHR, textStatus) {
                reject("Failed calling the API with message: " + jqXHR.statusText);
            });
        })
    }

    postApi(url, data) {
        // TODO: should be implemented
        return true;
    }

    deleteApi(url, data) {
        // TODO: should be implemented
        return true;
    }

    putApi(url, data) {
        // TODO: should be implemented
        return true;
    }
}
