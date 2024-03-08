document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const requestData = {};
    formData.forEach((value, key) => {
      requestData[key] = value;
    });
    console.log(JSON.stringify(requestData));

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const responseData = await response.json();
      alert(responseData.message);
      this.reset(); // Reset the form after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user");
    }
  });
