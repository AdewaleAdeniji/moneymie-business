import { Field } from "formik";
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'

const Input = (props) => {
    const { placeholder, type, name, label, ...rest } = props;
    return (
        <Field name={name}>
            {(props) => {
                const { field, form } = props

                const error = form.errors[name] || ""
                const isInvalid = form.errors[name] && form.touched[name]

                return (
                    <div>
                        <div className="form-field">
                            <label htmlFor="input">
                                {label}
                            </label>
                            <input
                                {...field}
                                type={type}
                                className="input-field"
                                placeholder={placeholder}
                                {...rest}
                            />
                        </div>
                        {isInvalid && <div style={{ color: '#ea1b2a', margin: 5, fontSize: 14 }}>{error}</div>}
                    </div>
                )
            }}
        </Field>

    )
}

export default Input;

