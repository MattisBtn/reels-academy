export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, consent } = body as { email?: string; consent?: boolean };

    // Validation de l'email
    if (!email || !email.includes("@")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email invalide",
      });
    }

    if (!consent) {
      throw createError({
        statusCode: 400,
        statusMessage: "Le consentement est requis",
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

    const requestBody = {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email: email,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: "SUBSCRIBED",
                      },
                    },
                  },
                },
              },
            ],
          },
          custom_source: "landing_page",
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: klaviyoListId,
            },
          },
        },
      },
    };

    interface KlaviyoBulkJobResponse {
      data?: { id?: string };
    }

    const bulkSubscribeJob = await $fetch<KlaviyoBulkJobResponse>(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
      {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${klaviyoPrivateKey}`,
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
          Revision: "2025-07-15",
        },
        body: requestBody,
      }
    );

    return {
      success: true,
      message: "Inscription réussie !",
      data: {
        jobId: bulkSubscribeJob?.data?.id ?? null,
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
