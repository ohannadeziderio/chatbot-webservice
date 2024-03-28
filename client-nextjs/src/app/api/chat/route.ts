import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response: Response = await fetch("http://127.0.0.1:8080/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    const data = await response.json();

    if (response.status != 200) {
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
