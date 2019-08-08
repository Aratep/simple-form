/*
    helper functions for validating form fields
 */

// function that checks input length (min and max)
export function inputLength(value, min, max) {
    let error = "";

    if (!value) {
        return required(value)
    }

    if (value && value.length < min) {
        error = `Must contain min ${min} characters`
    }
    if (value && value.length > max) {
        error = `Must contain max ${max} characters`
    }

    return error
}

// function that checks for field requiredness
export function required(value) {
    let error = "";

    if (!value) {
        error = "Required"
    }
    if (value && typeof value === 'boolean' && value !== true) {
        error = 'Required'
    }

    return error
}

// function that checks form to be valid
export function validateForm(errors) {
    let valid = true;

    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}