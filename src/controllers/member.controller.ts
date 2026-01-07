import type { Request, Response } from "express";
import { catchAsync } from "../utils/catch_async";
import type { CreateMemberInput, EmailInput, Member, MemberIdInput, MemberWithHashedPassword } from "../zod";
import type { ApiResponse } from "../interfaces/api_response";
import type { MemberService } from "../services/member.service";

export class MemberController {
    constructor(
        private readonly memberService: MemberService
    ) { }
    create = catchAsync(async (req: Request<{}, {}, CreateMemberInput>, res: Response<ApiResponse<void>>) => {
        await this.memberService.create(req.body);
        res.status(200).json({
            success: true
        })
    })
    findById = catchAsync(async (req: Request<MemberIdInput>, res: Response<ApiResponse<MemberWithHashedPassword>>) => {
        const { memberId } = req.params
        await this.memberService.findById(memberId)
        res.status(200).json({
            success: true
        })
    })
    findByEmail = catchAsync(async (req: Request<EmailInput>, res: Response<ApiResponse<Member>>) => {
        const email = req.params.email
        await this.memberService.findById(email)
        res.status(200).json({
            success: true
        })
    })
}