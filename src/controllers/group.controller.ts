import type { Request, Response } from "express";
import { catchAsync } from "../utils/catch_async";
import type { GroupService } from "../services/group.service";
import type { ApiResponse } from "../interfaces/api_response";
import type { CreateGroupInput, GroupIdInput, GroupSummary, Member, MemberIdInput, QueryMemberInput } from "../zod";

export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) { }
    createGroup = catchAsync(async (req: Request<{}, {}, CreateGroupInput>, res: Response<ApiResponse<void>>) => {
        await this.groupService.createGroup(req.body);
        res.status(200).json({
            success: true
        })
    })

    findById = catchAsync(async (req: Request<GroupIdInput>, res: Response<ApiResponse<GroupSummary>>) => {
        const groupSummary = await this.groupService.findById(req.params.groupId)
        res.status(200).json({
            success: true,
            data: groupSummary
        })
    })
    addMember = catchAsync(async (req: Request<{}, {}, QueryMemberInput>, res: Response<ApiResponse<void>>) => {
        const { groupId, memberId } = req.body
        await this.groupService.addMember(groupId, memberId)
        res.status(200).json({
            success: true
        })
    })
    removeMember = catchAsync(async (req: Request<{}, {}, QueryMemberInput>, res: Response<ApiResponse<void>>) => {
        const { groupId, memberId } = req.body
        await this.groupService.removeMember(groupId, memberId);
        res.status(200).json({
            success: true
        })
    })
    listGroups = catchAsync(async (req: Request, res: Response<ApiResponse<GroupSummary[]>>) => {
        const groups = await this.groupService.listGroups()
        res.status(200).json({
            success: true,
            data: groups
        })
    })
    getAllMembers = catchAsync(async (req: Request<GroupIdInput>, res: Response<ApiResponse<Member[]>>) => {
        const { groupId } = req.params
        const members = await this.groupService.getAllMembers(groupId)
        res.status(200).json({
            success: true,
            data: members
        })
    })
    delete = catchAsync(async (req: Request<GroupIdInput>, res: Response<ApiResponse<void>>) => {
        const { groupId } = req.params
        await this.groupService.delete(groupId)
        res.status(200).json({
            success: true,
        })
    })
    listGroupsForMember = catchAsync(async (req: Request<MemberIdInput>, res: Response<ApiResponse<GroupSummary[]>>) => {
        const { memberId } = req.params
        const groups = await this.groupService.listGroupsForMember(memberId)
        res.status(200).json({
            success: true,
            data: groups
        })
    })


}