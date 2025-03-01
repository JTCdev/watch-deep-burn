import { NextResponse } from "next/server";

export async function GET() {
  const API_URL = "https://fullnode.mainnet.sui.io"; // ✅ Sui Public RPC (No API Key needed)
  const COIN_TYPE = "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP";

  try {
    // 🟢 Fetch Total Supply from Sui RPC
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "suix_getTotalSupply",
        params: [COIN_TYPE]
      }),
    });

    const data = await response.json();
    console.log("🔍 Sui RPC Response:", JSON.stringify(data, null, 2));

    if (!data?.result?.value) {
      return NextResponse.json({ error: "Invalid response from Sui RPC", fullResponse: data }, { status: 500 });
    }

    // ✅ Extract total supply value
    const currentSupply = Number(data.result.value);

    // ✅ Return only the total supply
    return NextResponse.json({ totalSupply: currentSupply });

  } catch (error: unknown) {
    console.error("❌ API Fetch Error:", error);

    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: "Failed to fetch DEEP supply", details: errorMessage },
      { status: 500 }
    );
  }
}