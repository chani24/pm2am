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

    await mailchimp.lists.setListMember(
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

    if (tagList.length > 0) {
      await mailchimp.lists.updateListMemberTags(
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
        tagsApplied: tagList,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Mailchimp subscribe failed:", error?.status, error?.response?.body?.title ?? error?.message);
    return new Response(
      JSON.stringify({ message: "Subscription failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
