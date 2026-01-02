import { NextResponse } from 'next/server';

// NOTE FOR DEVELOPER:
// To connect this to a real Google Sheet, you would typically use the `google-spreadsheet` npm package
// ACTUAL IMPLEMENTATION REPLACING THE SERVICE ACCOUNT ONE
export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Waitlist Submission:", body);

        const SCRIPT_URL = process.env.GOOGLE_SHEET_SCRIPT_URL;

        if (SCRIPT_URL) {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const result = await response.text();
            console.log("Google Script Response:", response.status, result);
        } else {
            console.log("Mocking successful submission (No Script URL provided)");
        }

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
