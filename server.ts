import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// API route for handling quote submissions
app.post("/api/quotes", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      serviceType,
      originLocation,
      destination,
      cargoDescription
    } = req.body;

    // Validate request parameters
    if (!fullName || !email || !phone || !serviceType || !originLocation || !destination) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in quote submission."
      });
    }

    console.log(`[Quote Submission] Received request from ${fullName} (${email}) for ${serviceType}`);

    // Read Supabase Configuration
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
    
    let dbSuccess = false;
    let dbErrorDetails = "";
    let supabaseClient = null;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
        
        const timestamp = new Date().toISOString();
        const { error } = await supabaseClient
          .from("quotes")
          .insert([
            {
              full_name: fullName,
              email: email,
              phone: phone,
              service_type: serviceType,
              origin_location: originLocation,
              destination: destination,
              cargo_description: cargoDescription || "",
              created_at: timestamp
            }
          ]);
        
        if (error) {
          console.error("[Supabase Error] Failing to insert row in 'quotes' table:", error);
          dbErrorDetails = error.message;
        } else {
          console.log("[Supabase] Quote successfully saved in database");
          dbSuccess = true;
        }
      } catch (dbErr: any) {
        console.error("[Supabase Client Exception]", dbErr);
        dbErrorDetails = dbErr.message;
      }
    } else {
      console.log("[Supabase] Credentials are missing. Database save simulated.");
    }

    // Read Resend Configuration
    const resendApiKey = process.env.RESEND_API_KEY || "";
    let emailSuccess = false;
    let emailErrorDetails = "";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        
        // Detailed responsive HTML Email composition
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #ffffff;">
            <div style="background-color: #0D1B2A; padding: 20px; text-align: center; border-radius: 6px 6px 0 0;">
              <h2 style="color: #F5A623; margin: 0; font-size: 24px;">ZZ Transport Pty Ltd</h2>
              <p style="color: #ffffff; margin: 5px 0 0; font-size: 14px;">Quote Request Confirmation</p>
            </div>
            
            <div style="padding: 24px; color: #333333; line-height: 1.6;">
              <p>Dear <strong>${fullName}</strong>,</p>
              <p>Thank you for requesting a quote with ZZ Transport Pty Ltd. We have successfully received your logistics inquiry and our operations team is already calculating the optimal shipment schedule and routes for you.</p>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #F5A623; margin: 20px 0; border-radius: 4px;">
                <h3 style="margin-top: 0; color: #1A3A5C; font-size: 16px; border-bottom: 1px solid #e1e1e1; padding-bottom: 5px;">Inquiry Specifications</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; width: 35%; color: #64748B;">Client Name:</td>
                    <td style="padding: 6px 0; color: #0D1B2A;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748B;">Phone Service:</td>
                    <td style="padding: 6px 0; color: #0D1B2A;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748B;">Inbound Email:</td>
                    <td style="padding: 6px 0; color: #0D1B2A;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748B;">Service Ordered:</td>
                    <td style="padding: 6px 0; color: #F5A623; font-weight: 600;">${serviceType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748B;">Pickup Origin:</td>
                    <td style="padding: 6px 0; color: #0D1B2A;">${originLocation}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748B;">Destination:</td>
                    <td style="padding: 6px 0; color: #0D1B2A;">${destination}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; vertical-align: top; color: #64748B;">Specifications:</td>
                    <td style="padding: 6px 0; color: #0D1B2A;">${cargoDescription || "None provided"}</td>
                  </tr>
                </table>
              </div>
              
              <p>Our specialists in Perth or Melbourne will reach out to you within the next 2-4 business hours with custom pricing details.</p>
              
              <p style="margin-top: 300; font-size: 11px; color: #64748B; border-top: 1px solid #e1e1e1; padding-top: 15px; text-align: center;">
                Perth Office: 26 Macedonia St Naval Base 6165 | Melbourne Office: 54/56 Agoste Drive Laverton North 3026<br>
                ZZ Transport Pty Ltd. Australia.
              </p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: "ZZ Transport <onboarding@resend.dev>",
          to: [email, "adamzafar1227@gmail.com"],
          subject: `Quote Request Registered: ${serviceType} - ZZ Transport`,
          html: emailHtml
        });
        
        console.log("[Resend] Confirmation email dispatched successfully");
        emailSuccess = true;
      } catch (emailErr: any) {
        console.error("[Resend Error] Dispatch failing:", emailErr);
        emailErrorDetails = emailErr.message;
      }
    } else {
      console.log("[Resend] API key not found. Email notification simulated.");
    }

    const isSimulated = !supabaseUrl || !resendApiKey;

    return res.status(200).json({
      success: true,
      message: "Your Quote Request was successfully submitted to ZZ Transport Pty Ltd!",
      payload: {
        fullName,
        serviceType,
        destination,
        timestamp: new Date().toISOString()
      },
      dbSaved: dbSuccess,
      emailSent: emailSuccess,
      isSimulated,
      warnings: isSimulated 
        ? "Running in simulation mode because DB or Email parameters are not fully populated in variables. Your request has been logged successfully." 
        : undefined
    });
    
  } catch (err: any) {
    console.error("[Quote API Exception]", err);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred while registering your quote. Please try again or contact operations directly.",
      error: err.message
    });
  }
});

// Configure Vite middleware or production static deployment
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Server] Booting in Development (Vite Middleware) mode");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Server] Booting in Production (Static Service) mode");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ZZ Transport Service] Listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
