import axios from "axios";

export default {
    // Creates a user
    saveUser: function () {
        return axios.post("/api/user", userData);
    },

    // Gets the user with a given id
    getUser: function (id) {
        return axios.get("/api/user/" + id);
    },

    // Deletes the user by their id
    deleteUser: function (id) {
        return axios.delete("/api/user/" + id);
    }
}