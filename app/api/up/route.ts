import {NextRequest, NextResponse} from "next/server"
import {nonceManager} from "@/lib/nonce";

export async function GET(req: NextRequest) {
    try {
        const nonceCheck = await nonceManager.verifyAndDeleteNonceFromRequest(req!);

        if (!nonceCheck.valid) throw new Error("Nonce check failed");
        // return NextResponse.json(nonceCheck.response);

        const healthStatus = {
            state: "ok",
            timestamp: new Date().toISOString(),
        }
        return NextResponse.json({
            state: healthStatus.state,
            timestamp: healthStatus.timestamp,
        });
    } catch (error) {
        console.error("Error in GET /api/up:", error);
        return NextResponse.json({
            state: "error",
            timestamp: new Date().toISOString()
        });
    }

}