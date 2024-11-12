import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Portfolio } from '@/models/Portfolio';

export async function GET() {
  try {
    await dbConnect();
    const portfolios = await Portfolio.find({ userId: "demo-user" });
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();

    // Check if a portfolio already exists for the user
    let portfolio = await Portfolio.findOne({ userId: body.userId });

    if (portfolio) {
      // If portfolio exists, add the new asset
      portfolio.assets.push(...body.assets);
      portfolio.updatedAt = new Date();
      await portfolio.save();
    } else {
      // If no portfolio exists, create a new one
      portfolio = await Portfolio.create(body);
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: 'Failed to create/update portfolio' },
      { status: 500 }
    );
  }
}