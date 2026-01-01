export const stringError = (field: string) => `${field} must be a string`
export const minError = (field: string) => `${field} cannot be empty`;
export const maxError = (field: string, len: number) =>
    `${field} cannot be more than ${len} characters`;
