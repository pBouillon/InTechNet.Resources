$(document).ready(() => {

    // Fetch the ID of the hub from URI
    // https://<host>/hubs/<id>/...
    // [https:][][<host>][hubs][<id>][...]
    const hubId = location.href.split("/")[4];

    // Constants for API calls
    const apiUrl = "http://193.50.40.81:5000/api/v1";
    const nextResourceUrl = apiUrl + "/Pupils/me/Hubs/" + hubId + "/Modules/current/Resources/current";
    const validateResourceUrl = apiUrl + "/Pupils/me/Hubs/" + hubId + "/Modules/current/States/current";

    // Retrieve the token from the local storage
    const token = JSON.parse(localStorage.currentPupil).token;

    /**
     * @summary loads the next resource from this one and load it into the
     *          current page
     */
    function loadNextResource() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", nextResourceUrl, false);
        xmlHttp.setRequestHeader("Authorization", "Bearer " + token);
        xmlHttp.send(null);

        const resource = JSON.parse(xmlHttp.responseText);
        document.getElementById("resource-content").innerHTML = resource.content;
    }

    /**
     * @summary validate the current resource
     */ 
    function validateResource() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("PUT", validateResourceUrl, false);
        xmlHttp.setRequestHeader("Authorization", "Bearer " + token);
        xmlHttp.send(null);
    }

    // Event listener for the button to go to the next resource
    $("#btn-next").click(() => {
        validateResource();
        loadNextResource();
    });

});
