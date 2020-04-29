$(document).ready(() => {
    // LocalStorage keys
    const isUpdateInProgressKey = "isUpdating";

    // Initialize content when the page is loaded
    $(function () {
        localStorage.removeItem(isUpdateInProgressKey);
    });

    // End resource ---

    // Fetch the ID of the hub from URI
    // https://<host>/hubs/<id>/...
    // [https:][][<host>][hubs][<id>][...]
    const hubId = location.href.split("/")[4];

    // Constants for API calls
    const apiUrl = "http://193.50.40.81:5000/api/v1";
    const clearResourceUrl = apiUrl + "/Pupils/me/Hubs/" + hubId + "/Modules/current/States/current";

    // Retrieve the token from the local storage
    const token = JSON.parse(localStorage.currentPupil).token;

    /**
     * @summary Delete the current resource in the database
     */
    function clearResource() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("DELETE", clearResourceUrl, false);
        xmlHttp.setRequestHeader("Authorization", "Bearer " + token);
        xmlHttp.send(null);
    }

    /**
     * @summary Redirect the user when he is done with the module
     */
    function redirectToHubPage() {
        window.location.href = "http://193.50.40.81:4201/hubs/" + hubId;
    }

    // Event listener for the button to go to the next resource
    $("#btn-next").click(() => {
        clearResource();
        redirectToHubPage();
    });

});
