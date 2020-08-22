const logger = require("./logger")

const isInt = (val) => !isNaN(val) && /^\d+$/.test(val.toString())

const validation_functions = {
    int: isInt
}

module.exports = {

    /* Parameters:
        type (string): a validation type (key from the object 'validation_functions')
        val (value): value to check validation
        [OPTIONAL] parameter_name (string): a name of the parameter to show in the error message

       Return "null" if the value is valid, and a string with error otherwise
    */
    validate(type, val, parameter_name = "") {
        let err_msg = null
        if (!(type in validation_functions)) {
            err_msg = `Validation type '${type}' does not exists`
            logger.err(err_msg)
        }
        else
            if (!validation_functions[type](val))
                err_msg = `Expected for '${type}' but received: ${val}`

        if(err_msg !== null && parameter_name)
            err_msg = `${err_msg} (${parameter_name})`
        return err_msg
    }

}