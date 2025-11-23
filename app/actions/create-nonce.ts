'use server'

import {nonceManager} from "@/lib/nonce";

export async function createNonce(): Promise<string> {
    return await nonceManager.create();
}