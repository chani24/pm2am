// Newsletter signup → Brevo contact list.
// Needs BREVO_API_KEY and BREVO_LIST_ID in the environment (.env locally,
// project settings on the host).
const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function POST(req) {
  const { firstName, email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ message: "A valid email is required" }, 400);
  }

  try {
    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY ?? "",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        attributes: firstName ? { FIRSTNAME: firstName.trim() } : undefined,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        // Someone already in Brevo just gets added to the list instead of erroring.
        updateEnabled: true,
      }),
    });

    // 201 = new contact, 204 = existing contact updated.
    if (res.ok) return json({ message: "Subscription successful" }, 200);

    const detail = await res.json().catch(() => ({}));
    console.error("Brevo subscribe failed:", res.status, detail.code, detail.message);
    return json({ message: "Subscription failed" }, 500);
  } catch (error) {
    console.error("Brevo subscribe failed:", error?.message);
    return json({ message: "Subscription failed" }, 500);
  }
}
