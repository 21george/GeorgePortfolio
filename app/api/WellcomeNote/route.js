import connectionString from "@/app/libs/mongodb";
import WellcomeNote from "@/app/models/WellconeNote";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, massage } = body;

    // Validate required fields
    if (!name || !massage) {
      return new Response(
        JSON.stringify({ error: "Name and massage are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectionString();

    const newNote = await WellcomeNote.create({ name, massage });

    return new Response(
      JSON.stringify({ message: "Note received", note: newNote }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: "Internal Server Error", 
        details: error.message 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  try {
    await connectionString();
    
    const notes = await WellcomeNote.find({});
    
    return new Response(JSON.stringify(notes), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: "Internal Server Error", 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
