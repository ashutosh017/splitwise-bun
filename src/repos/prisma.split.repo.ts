import type { TransactionClient } from "../generated/prisma/internal/prismaNamespace";
import type { SplitInput, SplitRepository } from "../types/split";

export class PrismaSplitRepository implements SplitRepository {
    async create(input: SplitInput, tx?: TransactionClient): Promise<void> {

    }
}