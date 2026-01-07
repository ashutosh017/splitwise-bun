import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { CreateMemberInputSchema, MemberIdInputSchema } from "../zod";
import { memberController } from "../di/container";

export const MemberRouter = Router();

MemberRouter.post("/", validate({
    body: CreateMemberInputSchema
}), memberController.create)

MemberRouter.get("/:memberId", validate({
    params: MemberIdInputSchema
}), memberController.findById)