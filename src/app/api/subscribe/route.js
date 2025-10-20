import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function POST(req) {
  const { firstName, email, tag } = await req.json();

  try {
    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const listId = process.env.MAILCHIMP_AUDIENCE_ID;
    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    const response = await mailchimp.lists.setListMember(
      listId,
      subscriberHash,
      {
        email_address: email,
        status_if_new: "subscribed",
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
        },
      }
    );

    // Optional single tag
    const tagList = typeof tag === "string" && tag.trim() ? [tag.trim()] : [];

    let tagsResult = null;
    if (tagList.length > 0) {
      tagsResult = await mailchimp.lists.updateListMemberTags(
        listId,
        subscriberHash,
        {
          tags: tagList.map((name) => ({ name, status: "active" })),
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Subscription successful",
        response,
        tagsApplied: tagList,
        tagsResult,
      }),
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
