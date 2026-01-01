import { Router } from "express";
import { groupService } from "../di/container";
import { AddOrRemoveMemberSchema, CreateGroupSchema, Id } from "../zod/";
import { AppError } from "../errors/app_error";

export const GroupRouter = Router();

GroupRouter.post("/", async (req, res) => {
    const parsedBody = CreateGroupSchema.safeParse(req.body);
    if (parsedBody.error) {
        res.status(500).json({
            message: "Error parsing data"
        })
        return;
    }
    try {
        await groupService.createGroup(parsedBody.data)
        res.status(200).json({
            message: "Group created successfully"
        })
        return;
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.status).json({
                error: error.message
            })
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        })

    }
})
GroupRouter.delete("/", async (req, res) => {
    const parsedBody = Id.safeParse(req.body);
    if (parsedBody.error) {
        res.status(500).json({
            message: "Error parsing data"
        })
        return;
    }
    try {
        await groupService.delete(parsedBody.data)
        res.status(200).json({
            message: "group deleted successfully"
        })
        return;
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.status).json({
                error: error.message
            })
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        })

    }
})
GroupRouter.post("/member", async (req, res) => {
    const parsedBody = AddOrRemoveMemberSchema.safeParse(req.body);
    if (parsedBody.error) {
        res.status(500).json({
            message: "Error parsing data"
        })
        return;
    }
    try {
        await groupService.addMember(parsedBody.data.groupId, parsedBody.data.memberId)
        res.status(200).json({
            message: "Member added successfully"
        })
        return;
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.status).json({
                error: error.message
            })
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        })

    }
})
GroupRouter.delete("/member", async (req, res) => {
    const parsedBody = AddOrRemoveMemberSchema.safeParse(req.body);
    if (parsedBody.error) {
        res.status(500).json({
            message: "Error parsing data"
        })
        return;
    }
    try {
        await groupService.removeMember(parsedBody.data.groupId, parsedBody.data.memberId)
        res.status(200).json({
            message: "Member removed successfully"
        })
        return;
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.status).json({
                error: error.message
            })
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        })
    }
})