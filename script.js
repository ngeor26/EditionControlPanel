let isAuthenticated = false; // Flag to check if the user is authenticated

document.querySelector("#loginBtn").addEventListener("click", async () => {
    const enteredPassword = document.getElementById("password").value.trim();

    if (!enteredPassword) {
        alert("Please enter a password.");
        return;
    }

    try {
        const response = await fetch(
            "https://ngeor2026.pythonanywhere.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: enteredPassword }),
            }
        );

        const responseData = await response.json();

        if (response.ok && responseData.authenticated) {
            isAuthenticated = true;
            document.getElementById("login").style.display = "none";
            document.getElementById("controlPanel").style.display = "block";

            try {
                const res = await fetch(
                    "https://ngeor2026.pythonanywhere.com/get-form",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${document
                                .getElementById("password")
                                .value.trim()}`,
                        },
                    }
                );
                const data = await res.json();

                if (data && data.url) {
                    document.getElementById("formValue").textContent = data.url;
                } else {
                    document.getElementById("formValue").textContent =
                        "Nothing";
                }
            } catch (error) {
                console.error("Error retrieving form URL:", error);
                document.getElementById("formValue").textContent =
                    "Failed to load form URL.";
            }
        } else {
            alert("Incorrect password. Please try again.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
    }
});

document.addEventListener("DOMContentLoaded", async () => {});

document.querySelector("#formAdd").addEventListener("click", async () => {
    const formUrl = document.getElementById("formUrl").value.trim();
    if (!formUrl) {
        alert("Please enter a form URL.");
        return;
    }

    try {
        const response = await fetch(
            "https://ngeor2026.pythonanywhere.com/update-form",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${document
                        .getElementById("password")
                        .value.trim()}`,
                },
                body: JSON.stringify({ url: formUrl }),
            }
        );

        const responseData = await response.json();
        if (response.ok) {
            alert(responseData.message || "Form added successfully!");
            document.querySelector("#formValue").innerHTML = formUrl;
            document.querySelector("#formUrl").value = "";
        } else {
            alert(`Error: ${responseData.error}`);
        }
    } catch (error) {
        console.error("Error updating form:", error);
        alert("Failed to update form.");
    }
});

document.querySelector("#formRemove").addEventListener("click", async () => {
    try {
        const response = await fetch(
            "https://ngeor2026.pythonanywhere.com/update-form",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${document
                        .getElementById("password")
                        .value.trim()}`,
                },
                body: JSON.stringify({ url: "" }),
            }
        );

        const responseData = await response.json();
        if (response.ok) {
            alert(responseData.message || "Form removed!");
            document.querySelector("#formValue").innerHTML = "Nothing";
        } else {
            alert(`Error: ${responseData.error}`);
        }
    } catch (error) {
        console.error("Error removing form:", error);
        alert("Failed to remove form.");
    }
});

document.querySelector("#send").addEventListener("click", async () => {
    const message = document.getElementById("notification").value.trim();

    if (!message) {
        alert("Please enter a notification message.");
        return;
    }

    try {
        const response = await fetch(
            "https://ngeor2026.pythonanywhere.com/send-notification",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${document
                        .getElementById("password")
                        .value.trim()}`,
                },
                body: JSON.stringify({ message }),
            }
        );

        const responseData = await response.json();
        if (response.ok) {
            alert("Notification sent successfully!");
        } else {
            alert(`Error: ${responseData.error}`);
        }
    } catch (error) {
        console.error("Error sending notification:", error);
        alert("Failed to send notification.");
    }
});
