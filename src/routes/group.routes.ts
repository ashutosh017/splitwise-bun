import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { CreateGroupSchema, GroupIdInputSchema, QueryMemberInputSchema } from "../zod";
import { groupController } from "../di/container";

export const GroupRouter = Router();

GroupRouter.get("/:groupId", validate({
    params: GroupIdInputSchema
}), groupController.findById)

GroupRouter.post("/", validate({
    body: CreateGroupSchema
}), groupController.createGroup)

GroupRouter.delete("/:groupId", validate({
    params: GroupIdInputSchema
}), groupController.delete)

GroupRouter.get("/all", groupController.listGroups);

GroupRouter.post("/member", validate({
    body: QueryMemberInputSchema
}), groupController.addMember)

GroupRouter.delete("/member", validate({
    body: QueryMemberInputSchema
}), groupController.removeMember)

GroupRouter.get("/:groupId/members", validate({
    params: GroupIdInputSchema
}), groupController.getAllMembers)



