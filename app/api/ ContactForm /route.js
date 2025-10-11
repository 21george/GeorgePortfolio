import connectionString from "@/app/libs/mongodb";
import ContactsForm from "@/app/models/ContactForm";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullname,
      email,
      phone,
      website,
      nachricht,
      companyStage,
      deadline,
      budget,
      referralSource,
      formType,
    } = body;

    // ✅ Basic validation
    if (!fullname || !email) {
      return new Response(
        JSON.stringify({ error: "Full name and email are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectionString();

    // ✅ Save to MongoDB
    const newEntry = await ContactsForm.create({
      fullname,
      email,
      phone,
      website,
      nachricht,
      companyStage,
      deadline,
      budget,
      referralSource,
      formType,
    });

    return new Response(
      JSON.stringify({ message: "Contact form submitted successfully", data: newEntry }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("POST /api/WellcomeNote error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
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
    console.log("GET /api/WellcomeNote - Starting request");
    await connectionString();
    console.log("GET /api/WellcomeNote - Database connected");

    const contacts = await ContactsForm.find({});
    console.log("GET /api/WellcomeNote - Found", contacts.length, "entries");

    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("GET /api/WellcomeNote error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
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
