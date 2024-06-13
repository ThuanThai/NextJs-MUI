import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const queryParam = request.nextUrl.searchParams.get("audio");
    console.log("🚀 ~ GET ~ queryParam:", queryParam);

    return await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${queryParam}`
    );
}
