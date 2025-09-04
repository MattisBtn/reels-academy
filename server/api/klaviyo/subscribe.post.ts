export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email } = body;

    // Validation de l'email
    if (!email || !email.includes("@")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email invalide",
      });
    }

    const config = useRuntimeConfig();
    const klaviyoPrivateKey = config.klaviyoPrivateKey;
    const klaviyoListId = config.klaviyoListId;

    if (!klaviyoPrivateKey || !klaviyoListId) {
      throw createError({
        statusCode: 500,
        statusMessage: "Configuration Klaviyo manquante",
      });
    }

    const profileResponse = await $fetch<{
      data: {
        id: string;
        type: string;
        attributes: {
          email: string;
        };
      };
    }>("https://a.klaviyo.com/api/profiles/", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${klaviyoPrivateKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        Revision: "2025-07-15",
      },
      body: {
        data: {
          type: "profile",
          attributes: {
            email: email,
            properties: {
              $email: email,
              $first_name: "",
              $last_name: "",
              $source: "landing_page",
            },
          },
        },
      },
    });

    const subscriptionResponse = await $fetch(
      `https://a.klaviyo.com/api/lists/${klaviyoListId}/relationships/profiles/`,
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${klaviyoPrivateKey}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Revision: "2025-07-15",
        },
        body: {
          data: [
            {
              type: "profile",
              id: profileResponse.data.id,
            },
          ],
        },
      }
    );

    console.log("Klaviyo subscription response:", subscriptionResponse);

    return {
      success: true,
      message: "Inscription réussie !",
      data: {
        profileId: profileResponse.data.id,
        subscriptionId: "added_to_list",
      },
    };
  } catch (error: unknown) {
    console.error("Erreur Klaviyo:", error);

    const errorObj = error as { statusCode?: number; statusMessage?: string };
    if (errorObj.statusCode === 409) {
      return {
        success: true,
        message: "Vous êtes déjà inscrit à notre liste !",
      };
    }

    throw createError({
      statusCode: errorObj.statusCode || 500,
      statusMessage: errorObj.statusMessage || "Erreur lors de l'inscription",
    });
  }
});
