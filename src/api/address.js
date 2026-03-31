const API = process.env.NEXT_PUBLIC_API_URL; // make sure this is set in your .env

export const addAddress = async (token, body) => {
  try {
    const res = await fetch(`${API}/api/address`, { // <-- use /api/address
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text(); // get backend error message
      throw new Error(errorText || "Failed to add address");
    }

    return res.json(); // return the added address
  } catch (err) {
    console.error("Add address error:", err);
    throw err; // let the modal handle it
  }
};