import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function POST(req) {
  const { firstName, email } = await req.json();

  try {
    const response = await mailchimp.lists.setListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      email.toLowerCase(),
      {
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
        },
      }
    );

    return new Response(
      JSON.stringify({ message: "Subscription successful", response }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Subscription failed", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
