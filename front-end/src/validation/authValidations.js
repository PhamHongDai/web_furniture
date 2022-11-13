import * as yub from "yup";

export const nameSchema = yub.object().shape({
    name: yub.string().min(5).required(),
});
export const emailSchema = yub.object().shape({
    email: yub.string().email().required(),
});

export const passwordSchema = yub.object().shape({
    password: yub.string().min(8).max(50).required(),
});

export const phoneSchema = yub.object().shape({
    phone: yub.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
    .min(10)
    .max(11)
    .required(),
});

export const stringSchema = yub.object().shape({
    string: yub.string().min(6).max(100).required(),
});