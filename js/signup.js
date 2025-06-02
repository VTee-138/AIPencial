
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirmPassword");

    togglePassword.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePassword.textContent = isHidden ? "👁" : "👁";
    });

    toggleConfirmPassword.addEventListener("click", () => {
      const isHidden = confirmInput.type === "password";
      confirmInput.type = isHidden ? "text" : "password";
      toggleConfirmPassword.textContent = isHidden ? "👁" : "👁";
    });