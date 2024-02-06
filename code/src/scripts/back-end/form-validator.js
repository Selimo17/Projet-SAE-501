import validator from "validator";
 
const form = document.querySelector("[data-form]");
 
const SAEValidator = (formValues) => {
    let hasErrors = false
 
    if (validator.isEmpty(formValues.title)) {
        // Display error message
        document
            .querySelector("[data-error-message='title']")
            .classList.remove("hidden");
 
        hasErrors = true;
    }
 
    return hasErrors
};
 
const articleValidator = (formValues) => {
    let hasErrors = false
 
    if (validator.isEmpty(formValues.title)) {
        // Display error message
        hasErrors = true
        // document.querySelector("#title").setAttribute("aria-invalid", hasErrors)
        document
            .querySelector("[data-error-message='title']")
            .classList.remove("hidden");
    }
 

    // if (formValues.image.size === 0 && validator.isEmpty(formValues.current_file_image)) {
    //     document
    //         .querySelector("[data-error-message='image']")
    //         .classList.remove("hidden");
    //     hasErrors = true
    // }
 
    if (validator.isEmpty(formValues.content)) {
        // Display error message
        document
            .querySelector("[data-error-message='content']")
            .classList.remove("hidden");
        hasErrors = true
    }
 
    if (
        formValues.yt_link_id &&
        !validator.matches(formValues.yt_link_id, /^([A-Za-z0-9_\-]{11})$/)
    ) {
        // Display error message
        document
            .querySelector("[data-error-message='yt_link_id']")
            .classList.remove("hidden");
        hasErrors = true
    }
 
    return hasErrors
};
 
const authorValidator = (formValues) => {
    let hasErrors = false
 
    if (validator.isEmpty(formValues.firstname)) {
        // Display error message
        document
            .querySelector("[data-error-message='firstname']")
            .classList.remove("hidden");
        hasErrors = true
    }
 
    if (validator.isEmpty(formValues.lastname)) {
        // Display error message
        document
            .querySelector("[data-error-message='lastname']")
            .classList.remove("hidden");
        hasErrors = true
    }
 
    if (formValues.image.size === 0 && validator.isEmpty(formValues.current_file_image)) {
        document
            .querySelector("[data-error-message='image']")
            .classList.remove("hidden");
        hasErrors = true
    }
 
    if (validator.isEmpty(formValues.email) || !validator.isEmail(formValues.email)) {
        document
            .querySelector("[data-error-message='email']")
            .classList.remove("hidden");
        hasErrors = true
    }
 
    return hasErrors
}
 
form?.addEventListener("submit", (e) => {
    // Prevent form to send data directly to back-end in order to catch
    // form's data and use it
    e.preventDefault();
 
    document.querySelectorAll("[data-error-message]").forEach((item) => {
        item.classList.add("hidden");
    });
    // document.querySelectorAll("[aria-invalid]").forEach((item) => {
    //     item.setAttribute("aria-invalid", false)
    // })
 
    const formName = e.target.dataset.form;
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData);
 
    let hasErrors = false
 
    if(formName === "sae") {
        hasErrors = SAEValidator(formValues)
    } else if (formName === "article") {
        hasErrors = articleValidator(formValues)
    } else if (formName === "author") {
        hasErrors = authorValidator(formValues)
    }
 
    if(!hasErrors) {
        e.target.submit();
    }
});