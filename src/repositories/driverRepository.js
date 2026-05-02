import Driver from "../models/Driver.js";

export const create = (data) => Driver.create(data);
export const findAll = () => Driver.find();