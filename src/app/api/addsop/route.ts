import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { parse } from 'querystring'; // Import querystring module

export async function POST(req: Request) {
    try {
        const bodyText = await req.text(); // Read the body as text
        const body = parse(bodyText); // Parse the text as URL-encoded form data
        const date = new Date();
        const { title, step1, step2, step3, step4, step5, email, name, procedure } = body;

        // Check if required fields are present and are of correct type
        if (
            typeof title !== 'string' || typeof email !== 'string' || typeof name !== 'string' ||
            (step1 && typeof step1 !== 'string') || (step2 && typeof step2 !== 'string') ||
            (step3 && typeof step3 !== 'string') || (step4 && typeof step4 !== 'string') ||
            (step5 && typeof step5 !== 'string') 
        ) {
            return new NextResponse(JSON.stringify({ message: "Invalid input types" }), { status: 400 });
        }

        // Prepare the new SOP data
        const newSopData = {
            title: title as string,
            oldsopid: "",
            uploaderId: email as string,
            uploadername: name as string,
            date: date.toISOString(),
            step1: step1 as string,
            step2: step2 as string,
            step3: step3 as string,
            step4: step4 as string,
            step5: step5 as string,
            parameter: "",
            // procedure: procedure as string,
            flag: 0,
            accuracy: 0,
            completeness: 0,
            relevance: 0,
            score: "",
        };

        // Save the new SOP to the database
        const newSop = await db.newSop.create({ data: newSopData });

        // Return success response
        return new NextResponse(JSON.stringify({ message: "Successful", sop: newSop }), { status: 201 });
    } catch (error: any) {
        console.error("Error creating SOP:", error);

        // Return error response
        return new NextResponse(JSON.stringify({ message: "Unsuccessful", error: error.message }), { status: 500 });
    }
}
