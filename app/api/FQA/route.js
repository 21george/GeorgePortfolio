import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import FQA from "../../models/FQA";

// Database connection
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Database connection failed");
    }
  }
}

// GET - Fetch all FAQs or search/filter
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    let query = { isActive: true };
    let faqs;

    if (search) {
      // Search functionality
      faqs = await FQA.search(search)
        .limit(limit)
        .skip(skip)
        .lean();
    } else if (category && category !== 'all') {
      // Filter by category
      faqs = await FQA.findByCategory(category)
        .limit(limit)
        .skip(skip)
        .lean();
    } else {
      // Get all FAQs
      faqs = await FQA.find(query)
        .sort({ order: 1, createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean();
    }

    // Get total count for pagination
    const total = await FQA.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: faqs,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    }, { status: 200 });

  } catch (error) {
    console.error("GET FAQ Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch FAQs",
      details: error.message
    }, { status: 500 });
  }
}

// POST - Create new FAQ
export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { question, answer, category, tags, order } = body;

    // Validation
    if (!question || !answer) {
      return NextResponse.json({
        success: false,
        error: "Question and answer are required"
      }, { status: 400 });
    }

    // Create new FAQ
    const newFQA = new FQA({
      question: question.trim(),
      answer: answer.trim(),
      category: category || 'General',
      tags: tags || [],
      order: order || 0
    });

    const savedFQA = await newFQA.save();

    return NextResponse.json({
      success: true,
      message: "FAQ created successfully",
      data: savedFQA
    }, { status: 201 });

  } catch (error) {
    console.error("POST FAQ Error:", error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json({
        success: false,
        error: "Validation failed",
        details: Object.values(error.errors).map(err => err.message)
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: "Failed to create FAQ",
      details: error.message
    }, { status: 500 });
  }
}

// PUT - Update FAQ
export async function PUT(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { id, question, answer, category, tags, order, isActive } = body;

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "FAQ ID is required"
      }, { status: 400 });
    }

    const updateData = {};
    if (question) updateData.question = question.trim();
    if (answer) updateData.answer = answer.trim();
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedFQA = await FQA.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedFQA) {
      return NextResponse.json({
        success: false,
        error: "FAQ not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "FAQ updated successfully",
      data: updatedFQA
    }, { status: 200 });

  } catch (error) {
    console.error("PUT FAQ Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update FAQ",
      details: error.message
    }, { status: 500 });
  }
}

// DELETE - Delete FAQ
export async function DELETE(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "FAQ ID is required"
      }, { status: 400 });
    }

    const deletedFQA = await FQA.findByIdAndDelete(id);

    if (!deletedFQA) {
      return NextResponse.json({
        success: false,
        error: "FAQ not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully",
      data: deletedFQA
    }, { status: 200 });

  } catch (error) {
    console.error("DELETE FAQ Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to delete FAQ",
      details: error.message
    }, { status: 500 });
  }
}