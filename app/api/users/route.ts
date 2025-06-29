import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
    
        const { name, email } = await request.json();
    
        if (!name || !email) {
        return NextResponse.json(
            { error: "Name and email are required" },
            { status: 400 }
        );
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }
    
        const user = new User({ name, email });
        await user.save();
    
        return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding user:", error);
        return NextResponse.json(
        { error: "Failed to add user" },
        { status: 500 }
        );
    }
}